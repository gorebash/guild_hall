Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  
  root 'guilds#index'

  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }
  # :controllers => { registrations: 'users/registrations' }
  
  resources :guild_members, except: [:show]
  resources :join_requests, except: [:show]
  resources :guilds do
    get 'message', to: 'messages#new'
    post 'message', to: 'messages#create'
  end
  
  get 'home', to:'home#index'
  get 'members', to:'guild_members#index'
  #post 'guild_member', to:'guild_members#update'



  mount ActionCable.server, at: '/cable'
end
