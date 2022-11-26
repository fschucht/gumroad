require 'rails_helper'

RSpec.describe 'Product', type: :model do
  context 'with a title' do
    it 'should save a product' do
      product = Product.new title: 'Title'
      expect(product.save).to be true
    end
  end

  context 'without a title' do
    it 'should not save a product' do
      product = Product.new
      expect(product.save).to be false
    end
  end
end
