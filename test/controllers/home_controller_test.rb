require "test_helper"

class HomeControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get home_url
    assert_response :success
  end

  test "signed in user with no guild should render" do
    assert false
  end
end
