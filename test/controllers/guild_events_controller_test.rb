require "test_helper"

class GuildEventsControllerTest < ActionDispatch::IntegrationTest
  setup do
    sign_in(users(:batman))
    @guild_event = guild_events(:event1)
  end

  test "should get index" do
    get guild_events_url
    assert_response :success
  end

  test "should get new" do
    get new_guild_event_url
    assert_response :success
  end

  # test "should create guild_event" do
  #   @guild = guilds(:justice)

  #   assert_difference("GuildEvent.count") do
  #     post guild_events_url, params: { 
  #       guild_event: { 
  #         name: @guild_event.name, 
  #         description: @guild_event.description, 
  #         location: @guild_event.location, 
  #         starts: 10.days.from_now.to_s, 
  #         ends: 11.days.from_now.to_s,
  #       }
  #     }
  #   end

  #   assert_redirected_to guild_event_url(GuildEvent.last)
  # end

  test "should show guild_event" do
    get guild_event_url(@guild_event)
    assert_response :success
  end

  test "should get edit" do
    get edit_guild_event_url(@guild_event)
    assert_response :success
  end

  # test "should update guild_event" do
  #   patch guild_event_url(@guild_event), params: { 
  #     guild_event: { 
  #       name: @guild_event.name, 
  #       description: @guild_event.description, 
  #       location: @guild_event.location, 
  #       starts: 10.days.from_now, 
  #       ends: 11.days.from_now, 
  #     }
  #   }
  #   assert_redirected_to guild_event_url(@guild_event)
  # end

  test "should destroy guild_event" do
    delete guild_event_url(@guild_event)

    assert_equal @guild_event.status, 'cancelled'
    assert_redirected_to guild_events_url
  end
end
