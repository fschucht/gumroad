class Product < ApplicationRecord
  has_many :product_reviews, dependent: :destroy

  validates :title, presence: true
end
