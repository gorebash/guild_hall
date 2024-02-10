class CreateGuildRoles < ActiveRecord::Migration[7.0]
  def change
    add_column :guild_members, :role, :integer, null: false, default: :member
  end
end
