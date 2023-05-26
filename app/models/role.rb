class Role < ApplicationRecord
    acts_as_paranoid

    validates :name, presence: true, uniqueness: {scope: :deleted_at}

    has_many :applicants_roles, dependent: :destroy
    has_many :applicants, through: :applicants_roles

    scope :search_by_name, -> (name) { where('name ILIKE ?', "%#{name}%") }

    def formatted_role
        {
            role: self,
            applicants: self.applicants.map{|a| a.show_status(self.id)}
        }
    end

    def show_status(applicant_id)
        {
            id: self.id,
            name: self.name,
            status: self.applicants_roles.find_by(applicant_id: applicant_id).status
        }
    end

end
