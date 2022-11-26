class Api::V1::UsersController < ApplicationController
  def create
    @user = User.new user_params

    if @user.save
      render json: { data: @user }, status: 201
    else
      render json: { errors: @user.errors.full_messages.uniq }, status: 400
    end
  end

  private

  def user_params
    params.permit(%i[email password])
  end
end
