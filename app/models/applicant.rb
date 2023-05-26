class Applicant < ApplicationRecord
    acts_as_paranoid
    include Rails.application.routes.url_helpers

    has_many :applicants_roles, dependent: :destroy
    has_many :roles, through: :applicants_roles
    
    has_one_attached :avatar 

    validates :email, email: true, uniqueness: {scope: :deleted_at}, presence: true
    validates :name, presence: true, uniqueness: {scope: :deleted_at}

    after_commit :add_default_avatar, on: %i[create]

    scope :search_by_name, -> (name) { where('name ILIKE ?', "%#{name}%") }

    scope :search_without_x_role, -> (role_id) { where.not(id: Role.find(role_id).applicants.pluck(:id)) }

    def formatted_applicant
        {
            applicant: {
                id: self.id,
                name: self.name,
                email: self.email,
                phone: self.phone,
                avatar_url: self.avatar_url,
            },
            roles: self.roles.map{|r| r.show_status(self.id)}
        }
    end

    def show_status(role_id)
        {
            id: self.id,
            name: self.name,
            email: self.email,
            phone: self.phone,
            avatar_url: self.avatar_url,
            status: self.applicants_roles.find_by(role_id: role_id).status
        }
    end


    private
        def avatar_url
            self.avatar.attached? ? url_for(self.avatar) : nil
        end

        def add_default_avatar
            unless self.avatar.attached?
                self.avatar.attach(io: File.open(Rails.root.join('public', 'default-user-image.png')), filename: 'default-user-image.png', content_type: 'image/png')
            end
        end
end
