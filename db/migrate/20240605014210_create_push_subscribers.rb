class CreatePushSubscribers < ActiveRecord::Migration[7.0]
  def change
    create_table :push_subscribers do |t|
      t.references :user, null: false, foreign_key: true
      # t.string :endpoint
      # t.string :auth_key
      # t.string :p256dh_key
      t.string :device_token, null: false
      t.string :device_type, null: false

      t.timestamps
    end
  end
end
