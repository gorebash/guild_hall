require "test_helper"

class UserDevicesControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get user_devices_create_url
    assert_response :success
  end
end
