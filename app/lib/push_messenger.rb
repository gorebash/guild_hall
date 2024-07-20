module PushMessenger
  
  class Messenger

    def deliver(to_user, message)
      # if @user.device_type == 'android'
      #   Gcm.new.deliver(to_user, message)
      # elsif @user.device_type == 'ios'
      #   Ios.new.deliver(to_user, message)
      # elsif @user.device_type == 'web'
      #   Web.new.deliver(to_user, message)
      # end

      Web.new.deliver(to_user, message)
      Gcm.new.deliver(to_user, message)
    end
  end

  class Web
    def deliver(to_user, message)

      sub = to_user.push_subscribers.last

      WebPush.payload_send(
        message: message,
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


  class Gcm
    def deliver(to_user, message, expiry=1.day.to_i)

      sub = to_user.push_subscribers.last # eventually, this will be where type = 'android', instead of last.
      auth_key = Rails.application.credentials.FCM_AUTH_KEY
  
      fcm = FCM.new(
        auth_key,
        '/etc/secrets/firebase-credentials.json',
        'guild-hall-200d4'
      )
      message = {
        'token': sub.device_token,  
        'data': {
          payload: {
            data: {
              id: 1
            }
          }.to_json
        },
        'notification': {
          title: 'Guild Message Received',
          body: 'A message has been received in your guild',
        },
        'android': {},
        'fcm_options': {
          analytics_label: 'testing',
          link: "https://guild-hall.org"
        }
      }
  
      resp = fcm.send_v1(message)
      if !resp
        false
      end
  
      true
    end
  end

  # class Ios
  #   def deliver(app, tokens, payload)
  #     tokens = *tokens
  #     n = Rpush::Gcm::Notification.new
  #     n.app = Rpush::Gcm::App.find_by_name(app)
  #     n.registration_ids = tokens
  #     n.data = payload
  #     n.notification = { title: payload[:payload][:title] }
  #     n.save!
  #   end
  # end

  
end