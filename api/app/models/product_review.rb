class ProductReview < ApplicationRecord
  belongs_to :user
  belongs_to :product

  validates :rating, presence: true, comparison: { greater_than_or_equal_to: 1, less_than_or_equal_to: 5 }
  validates :comment, presence: true, length: { minimum: 100 }
  validates :user_id, uniqueness: { scope: :product_id }

  def self.latest(product_id)
    ProductReview.where(product: product_id).order('created_at DESC')
  end

  def self.average_rating(product_id)
    ProductReview.where(product: product_id).average(:rating).to_f
  end
end
