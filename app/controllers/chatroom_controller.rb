class ChatroomController < ApplicationController
  def index
    @message = Message.new
    @messages = Message.custom_display
  end
end
