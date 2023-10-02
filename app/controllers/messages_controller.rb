class MessagesController < ApplicationController
  def create
    message = current_user.messages.build(message_params)
    if message.save

      ActionCable.server.broadcast('chatroom_channel',
                                   { message_view: message_render(message) })
    else
      flash.now[:error] = 'Could not save the message at this time'
      # redirect_to chatroom_path, status: :unprocessable_entity
    end
  end

  private

  def message_render(message)
    render(partial: 'message', locals: { message: })
  end

  def message_params
    params.require(:message).permit(:body)
  end
end
