require 'rails_helper'

RSpec.describe ProductReview, type: :model do
  context 'with valid params' do
    it 'should save a product review' do
      product = Product.create title: 'Title'
      user = User.create email: 'valid@email.com', password: 'abcdef'

      product_review = ProductReview.new rating: 5, comment: '0' * 100, user: user, product: product

      expect(product_review.save).to be true
    end
  end

  context 'when the rating is smaller than 0' do
    it 'should not save the product review' do
      product = Product.create title: 'Title'
      user = User.create email: 'valid@email.com', password: 'abcdef'

      product_review = ProductReview.new rating: -1, comment: '0' * 100, user: user, product: product

      expect(product_review.save).to be false
    end
  end

  context 'when the rating is greater than 5' do
    it 'should not save the product review' do
      product = Product.create title: 'Title'
      user = User.create email: 'valid@email.com', password: 'abcdef'

      product_review = ProductReview.new rating: 6, comment: '0' * 100, user: user, product: product

      expect(product_review.save).to be false
    end
  end

  context 'when the comment is smaller than 100 characters' do
    it 'should not save the product review' do
      product = Product.create title: 'Title'
      user = User.create email: 'valid@email.com', password: 'abcdef'

      product_review = ProductReview.new rating: 6, comment: '0' * 99, user: user, product: product

      expect(product_review.save).to be false
    end
  end

  context 'when the user does not exist' do
    it 'should not save the product review' do
      product = Product.create title: 'Title'
      user = User.new email: 'valid@email.com', password: 'abcdef'

      product_review = ProductReview.new rating: 6, comment: '0' * 99, user: user, product: product

      expect(product_review.save).to be false
    end
  end

  context 'when the product does not exist' do
    it 'should not save the product review' do
      product = Product.new title: 'Title'
      user = User.create email: 'valid@email.com', password: 'abcdef'

      product_review = ProductReview.new rating: 6, comment: '0' * 99, user: user, product: product

      expect(product_review.save).to be false
    end
  end
end
