require "application_system_test_case"

class JoinRequestsTest < ApplicationSystemTestCase
  setup do
    @join_request = join_requests(:one)
  end

  test "visiting the index" do
    visit join_requests_url
    assert_selector "h1", text: "Join requests"
  end

  test "should create join request" do
    visit join_requests_url
    click_on "New join request"

    fill_in "Guild", with: @join_request.guild_id
    fill_in "Invite code", with: @join_request.invite_code
    fill_in "Status", with: @join_request.status
    fill_in "User", with: @join_request.user_id
    click_on "Create Join request"

    assert_text "Join request was successfully created"
    click_on "Back"
  end

  test "should update Join request" do
    visit join_request_url(@join_request)
    click_on "Edit this join request", match: :first

    fill_in "Guild", with: @join_request.guild_id
    fill_in "Invite code", with: @join_request.invite_code
    fill_in "Status", with: @join_request.status
    fill_in "User", with: @join_request.user_id
    click_on "Update Join request"

    assert_text "Join request was successfully updated"
    click_on "Back"
  end

  test "should destroy Join request" do
    visit join_request_url(@join_request)
    click_on "Destroy this join request", match: :first

    assert_text "Join request was successfully destroyed"
  end
end
