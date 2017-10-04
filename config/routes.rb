Rails.application.routes.draw do
		
  get 'home/index'

  mount ActionCable.server => '/cable'
  
  resources :groupchats, param: :slug
  resources :groupchats do
    put :leave
  end
  
  resources :messages

  devise_for :users, :controllers => { omniauth_callbacks: "users/omniauth_callbacks", registrations: 'registrations' }

  devise_scope :user do
    authenticated :user do
      root 'groupchats#index', as: :authenticated_root
    end

    unauthenticated do
      root 'devise/sessions#new', as: :unauthenticated_root
    end
  end
end
