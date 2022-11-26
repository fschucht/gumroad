class ProductReview < ApplicationRecord
  belongs_to :user
  belongs_to :product

  validates :rating, presence: true, comparison: { greater_than_or_equal_to: 1, less_than_or_equal_to: 5 }
  validates :comment, presence: true, length: { minimum: 100 }
  validates :user_id, uniqueness: { scope: :product_id }
end
