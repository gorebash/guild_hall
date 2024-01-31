Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  #resources :guild_members
  #resources :guilds
  resources :guilds do
    resources :join_requests, except: [:new, :create, :show]

    get 'message', to: 'messages#new'
    post 'message', to: 'messages#create'
  end
  
  devise_for :users

  root 'home#index'

  get 'join_request', to:'join_requests#new'
  post 'join_requests', to:'join_requests#create'

  mount ActionCable.server, at: '/cable'
end
