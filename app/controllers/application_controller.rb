class ApplicationController < ActionController::Base
  helper_method :logged_in?, :current_user

  def logged_in?
    session[:user_id] != nil
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def require_user
    return if logged_in?

    flash[:error] = 'You must be logged in to perform that action'
    redirect_to login_path
  end
end
