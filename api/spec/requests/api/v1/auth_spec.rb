require 'rails_helper'

SECRET_KEY = Rails.application.credentials.jwt_secret

RSpec.describe 'Api::V1::Auths', type: :request do
  describe 'POST /login' do
    context 'when all params have been provided' do
      it 'should return a 200 status code' do
        User.create email: 'valid@email.com', password: 'abcdef'

        post '/api/v1/auth/login', params: { email: 'valid@email.com', password: 'abcdef' }

        expect(response).to have_http_status 200
      end

      it 'should return a jwt token for the user' do
        user = User.create email: 'valid@email.com', password: 'abcdef'

        post '/api/v1/auth/login', params: { email: 'valid@email.com', password: 'abcdef' }

        parsed_body = JSON.parse(response.body)
        decoded_token = JWT.decode(parsed_body['token'], SECRET_KEY)[0]

        expect(decoded_token['user_id']).to eq(user.id)
      end
    end

    context 'when the user does not exist' do
      it 'should return a 401 status code' do
        post '/api/v1/auth/login', params: { email: 'valid@email.com', password: 'abcdef' }

        expect(response).to have_http_status 401
      end

      it 'should return an error' do
        post '/api/v1/auth/login', params: { email: 'valid@email.com', password: 'abcdef' }

        expect(response.body).to eq({ errors: ['Unauthorized'] }.to_json)
      end
    end

    context 'when the email is missing' do
      it 'should return a 401 status code' do
        User.create email: 'valid@email.com', password: 'abcdef'

        post '/api/v1/auth/login', params: { password: 'abcdef' }

        expect(response).to have_http_status 401
      end

      it 'should return an error' do
        User.create email: 'valid@email.com', password: 'abcdef'

        post '/api/v1/auth/login', params: { password: 'abcdef' }

        expect(response.body).to eq({ errors: ['Unauthorized'] }.to_json)
      end
    end

    context 'when the password is incorrect' do
      it 'should return a 401 status code' do
        User.create email: 'valid@email.com', password: 'abcdef'

        post '/api/v1/auth/login', params: { email: 'valid@email.com', password: 'bcdefg' }

        expect(response).to have_http_status 401
      end

      it 'should return an error' do
        User.create email: 'valid@email.com', password: 'abcdef'

        post '/api/v1/auth/login', params: { email: 'valid@email.com', password: 'bcdefg' }

        expect(response.body).to eq({ errors: ['Unauthorized'] }.to_json)
      end
    end

    context 'when the password is missing' do
      it 'should return a 401 status code' do
        User.create email: 'valid@email.com', password: 'abcdef'

        post '/api/v1/auth/login', params: { email: 'valid@email.com' }

        expect(response).to have_http_status 401
      end

      it 'should return an error' do
        User.create email: 'valid@email.com', password: 'abcdef'

        post '/api/v1/auth/login', params: { email: 'valid@email.com' }

        expect(response.body).to eq({ errors: ['Unauthorized'] }.to_json)
      end
    end
  end
end
