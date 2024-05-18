
# To create the rpush apps run:
# $ bundle exec rake rpush:android_app
# $ bundle exec rake rpush:ios_app

namespace :rpush do
  desc "Create Rpush android app"
  task android_app: [:environment] do
    Rpush::Gcm::App.create(name: "guild-hall-200d4", connections: 1, environment: Rails.env, type: "Rpush::Client::ActiveRecord::Gcm::App", auth_key: Rails.application.credentials.FCM_AUTH_KEY)
    puts "Rpush Android app created Successfully"
  end

  desc "Create Rpush Ios app"
  task ios_app: [:environment] do
    Rpush::Gcm::App.create(name: "ios_app", connections: 1, environment: Rails.env, type: "Rpush::Client::ActiveRecord::Gcm::App", auth_key: FCM_AUTH_KEY, certificate: File.read("config/file_name.p8"))
    puts "Rpush IOS app created Successfully"
  end
end
