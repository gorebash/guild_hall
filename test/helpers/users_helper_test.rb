require "test_helper"

class UsersHelperTest < ActionView::TestCase
    test "role checks should provide current users guild role" do
        @guild = guilds(:justice)
        @user = users(:batman)
    
        sign_in (@user)
    
        assert_equal :owner, @user.guild_role
        assert_true @user.can_edit_guild?
    end
    
    test "role checks for user with no guild membership should return nil" do
        @guild = nil
        @user = users(:user_with_no_guild)

        assert_nil @user.guild_role
        assert_false @user.can_edit_guild?
    end
end