class ApplicationController < ActionController::API
  SECRET_KEY = Rails.application.credentials.jwt_secret

  def require_current_user
    authorization_header = request.headers['Authorization']
    encoded_jwt_token = authorization_header.split(' ').last if authorization_header

    begin
      decoded_jwt_token = JWT.decode(encoded_jwt_token, SECRET_KEY)[0]
      @current_user = User.find decoded_jwt_token['user_id']
    rescue ActiveRecord::RecordNotFound => _e
      render json: { errors: ['Unauthorized'] }, status: 401
    rescue JWT::DecodeError => _e
      render json: { errors: ['Unauthorized'] }, status: 401
    end
  end
end
