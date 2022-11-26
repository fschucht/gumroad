Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: %i[create]
      resources :products, only: %i[index show create]

      post '/auth/login', to: 'auth#login'
    end
  end
end
