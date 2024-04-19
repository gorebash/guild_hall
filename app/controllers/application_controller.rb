class ApplicationController < ActionController::Base
  helper_method :guild_role, :can_edit_guild?, :join_request_count
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

  def current_user_in_guild?
    return false if !user_signed_in?
    return false if !@guild.guild_members.find_by(user: current_user)
    return true
  end

  def join_request_count
    return 0 if !user_signed_in?
    return 0 if !@guild
    
    return session[:join_request_count] if session[:join_request_count]

    join_count = @guild.join_requests.where(status: "pending").count
    session[:join_request_count] = join_count
    return join_count
  end

  protected

  def set_current_guild
    if user_signed_in?
      @guild = Guild.friendly.find(session[:guild_id]) if session[:guild_id]
      if !@guild
        memberships = GuildMember.where(user_id: current_user.id)

        # if the user is not yet a part of a guild, return
        if !memberships.any?
          return
        end

        # assign the first guild if one is not in session
        @guild = memberships.first.guild


        
      end
      
      # todo: store in session
      @guilds = current_user.guilds
      @events = @guild.guild_events.where('starts >= ?', DateTime.now).take(5)
      
    end
  end
end
