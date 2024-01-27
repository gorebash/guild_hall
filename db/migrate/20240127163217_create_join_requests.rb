class CreateJoinRequests < ActiveRecord::Migration[7.0]
  def change
    create_table :join_requests do |t|
      t.references :user, null: false, foreign_key: true
      t.references :guild, null: false, foreign_key: true
      t.string :invite_code
      t.integer :status, null: false, default: 0

      t.timestamps
    end
  end
end
