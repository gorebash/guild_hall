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

      ##
      current_user.send_notification_to_user("New Guild Message", "Someone mentioned you!")
      
      ##
      

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
end
