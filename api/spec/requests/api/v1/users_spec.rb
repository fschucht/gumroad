require 'rails_helper'

RSpec.describe 'Api::V1::Users', type: :request do
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
