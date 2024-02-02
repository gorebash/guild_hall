require "test_helper"

class MessageTest < ActiveSupport::TestCase
  test "message requires body" do
    @message = Message.new
    assert_not @message.save, "saved message with no body"
  end
end
