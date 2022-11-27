Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: %i[create]
      get '/users/current_user', to: 'users#current_user'

      resources :products, only: %i[index show create] do
        resources :product_reviews, only: %i[index create]
      end

      post '/auth/login', to: 'auth#login'
    end
  end
end
