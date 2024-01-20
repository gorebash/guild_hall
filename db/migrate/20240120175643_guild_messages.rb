class GuildMessages < ActiveRecord::Migration[7.0]
  def change
    add_reference :messages, :guild, foreign_key: true, null: false
  end
end
