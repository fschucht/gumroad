require 'test_helper'

class ProductTest < ActiveSupport::TestCase
  test 'should save a product with a title' do
    product = Product.new title: 'Title'
    assert product.save
  end

  test 'should not save a product without a title' do
    product = Product.new
    assert_not product.save
  end
end
