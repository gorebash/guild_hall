class ApplicationController < ActionController::Base
  helper_method :guild_role, :can_edit_guild?
  before_action :set_current_guild

  def guild_role
    return nil if !user_signed_in?
    return nil if !@guild

    guild_member = current_user.guild_members.find_by guild:@guild
    return nil if !guild_member
    
    guild_member.role
  end

  def can_edit_guild?
      ["owner", "admin"].include?(guild_role)
  end

  protected

  def set_current_guild
    if user_signed_in?
      
      @guild = Guild.friendly.find(session[:guild_id]) if session[:guild_id]
      if !@guild
        memberships = GuildMember.where(user_id: current_user.id)

        # if the user is not yet a part of a guild redirect to start page
        if !memberships.any?
          #redirect_to home_path
          # @guild = Guild.new
          return
        end

        # assign the first guild if one is not in session
        @guild = memberships.first.guild


        # todo: store in session
        @guilds = current_user.guilds
        @events = @guild.guild_events.where('starts >= ?', DateTime.now).take(5)
      end
      
      
    end
  end
end
