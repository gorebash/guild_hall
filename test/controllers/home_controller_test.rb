require "test_helper"

class HomeControllerTest < ActionDispatch::IntegrationTest
  test "home does not redirect" do
    get home_url
    assert_response :success
  end
end
