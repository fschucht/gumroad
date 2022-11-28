class Api::V1::ProductReviewsController < ApplicationController
  before_action :require_current_user, only: %i[create]
  before_action :require_product

  def index
    @product_reviews = ProductReview.latest(@product.id)
    @average_rating = ProductReview.average_rating(@product.id)

    render json: {
             data: {
               stats: { average_rating: @average_rating },
               reviews: @product_reviews
             }
           },
           include: ['user'],
           status: 200
  end

  def create
    @product_review = ProductReview.new product_review_params(@current_user, @product)

    if @product_review.save
      render json: { data: @product_review }, status: 201
    else
      render json: { errors: @product_review.errors.full_messages.uniq }, status: 400
    end
  end

  private

  def product_review_params(user, product)
    params.permit(%i[rating comment user product]).with_defaults({ user: user, product: product })
  end

  def require_product
    @product = Product.find(params[:product_id])
  end
end
