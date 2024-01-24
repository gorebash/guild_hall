Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  #resources :guild_members
  #resources :guilds
  resources :guilds do
    #resources :message, only: [:new, :create]

    get 'message', to: 'messages#new'
    post 'message', to: 'messages#create'
  end
  
  devise_for :users

  root 'home#index'

  # get 'chatroom', to: 'chatroom#index'



  mount ActionCable.server, at: '/cable'
end
