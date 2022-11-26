class Api::V1::AuthController < ApplicationController
  def login
    @user = User.find_by_email params[:email]

    if @user&.authenticate params[:password]
      expires_at = 24.hours.from_now
      token = JWT.encode({ user_id: @user.id, exp: expires_at.to_i }, SECRET_KEY)

      render json: {
               token: token,
               expires_at: expires_at.strftime('%m-%d-%Y %H:%M')
             },
             status: 200
    else
      render json: { errors: ['Unauthorized'] }, status: 401
    end
  end
end
