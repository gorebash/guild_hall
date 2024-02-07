require "test_helper"

class JoinRequestTest < ActiveSupport::TestCase
  test "status defaults to pending" do
    @join_request = JoinRequest.new
    @join_request.user = users(:batman)
    @join_request.guild = guilds(:avengers)
    @join_request.invite_code = guilds(:avengers).invite_code

    assert @join_request.valid?
    assert @join_request.save
    assert_equal "pending", @join_request.status
  end

  test "invite code must match guild" do
  end
end
