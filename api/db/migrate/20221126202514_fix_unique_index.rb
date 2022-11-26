class FixUniqueIndex < ActiveRecord::Migration[7.0]
  def change
    remove_index :product_reviews, name: :index_product_reviews_on_user_and_product
    add_index :product_reviews, %i[user_id product_id], unique: true
  end
end
