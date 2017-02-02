# README

Start of Base Rails app with Users and API.
API Endpoints are pure-mountain-44901.herokuapp.com/v1/users for example

```
                  Prefix Verb   URI Pattern                    Controller#Action
        new_user_session GET    /users/sign_in(.:format)       devise/sessions#new
            user_session POST   /users/sign_in(.:format)       devise/sessions#create
    destroy_user_session DELETE /users/sign_out(.:format)      devise/sessions#destroy
       new_user_password GET    /users/password/new(.:format)  devise/passwords#new
      edit_user_password GET    /users/password/edit(.:format) devise/passwords#edit
           user_password PATCH  /users/password(.:format)      devise/passwords#update
                         PUT    /users/password(.:format)      devise/passwords#update
                         POST   /users/password(.:format)      devise/passwords#create
cancel_user_registration GET    /users/cancel(.:format)        devise/registrations#cancel
   new_user_registration GET    /users/sign_up(.:format)       devise/registrations#new
  edit_user_registration GET    /users/edit(.:format)          devise/registrations#edit
       user_registration PATCH  /users(.:format)               devise/registrations#update
                         PUT    /users(.:format)               devise/registrations#update
                         DELETE /users(.:format)               devise/registrations#destroy
                         POST   /users(.:format)               devise/registrations#create
                v1_users GET    /v1/users(.:format)            api/v1/users#index
                         POST   /v1/users(.:format)            api/v1/users#create
             new_v1_user GET    /v1/users/new(.:format)        api/v1/users#new
            edit_v1_user GET    /v1/users/:id/edit(.:format)   api/v1/users#edit
                 v1_user GET    /v1/users/:id(.:format)        api/v1/users#show
                         PATCH  /v1/users/:id(.:format)        api/v1/users#update
                         PUT    /v1/users/:id(.:format)        api/v1/users#update
                         DELETE /v1/users/:id(.:format)        api/v1/users#destroy
```
