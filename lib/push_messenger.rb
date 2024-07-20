module PushMessenger

  class GuildNotification
    def initialize(user)
      @user = user
    end

    def deliver(payload)
      if @user.device_type == 'android'
        Gcm.new.deliver(@user.device_id, payload)
      elsif @user.device_type == 'ios'
        Ios.new.deliver(@user.device_id, payload)
      elsif @user.device_type == 'web'
        Web.new.deliver(@user.device_id, payload)
      end
    end
  end


  class Gcm
    def deliver(app, tokens, payload, expiry=1.day.to_i)
      tokens = *tokens
      n = Rpush::Gcm::Notification.new
      n.app = Rpush::Gcm::App.find_by_name(app)
      n.registration_ids = tokens
      n.expiry = expiry
      n.data = payload
      n.priority = 'high'
      n.save!
    end
  end

  class Ios
    def deliver(app, tokens, payload)
      tokens = *tokens
      n = Rpush::Gcm::Notification.new
      n.app = Rpush::Gcm::App.find_by_name(app)
      n.registration_ids = tokens
      n.data = payload
      n.notification = { title: payload[:payload][:title] }
      n.save!
    end
  end

  class Web
    def deliver(app, tokens, payload)
      # tokens = *tokens
      # n = Rpush::Gcm::Notification.new
      # n.app = Rpush::Gcm::App.find_by_name(app)
      # n.registration_ids = tokens
      # n.data = payload
      # n.notification = { title: payload[:payload][:title] }
      # n.save!


      sub = current_user.push_subscribers.last

      WebPush.payload_send(
        message: messagebody,
        endpoint: sub.endpoint,
        p256dh: sub.p256dh_key,
        auth: sub.auth_key,
        vapid: {
          subject: "mailto:firebase-adminsdk-g4trl@guild-hall-200d4.iam.gserviceaccount.com",
          public_key: Rails.application.credentials.dig(:webpush, :public_key),
          private_key: Rails.application.credentials.dig(:webpush, :private_key)
        }
      )

    end
  end
end