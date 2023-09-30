class SessionsController < ApplicationController
  def new; end

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      session[:user_id] = user.id
      flash[:success] = "#{user.username} has successfully logged in"
      redirect_to chatroom_path
    else
      flash.now[:error] = 'There was a problem with the information you provided'
      render :new, status: :unprocessable_entity
    end
  end

  def destroy
    session[:user_id] = nil
    flash[:success] = 'You have been logged out'
    redirect_to root_path
  end
end
