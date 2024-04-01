class Attendees < ActiveRecord::Migration[7.0]
  def change
    create_table :attendees do |t|
      t.references :user, null: false, foreign_key: true
      t.references :guild_event, null: false, foreign_key: true
      t.integer :status, null:false

      t.timestamps
    end
  end
end
