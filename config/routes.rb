Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  root 'home#index'

  get 'chatroom', to: 'chatroom#index'
  post 'message', to: 'messages#create'

  get 'login', to: 'sessions#new'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'

  get 'signup', to: 'users#new'
  resources :users, except: [:new]

  mount ActionCable.server, at: '/cable'
end
