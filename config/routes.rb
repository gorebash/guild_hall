Rails.application.routes.draw do
  root 'guilds#show'
  
  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }
  
  resources :users, :only => [:show]
  resources :guild_members, except: [:show]
  resources :join_requests, except: [:show]
  resources :guild_events do
    resources :attendees
  end
  resources :guilds do
    get 'message', to: 'messages#new'
    post 'message', to: 'messages#create'
  end
  
  # maybe this goes away
  post 'guild_events/:id/attend', to: 'attendees#create', as: 'attend_event'
  
  get 'home', to:'home#index'
  get 'members', to:'guild_members#index'
  get 'join/:invite_code', to:'join_requests#new', as:'join'
  post 'user_devices/create'

  mount ActionCable.server, at: '/cable'
end
