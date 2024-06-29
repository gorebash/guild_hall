class PushSubscribersController < ActionController::API
  before_action :authenticate_user!

  def create
    @subscriber = PushSubscriber.find_by(user: current_user, device_token: params[:token])
    if (@subscriber)
      return render json: @subscriber
    end

    @subscriber = PushSubscriber.new(
      user: current_user,
      device_type: 'webpush',

      # fcm
      device_token: params[:token],

      # webpush
      endpoint: params[:sub][:endpoint],
      auth_key: params[:sub][:keys][:auth],
      p256dh_key: params[:sub][:keys][:p256dh],
    )

    if @subscriber.save
      render json: @subscriber
    else
      render json: @subscriber.errors.full_messages
    end
  end
end
