class AddDeletedAtToTables < ActiveRecord::Migration[7.0]
  def change
    add_column :applicants, :deleted_at, :datetime
    add_index :applicants, :deleted_at

    add_column :roles, :deleted_at, :datetime
    add_index :roles, :deleted_at
  end
end
