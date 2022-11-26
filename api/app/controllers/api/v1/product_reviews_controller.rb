class Api::V1::ProductReviewsController < ApplicationController
  before_action :require_current_user

  def create
    @product = Product.find(params[:product_id])
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
end
