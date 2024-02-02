require "test_helper"

class GuildTest < ActiveSupport::TestCase
  test "should not create guild without description" do
    @guild = Guild.new
    assert_not Guild.save, "saved guild without description"
  end

  # test "guild should generate an invite code" do
  #   @guild = Guild.new(name:"guild 1", description: "guild 1 desc")
  #   assert @guild.invite_code
  #   assert @guild.valid?
  # end
end
