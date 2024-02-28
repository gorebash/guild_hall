require "test_helper"

class GuildEventsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @guild_event = guild_events(:one)
  end

  test "should get index" do
    get guild_events_url
    assert_response :success
  end

  test "should get new" do
    get new_guild_event_url
    assert_response :success
  end

  test "should create guild_event" do
    assert_difference("GuildEvent.count") do
      post guild_events_url, params: { guild_event: { description: @guild_event.description, ends: @guild_event.ends, location: @guild_event.location, name: @guild_event.name, starts: @guild_event.starts, status: @guild_event.status, user_id: @guild_event.user_id } }
    end

    assert_redirected_to guild_event_url(GuildEvent.last)
  end

  test "should show guild_event" do
    get guild_event_url(@guild_event)
    assert_response :success
  end

  test "should get edit" do
    get edit_guild_event_url(@guild_event)
    assert_response :success
  end

  test "should update guild_event" do
    patch guild_event_url(@guild_event), params: { guild_event: { description: @guild_event.description, ends: @guild_event.ends, location: @guild_event.location, name: @guild_event.name, starts: @guild_event.starts, status: @guild_event.status, user_id: @guild_event.user_id } }
    assert_redirected_to guild_event_url(@guild_event)
  end

  test "should destroy guild_event" do
    assert_difference("GuildEvent.count", -1) do
      delete guild_event_url(@guild_event)
    end

    assert_redirected_to guild_events_url
  end
end
