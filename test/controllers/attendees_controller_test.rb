require "test_helper"

class AttendeesControllerTest < ActionDispatch::IntegrationTest
  test "should accept attendee request" do
    sign_in users(:batman)
    guild_event = guild_events(:event1)

    assert_difference "Attendee.count" do
      post attend_event_path(guild_event), params: { status: "attending" }
    end

    assert_equal "You are now attending the event.", flash[:success]
  end
end
