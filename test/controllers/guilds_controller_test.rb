require "test_helper"

class GuildsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @guild = guilds(:justice)
    @user = users(:batman)

    sign_in (@user)
  end

  test "should get index" do
    get guilds_url
    assert_response :success
  end

  test "should get new" do
    get new_guild_url
    assert_response :success
  end

  test "should create guild" do
    assert_difference("Guild.count") do
      post guilds_url, params: { guild: { description: @guild.description, name: @guild.name } }
    end

    assert_equal Guild.last.id, session[:guild_id]
    assert_redirected_to guild_url(Guild.last)
  end

  test "should add creator to guild members" do
    assert_difference("GuildMember.count") do
      post guilds_url, params: { guild: { description: @guild.description, name: @guild.name } }
    end

    assert_equal Guild.last, GuildMember.last.guild
    assert_equal @user, GuildMember.last.user
    assert_equal "owner", GuildMember.last.role
  end

  test "should show guild" do
    get guild_url(@guild)

    assert_response :success
    assert_equal @guild.id, session[:guild_id]
  end

  test "should redirect to home for user with no guilds" do
    @user = users(:user_with_no_guild)
    sign_in (@user)

    get root_url
    assert_redirected_to home_url
  end

  test "should not show guild for non-members" do
    @user = users(:ironman)
    sign_in (@user)
    
    get guild_url(@guild)
    assert_redirected_to home_url # should redirect to their default guild?
  end

  test "should get edit" do
    get edit_guild_url(@guild)
    assert_response :success
  end

  test "should update guild" do
    patch guild_url(@guild), params: { guild: { description: @guild.description, name: @guild.name } }
    assert_redirected_to guild_url(@guild)
  end

  test "should destroy guild" do
    assert_difference("Guild.count", -1) do
      delete guild_url(@guild)
    end

    assert_empty GuildMember.where(guild:@guild)
    assert_empty Message.where(guild:@guild)
    assert_empty JoinRequest.where(guild:@guild)

    assert_redirected_to guilds_url
  end
end
