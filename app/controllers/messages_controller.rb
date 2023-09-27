class MessagesController < ApplicationController
  def create; end

  private

  def message_render(message)
    render(partial: 'message', locals: { message: })
  end
end
