Rails.application.routes.draw do
		
  get 'home/index'

  mount ActionCable.server => '/cable'

  resources :groupchats, param: :slug
  resources :messages

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  scope module: 'api' do
    namespace :v1 do
      resources :users
    end
  end

  devise_scope :user do
    authenticated :user do
      root 'home#index', as: :authenticated_root
    end

    unauthenticated do
      root 'devise/sessions#new', as: :unauthenticated_root
    end
  end
end
