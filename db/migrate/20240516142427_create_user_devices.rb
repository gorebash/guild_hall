class CreateUserDevices < ActiveRecord::Migration[7.0]
  def change
    create_table :user_devices do |t|
      t.string :token
      t.string :device_type
      t.references :user, index: true, foreign_key: true

      t.timestamps
    end
  end
end
