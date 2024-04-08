require "test_helper"

class AttendeesControllerTest < ActionDispatch::IntegrationTest
  test "should create attendee for event" do
    sign_in users(:batman)
    guild_event = guild_events(:event1)

    assert_difference "Attendee.count" do
      post guild_event_attendees_url(guild_event.id), params: { 
        attendee: { status: "accepted" }
      }
    end

    assert_equal "Your status for the event is saved!", flash[:success]
    assert_redirected_to guild_event_url(guild_event)
  end
end
