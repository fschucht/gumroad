class User < ApplicationRecord
  has_many :product_reviews, dependent: :destroy

  has_secure_password
  validates :email,
            presence: true,
            uniqueness: true,
            format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password,
            length: { minimum: 6 },
            if: -> { new_record? || !password.nil? }

  def as_json(options = {})
    options[:except] ||= [:password_digest]
    super(options)
  end
end
