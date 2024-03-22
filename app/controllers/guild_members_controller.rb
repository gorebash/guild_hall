class GuildMembersController < ApplicationController
  before_action :authenticate_user!
  
  def index 
    @users = @guild.users
  end

  def update

    if !can_edit_guild?
      return head :forbidden
    end

    @member = GuildMember.find(params[:id])
    respond_to do |format|
      if @member.update(guild_member_params)
        flash[:success] = "Member role was successfully changed."
        format.html { redirect_to guild_members_path }
        format.json { render :show, status: :ok, location: @member }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @member.errors, status: :unprocessable_entity }
      end
    end
  end


  private

  def guild_member_params
    params.require(:guild_member).permit(:id, :role)
  end
end
