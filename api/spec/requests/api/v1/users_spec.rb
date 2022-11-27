require 'rails_helper'

SECRET_KEY = Rails.application.credentials.jwt_secret

RSpec.describe 'Api::V1::Users', type: :request do
  describe 'GET /current_user' do
    context 'when the user is authenticated' do
      it 'should return a 200 status code' do
        user = User.create email: 'valid@email.com', password: 'abcdef'

        jwt_token = JWT.encode({ user_id: user.id, exp: 10.minutes.from_now.to_i }, SECRET_KEY)

        get '/api/v1/users/current_user', headers: { 'Authorization' => "Bearer #{jwt_token}" }

        expect(response).to have_http_status 200
      end

      it 'should return the user' do
        user = User.create email: 'valid@email.com', password: 'abcdef'

        jwt_token = JWT.encode({ user_id: user.id, exp: 10.minutes.from_now.to_i }, SECRET_KEY)

        get '/api/v1/users/current_user', headers: { 'Authorization' => "Bearer #{jwt_token}" }

        expect(response.body).to eq({ data: user }.to_json)
      end
    end

    context 'when the user is not authenticated' do
      it 'should return a 401 status code' do
        get '/api/v1/users/current_user'

        expect(response).to have_http_status 401
      end

      it 'should return an error' do
        get '/api/v1/users/current_user'

        expect(response.body).to eq({ errors: ['Unauthorized'] }.to_json)
      end
    end
  end

  describe 'POST /' do
    context 'when all params has been provided' do
      it 'should return a 201 status code' do
        post '/api/v1/users', params: { email: 'valid@email.com', password: 'abcdef' }

        expect(response).to have_http_status 201
      end

      it 'return the created user' do
        expect do
          post '/api/v1/users', params: { email: 'valid@email.com', password: 'abcdef' }
        end.to change(User, :count).by(1)
      end

      it 'should not return the password' do
        post '/api/v1/users', params: { email: 'valid@email.com', password: 'abcdef' }

        parsed_body = JSON.parse(response.body)

        expect(parsed_body['password_digest']).to eq(nil)
      end
    end

    context 'when the email is missing' do
      it 'return an error' do
        post '/api/v1/users', params: { password: 'abcdef' }

        expect(response.body).to eq({
          errors: ["Email can't be blank", 'Email is invalid']
        }.to_json)
      end
    end

    context 'when the email is not valid' do
      it 'return an error' do
        post '/api/v1/users', params: { email: 'invalid_email', password: 'abcdef' }

        expect(response.body).to eq({ errors: ['Email is invalid'] }.to_json)
      end
    end

    context 'when the email is already taken' do
      it 'return an error' do
        User.create email: 'valid@email.com', password: 'abcdef'

        post '/api/v1/users', params: { email: 'valid@email.com', password: 'abcdef' }

        expect(response.body).to eq({ errors: ['Email has already been taken'] }.to_json)
      end
    end
  end
end
