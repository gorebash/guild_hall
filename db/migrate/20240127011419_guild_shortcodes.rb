class GuildShortcodes < ActiveRecord::Migration[7.0]
  def change
    add_column :guilds, :invite_code, :string
  end
end
