class UserDevicesController < ApplicationController
  before_action :authenticate_user!

  def create
    device = Device.create(user_id: current_user.id, token: params[:token], device_type: params[:device_type])
    #device = Device.create(user_id: current_user.id, guild_params)
  end

  
  private

  def message_params
    params.require(:user_device).permit(:token, :device_type)
  end
end
