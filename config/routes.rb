Rails.application.routes.draw do
  default_url_options host: 'localhost', port: 3000
  
  namespace :api do
    namespace :v1 do
      resources :roles
      resources :applicants do
        collection do
          get "/search_without_x_role/:role_id", to: "applicants#search_without_x_role"
        end
      end
      resources :applicants_roles, only: [:create] do
        collection do
          put "/:applicant_id/:role_id", to: "applicants_roles#update", as: "u"
          delete "/:applicant_id/:role_id", to: "applicants_roles#destroy"
        end
      end
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
