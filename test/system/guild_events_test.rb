require "application_system_test_case"

class GuildEventsTest < ApplicationSystemTestCase
  setup do
    @guild_event = guild_events(:event1)
  end

  test "visiting the index" do
    visit guild_events_url
    assert_selector "h1", text: "Guild events"
  end

  test "should create guild event" do
    visit guild_events_url
    click_on "New guild event"

    fill_in "Description", with: @guild_event.description
    fill_in "Ends", with: @guild_event.ends
    fill_in "Location", with: @guild_event.location
    fill_in "Name", with: @guild_event.name
    fill_in "Starts", with: @guild_event.starts
    fill_in "Status", with: @guild_event.status
    fill_in "User", with: @guild_event.user_id
    click_on "Create Guild event"

    assert_text "Guild event was successfully created"
    click_on "Back"
  end

  test "should update Guild event" do
    visit guild_event_url(@guild_event)
    click_on "Edit this guild event", match: :first

    fill_in "Description", with: @guild_event.description
    fill_in "Ends", with: @guild_event.ends
    fill_in "Location", with: @guild_event.location
    fill_in "Name", with: @guild_event.name
    fill_in "Starts", with: @guild_event.starts
    fill_in "Status", with: @guild_event.status
    fill_in "User", with: @guild_event.user_id
    click_on "Update Guild event"

    assert_text "Guild event was successfully updated"
    click_on "Back"
  end

  test "should destroy Guild event" do
    visit guild_event_url(@guild_event)
    click_on "Destroy this guild event", match: :first

    assert_text "Guild event was successfully destroyed"
  end
end
