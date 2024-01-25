class MessagesController < ApplicationController
  before_action :authenticate_user!
  
  def new
    @guild = Guild.find(params[:guild_id])
  end

  def create
    message = current_user.messages.build(message_params)

    # todo: check that this user has permissions to message this guild
    message.guild_id = params[:guild_id]

    if message.save
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
