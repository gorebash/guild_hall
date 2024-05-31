class MessagesController < ApplicationController
  before_action :authenticate_user!
  
  def new
    @guild = Guild.friendly.find(params[:guild_id])
  end

  def create
    message = current_user.messages.build(message_params)

    # todo: check that this user has permissions to message this guild
    message.guild = @guild

    if message.save

      if !send_notification message.body
        flash.now[:error] = 'Could not make the notification :('
      end

      respond_to do |format|
        format.html { redirect_to guilds_path }
        format.turbo_stream
      end
    else
      flash.now[:error] = 'Could not save the message at this time'
      redirect_to guilds_path, status: :unprocessable_entity
    end
  end

  private

  def message_params
    params.require(:message).permit(:body)
  end

  def send_notification(messageBody)
    auth_key = Rails.application.credentials.FCM_AUTH_KEY

    fcm = FCM.new(
      auth_key,
      '/etc/secrets/firebase-credentials.json',
      'guild-hall-200d4'
    )
    message = {
      #'topic': "guild_hall_global", 

      
      # OR token if you want to send to a specific device
      'token': "token00",


      'data': {
        payload: {
          data: {
            id: 1
          }
        }.to_json
      },
      'notification': {
        title: 'notification.title_th',
        body: 'notification.body_th',
      },
      'android': {},
      # 'apns': {
      #   payload: {
      #     aps: {
      #       sound: "default",
      #       category: "#{Time.zone.now.to_i}"
      #     }
      #   }
      # },
      'fcm_options': {
        analytics_label: 'testing'
      }
    }

    resp = fcm.send_v1(message)
    if !resp
      false
    end

    true
  end
end
