class ApplicationController < ActionController::Base
  helper_method :guild_role, :can_edit_guild?

  before_action :set_current_guild
  before_action :configure_permitted_parameters, if: :devise_controller?

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

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :birth_date])
  end

  def set_current_guild
    if user_signed_in?
      
      @guild = Guild.find(session[:guild_id]) if session[:guild_id]
      if !@guild
        @guild = GuildMember.where(user_id: current_user.id).first.guild
      end
      
      # todo: store in session
      @guilds = current_user.guilds
      @events = @guild.guild_events
    end
  end
end
