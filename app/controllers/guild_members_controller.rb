class GuildMembersController < ApplicationController
  def index 
    @members = @guild.users
  end
end
