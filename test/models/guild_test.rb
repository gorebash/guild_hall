require "test_helper"

class GuildTest < ActiveSupport::TestCase

  test "should require name" do
    @guild = Guild.new
    assert_not @guild.save, "saved guild without name"
  end

  test "should generate an invite code" do
    @guild = Guild.new(name:"guild 1", description: "guild 1 desc")
    assert @guild.valid?
    assert @guild.save
    assert @guild.invite_code != nil
  end
end
