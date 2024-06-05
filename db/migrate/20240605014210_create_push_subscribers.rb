class CreatePushSubscribers < ActiveRecord::Migration[7.0]
  def change
    create_table :push_subscribers do |t|
      t.references :user, null: false, foreign_key: true
      t.string :endpoint
      t.string :auth_key
      t.string :p256dh_key

      t.timestamps
    end
  end
end
