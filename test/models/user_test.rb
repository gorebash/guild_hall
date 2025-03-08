require "test_helper"

class UserTest < ActiveSupport::TestCase
  
  test "creates valid user" do
    @user = User.new
    @user.username = "test"
    @user.email = "test@example.com"
    @user.password = "password"
    @user.first_name = "test"
    @user.last_name = "test"
    @user.birth_date = Date.new(2000, 1, 1)

    assert @user.valid?
    assert @user.save
  end

  test "saves user bio" do
    @user = users(:batman)
    @user.bio = "I'm Batman"

    assert @user.valid?
    assert @user.save
  end
end
