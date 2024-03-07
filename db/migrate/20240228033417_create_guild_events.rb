class CreateGuildEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :guild_events do |t|
      t.string :name, null:false
      t.text :description
      t.references :user, null: false, foreign_key: true
      t.references :guild, null: false, foreign_key: true
      t.datetime :starts, null:false
      t.datetime :ends
      t.string :location
      t.integer :status, null:false
      t.integer :theme, null:false

      t.timestamps
    end
  end
end
