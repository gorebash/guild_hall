class ChatroomChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'chatroom_channel'

    # messages = Messages.all
    # stream_for messages
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
