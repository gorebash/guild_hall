Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'chatroom#index'
  post 'message', to: 'messages#create'

  get 'login', to: 'sessions#new'
  post 'login', to: 'sessions#create'

  get 'signup', to: 'users#new'
  resources :users, except: [:new]
  # post 'signup', to: 'users#create'
end
