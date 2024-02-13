module UsersHelper
    def guild_role
        debugger
        if !@guild
            return nil
        end
        
        guild_member = self.guild_members.where guild:@guild
        if (!guild_member)
            return nil
        end
        
        guild_member.role
    end

    def can_edit_guild?
        guild_role == :owner || guild_role == :admin
    end
end
