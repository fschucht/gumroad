class Api::V1::ProductsController < ApplicationController
  def index
    @products = Product.all
    render json: { data: @products }, status: 200
  end

  def show
    @product = Product.find_by id: params[:id]

    if @product
      render json: { data: @product }, status: 200
    else
      render json: { errors: ['Product not found'] }, status: 404
    end
  end

  def create
    @product = Product.new product_params

    if @product.save
      render json: { data: @product }, status: 201
    else
      render json: { errors: @product.errors.full_messages.uniq }, status: 400
    end
  end

  private

  def product_params
    params.permit(%i[title])
  end
end
