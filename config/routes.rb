Rails.application.routes.draw do
  root 'guilds#show'
  
  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }
  
  resources :guild_members, except: [:show]
  resources :join_requests, except: [:show]
  resources :guild_events
  resources :guilds do
    get 'message', to: 'messages#new'
    post 'message', to: 'messages#create'
  end
  
  get 'home', to:'home#index'
  get 'members', to:'guild_members#index'

  mount ActionCable.server, at: '/cable'
end
