require "test_helper"

class GuildMembersControllerTest < ActionDispatch::IntegrationTest
  test "should update membership role" do
    sign_in (users(:batman))
    membership = guild_members(:member_role)
    membership.role = "admin"

    patch guild_member_url(membership), params: { guild_member: { role: membership.role } }
    assert_redirected_to guild_members_url
    assert_equal "admin", GuildMember.find(membership.id).role
  end
  
  test "should not update membership role if not admin or owner" do
    sign_in (users(:user_with_member_role))
    membership = guild_members(:member_role)
    membership.role = "admin"

    patch guild_member_url(membership), params: { guild_member: { role: membership.role } }
    assert_response :forbidden
  end

  # todo: tests to always ensure exactly one owner.

end
