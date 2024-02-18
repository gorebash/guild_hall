module GuildMembersHelper
  def membership_for(user, guild)
    GuildMember.find_by(user:user, guild:guild)
  end
end
