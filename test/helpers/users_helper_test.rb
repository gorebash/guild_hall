require "test_helper"

class UsersHelperTest < ActionView::TestCase
    setup do
    end
  
    test "role checks provide users guild role" do
      @user = users(:batman)
      @guild = guilds(:justice)
  
      sign_in (@user)
  
      assert_equal "owner", guild_role
      assert can_edit_guild?
    end
  
    test "unguilded users cannot edit guilds" do
      @guild = nil
      @user = users(:user_with_no_guild)
  
      assert_nil guild_role
      assert_not can_edit_guild?
    end
end