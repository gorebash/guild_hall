Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  
  #root 'home#index'
  root 'guilds#index'
  
  resources :guilds do
    get 'message', to: 'messages#new'
    post 'message', to: 'messages#create'
  end
  
  devise_for :users

  get 'home', to:'home#index'

  resources :join_requests, except: [:show]

  get 'members', to:'guild_members#index'

  mount ActionCable.server, at: '/cable'
end
