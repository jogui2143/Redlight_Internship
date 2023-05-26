class CreateApplicantsRoles < ActiveRecord::Migration[7.0]
  def change
    create_table :applicants_roles do |t|
      t.references :applicant, null: false, foreign_key: true
      t.references :role, null: false, foreign_key: true
      t.integer :status

      t.timestamps
    end
  end
end
