require "test_helper"

class JoinRequestsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @join_request = join_requests(:one)
    @user = users(:batman)

    sign_in (@user)
  end

  test "should get index" do
    get join_requests_url
    assert_response :success
  end

  test "should get new" do
    get new_join_request_url
    assert_response :success
  end

  test "should create join_request" do

    guild = guilds(:league_of_legends)

    assert_difference("JoinRequest.count") do
      post join_requests_url, params: { 
        join_request: { invite_code: guild.invite_code, user_id: @user.id } 
      }
    end
    
    assert_equal "pending", JoinRequest.last.status
    assert_redirected_to join_requests_url(JoinRequest.last)
  end

  test "should reject existing join_request" do
    assert_no_difference("JoinRequest.count") do
      post join_requests_url, params: { 
        join_request: { invite_code: @join_request.invite_code, user_id: @join_request.user_id } 
      }
    end
    
    assert_response :unprocessable_entity, "join request already exists"
  end

  test "should reject unknown invite codes" do
    guild = guilds(:league_of_legends)

    assert_no_difference("JoinRequest.count") do
      post join_requests_url, params: { 
        join_request: { invite_code: "CODE00", user_id: @user.id } 
      }
    end
    
    assert_response :unprocessable_entity, "invalid invite code"
  end

  test "should get edit" do
    get edit_join_request_url(@join_request)
    assert_response :success
  end

  test "should update join_request" do
    patch join_request_url(@join_request), params: { 
      join_request: { 
        guild_id: @join_request.guild_id, invite_code: @join_request.invite_code, status: @join_request.status, user_id: @join_request.user_id 
      } 
    }
    assert_redirected_to join_requests_path
  end

  test "should require edit permissions" do
    @guild = guilds(:justice)
    sign_in users(:user_with_member_role)

    get join_requests_url
    assert_redirected_to guild_url(@guild)
  end

  # test "approval requests should set status to approved" do
  #   assert.fail
  # end

  # test "deny requests should set status to denied" do
  #   assert.fail
  # end

  # test "current_user must belong to guild to update join_requests" do
  #   assert.fail
  # end

  # test "current_user must be a guild admin or owner to update join_requests" do
  #   assert.fail
  # end

  # test "accepted join_requests should create new guild_member" do
  #   assert.fail
  # end
end
