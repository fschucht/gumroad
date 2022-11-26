require 'rails_helper'

RSpec.describe 'Api::V1::Products', type: :request do
  describe 'GET /' do
    it 'should return a 200 status code' do
      get '/api/v1/products/'

      expect(response).to have_http_status 200
    end

    it 'should return all products' do
      product = Product.create title: 'Title'

      get '/api/v1/products/'

      expect(response.body).to eq({ data: [product] }.to_json)
    end
  end

  describe 'GET /:id' do
    context 'when the product exists' do
      it 'should return a 200 status code' do
        product = Product.create title: 'Title'

        get "/api/v1/products/#{product.id}"

        expect(response).to have_http_status 200
      end

      it 'should return the product by id' do
        product = Product.create title: 'Title'

        get "/api/v1/products/#{product.id}"

        expect(response.body).to eq({ data: product }.to_json)
      end
    end

    context 'when the product does not exists' do
      it 'should return a 404 status code' do
        get '/api/v1/products/0'

        expect(response).to have_http_status 404
      end

      it 'should return an error' do
        get '/api/v1/products/0'

        expect(response.body).to eq({ errors: ['Product not found'] }.to_json)
      end
    end
  end

  describe 'POST /' do
    context 'when all data has been provided' do
      it 'should return a 201 status code' do
        post '/api/v1/products', params: { title: 'Title' }

        expect(response).to have_http_status 201
      end

      it 'return the created product' do
        expect do
          post '/api/v1/products', params: { title: 'Title' }
        end.to change(Product, :count).by(1)
      end
    end

    context 'when the title is missing' do
      it 'return an error' do
        post '/api/v1/products', params: {}

        expect(response.body).to eq({ errors: ["Title can't be blank"] }.to_json)
      end
    end
  end
end
