class PushSubscribersController < ActionController::API
  before_action :authenticate_user!

  def create
    @subscriber = PushSubscriber.find_by(user: current_user, endpoint: params[:endpoint])
    if (@subscriber)
      return render json: @subscriber
    end

    @subscriber = PushSubscriber.new(
      user: current_user,
      endpoint: params[:endpoint],
      auth_key: params[:keys][:auth],
      p256dh_key: params[:keys][:p256dh],
    )

    if @subscriber.save
      render json: @subscriber
    else
      render json: @subscriber.errors.full_messages
    end
    
  end
end
