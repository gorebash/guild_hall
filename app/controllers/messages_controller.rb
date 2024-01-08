class MessagesController < ApplicationController
  before_action :authenticate_user!
  
  def new; end

  def create
    message = current_user.messages.build(message_params)
    if message.save
      respond_to do |format|
        format.html { redirect_to chatroom_path }
        format.turbo_stream
      end
    else
      flash.now[:error] = 'Could not save the message at this time'
      redirect_to chatroom_path, status: :unprocessable_entity
    end
  end

  private

  def message_params
    params.require(:message).permit(:body)
  end
end
