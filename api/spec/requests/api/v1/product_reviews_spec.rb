require 'rails_helper'

SECRET_KEY = Rails.application.credentials.jwt_secret

RSpec.describe 'Api::V1::Products::ProductReviews', type: :request do
  describe 'GET /products/:id/product_reviews' do
    it 'should return a 200 status code' do
      product = Product.create title: 'Title'

      get "/api/v1/products/#{product.id}/product_reviews"

      expect(response).to have_http_status 200
    end

    it 'should return all product reviews and the average rating' do
      product = Product.create title: 'Title'

      user1 = User.create email: 'valid1@email.com', password: 'abcdef'
      product_review1 = ProductReview.create rating: 1, comment: '0' * 100, product: product, user: user1

      user2 = User.create email: 'valid2@email.com', password: 'abcdef'
      product_review2 = ProductReview.create rating: 5, comment: '0' * 100, product: product, user: user2

      get "/api/v1/products/#{product.id}/product_reviews"

      expect(response.body).to eq({
        data: {
          stats: {
            average_rating: 3
          },
          reviews: [product_review2, product_review1]
        }
      }.to_json)
    end
  end

  describe 'POST /products/:id/product_reviews' do
    context 'when all data has been provided' do
      it 'should return a 201 status code' do
        user = User.create email: 'valid@email.com', password: 'abcdef'
        product = Product.create title: 'Title'

        jwt_token = JWT.encode({ user_id: user.id, exp: 10.minutes.from_now.to_i }, SECRET_KEY)

        post "/api/v1/products/#{product.id}/product_reviews",
             params: { rating: 5, comment: '0' * 100 },
             headers: { 'Authorization' => "Bearer #{jwt_token}" }

        expect(response).to have_http_status 201
      end

      it 'return the created product' do
        expect do
          user = User.create email: 'valid@email.com', password: 'abcdef'
          product = Product.create title: 'Title'

          jwt_token = JWT.encode({ user_id: user.id, exp: 10.minutes.from_now.to_i }, SECRET_KEY)

          post "/api/v1/products/#{product.id}/product_reviews",
               params: { rating: 5, comment: '0' * 100 },
               headers: { 'Authorization' => "Bearer #{jwt_token}" }
        end.to change(Product, :count).by(1)
      end
    end

    context 'when the rating is missing' do
      it 'return an error' do
        user = User.create email: 'valid@email.com', password: 'abcdef'
        product = Product.create title: 'Title'

        jwt_token = JWT.encode({ user_id: user.id, exp: 10.minutes.from_now.to_i }, SECRET_KEY)

        post "/api/v1/products/#{product.id}/product_reviews",
             params: { comment: '0' * 100 },
             headers: { 'Authorization' => "Bearer #{jwt_token}" }

        expect(response.body).to eq({ errors: ["Rating can't be blank"] }.to_json)
      end
    end

    context 'when the rating is smaller than 0' do
      it 'return an error' do
        user = User.create email: 'valid@email.com', password: 'abcdef'
        product = Product.create title: 'Title'

        jwt_token = JWT.encode({ user_id: user.id, exp: 10.minutes.from_now.to_i }, SECRET_KEY)

        post "/api/v1/products/#{product.id}/product_reviews",
             params: { rating: 0, comment: '0' * 100 },
             headers: { 'Authorization' => "Bearer #{jwt_token}" }

        expect(response.body).to eq({ errors: ['Rating must be greater than or equal to 1'] }.to_json)
      end
    end

    context 'when the rating is greater than 5' do
      it 'return an error' do
        user = User.create email: 'valid@email.com', password: 'abcdef'
        product = Product.create title: 'Title'

        jwt_token = JWT.encode({ user_id: user.id, exp: 10.minutes.from_now.to_i }, SECRET_KEY)

        post "/api/v1/products/#{product.id}/product_reviews",
             params: { rating: 6, comment: '0' * 100 },
             headers: { 'Authorization' => "Bearer #{jwt_token}" }

        expect(response.body).to eq({ errors: ['Rating must be less than or equal to 5'] }.to_json)
      end
    end

    context 'when the comment is missing' do
      it 'return an error' do
        user = User.create email: 'valid@email.com', password: 'abcdef'
        product = Product.create title: 'Title'

        jwt_token = JWT.encode({ user_id: user.id, exp: 10.minutes.from_now.to_i }, SECRET_KEY)

        post "/api/v1/products/#{product.id}/product_reviews",
             params: { rating: 5 },
             headers: { 'Authorization' => "Bearer #{jwt_token}" }

        expect(response.body).to eq({
          errors: ["Comment can't be blank",
                   'Comment is too short (minimum is 100 characters)']
        }.to_json)
      end
    end

    context 'when is too short' do
      it 'return an error' do
        user = User.create email: 'valid@email.com', password: 'abcdef'
        product = Product.create title: 'Title'

        jwt_token = JWT.encode({ user_id: user.id, exp: 10.minutes.from_now.to_i }, SECRET_KEY)

        post "/api/v1/products/#{product.id}/product_reviews",
             params: { rating: 5, comment: '0' * 99 },
             headers: { 'Authorization' => "Bearer #{jwt_token}" }

        expect(response.body).to eq({ errors: ['Comment is too short (minimum is 100 characters)'] }.to_json)
      end
    end
  end
end
