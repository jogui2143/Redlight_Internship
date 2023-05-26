class ApplicantsRole < ApplicationRecord
  belongs_to :applicant
  belongs_to :role
  
  enum status: { 'under_analysis': 0, 'approved': 1, 'rejected': 2 }
end
