require "test_helper"

class MessageTest < ActiveSupport::TestCase

  test "creates valid message" do
    @message = Message.new
    @message.user = users(:one)
    @message.guild = guilds(:one)
    @message.body = "test 1"

    assert @message.valid?
    assert @message.save
  end

  test "message requires body" do
    @message = Message.new
    assert_not @message.save, "saved message with no body"
  end

  test "message requires guild" do
    @message = Message.new
    @message.user = users(:one)
    @message.body = "test 1"

    assert_not @message.save, "saved message with no guild"
  end
end
