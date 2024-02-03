require "test_helper"

class JoinRequestTest < ActiveSupport::TestCase
  test "status defaults to pending" do
    @join_request = JoinRequest.new
    @join_request.user = User.first
    @join_request.guild = guilds(:two)
    @join_request.invite_code = guilds(:two).invite_code

    assert_equal "pending", @join_request.status
    assert @join_request.valid?
    assert @join_request.save
  end

  test "invite code must match guild" do
  end
end
