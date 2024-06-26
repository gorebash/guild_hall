class GuildsController < ApplicationController
  before_action :authenticate_user!, except: %i[show]
  before_action :set_guild, only: %i[show edit update destroy]

  # GET /guilds or /guilds.json
  def index
  end

  # GET /guilds/1 or /guilds/1.json
  def show
    @guild ||= Guild.friendly.find(params[:id]) if params[:id]

    if (@guild)
    
      if (!current_user.guilds.include? @guild)
        respond_to do |format|
          format.html { redirect_to home_url }
        end
        return
      end
    
      session[:guild_id] = @guild.id

      # todo: overrides appcontroller, need to consolidate
      @events = @guild.guild_events.where('starts >= ?', DateTime.now).take(5)

      @message = Message.new
      @messages = @guild.messages.custom_display
    else
      redirect_to home_url
    end
  end

  # GET /guilds/new
  def new
    @guild = Guild.new
  end

  # GET /guilds/1/edit
  def edit; end

  # POST /guilds or /guilds.json
  def create
    @guild = Guild.new(guild_params)
    saved = @guild.save

    @guild_user = GuildMember.create(guild_id: @guild.id, user_id: current_user.id, role: :owner)
    saved = @guild_user.save

    respond_to do |format|
      if saved
        session[:guild_id] = @guild.id
        format.html { redirect_to guild_url(@guild), notice: 'Guild was successfully created.' }
        format.json { render :show, status: :created, location: @guild }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @guild.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /guilds/1 or /guilds/1.json
  def update
    respond_to do |format|
      if @guild.update(guild_params)
        format.html { redirect_to guild_url(@guild), notice: 'Guild was successfully updated.' }
        format.json { render :show, status: :ok, location: @guild }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @guild.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /guilds/1 or /guilds/1.json
  def destroy

    #todo: delete not hooked up yet
    #todo: ensure proper role

    GuildMember.where(guild:@guild).destroy_all
    Message.where(guild:@guild).destroy_all
    JoinRequest.where(guild:@guild).destroy_all
    GuildEvent.where(guild:@guild).destroy_all
    @guild.destroy

    respond_to do |format|
      format.html { redirect_to guilds_url, notice: 'Guild was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  def set_guild
    if params[:id]
      @guild = Guild.friendly.find(params[:id])
    end
  end

  def guild_params
    params.require(:guild).permit(:name, :description, :banner_image)
  end
end
