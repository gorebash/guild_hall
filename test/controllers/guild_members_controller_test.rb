require "test_helper"

class GuildMembersControllerTest < ActionDispatch::IntegrationTest
  test "should update membership role" do
    membership = guild_members(:one)
    membership.role = "admin"

    patch guild_member_url(membership), params: { guild_member: { role: membership.role } }
    assert_redirected_to guild_members_url
    assert_equal "admin", GuildMember.find(membership.id).role
  end

  # todo: tests to always ensure exactly one owner.

end
