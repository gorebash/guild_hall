module UsersHelper
    def guild_role
        return nil if !@guild
        
        guild_member = @user.guild_members.find_by guild:@guild
        return nil if !guild_member
        
        guild_member.role
    end

    def can_edit_guild?
        ["owner", "admin"].include?(guild_role)
    end
end