require "test_helper"

class AttendeesControllerTest < ActionDispatch::IntegrationTest
  test "should accept attendee request" do
    sign_in users(:batman)
    guild_event = guild_events(:event1)

    assert_difference "Attendee.count" do
      post attend_event_path(guild_event), params: { 
        attendee: { guild_event_id:guild_event.id, status: "accepted" }
      }
    end

    assert_equal "Your status for the event is saved!", flash[:success]
    assert_redirected_to guild_event_url(guild_event)
  end
end
