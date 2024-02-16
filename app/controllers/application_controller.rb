class ApplicationController < ActionController::Base
  # helper_method :guild_role, :can_edit_guild?

  before_action :set_current_guild

  before_action :configure_permitted_parameters, if: :devise_controller?

  def set_current_guild
    if user_signed_in?
      
      @guild = Guild.find(session[:guild_id]) if session[:guild_id]
      if !@guild
        @guild = GuildMember.where(user_id: current_user.id).first.guild
      end
      
      # todo: store in session
      @guilds = current_user.guilds

    end
  end
  
  
  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :birth_date])
  end

  
end
