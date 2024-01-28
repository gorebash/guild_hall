class JoinRequestsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_join_request, only: %i[ show edit update destroy ]

  # GET /join_requests or /join_requests.json
  def index
    guild = Guild.find(params[:guild_id])

    # user must be a member of the current guild
    if (GuildMember.where(guild_id: guild.id, user: current_user).take!)
      @join_requests = JoinRequest.where guild_id:guild.id
    else
      format.html { redirect_to join_requests_url(@join_request), notice: "You are not able to view requests for this guild." }
    end
  end

  # GET /join_requests/1 or /join_requests/1.json
  def show
  end

  # GET /join_requests/new
  def new
    @join_request = JoinRequest.new
  end

  # GET /guilds/1/join_requests/1/edit
  def edit
  end

  # POST /join_requests or /join_requests.json
  def create
    @join_request = JoinRequest.new(join_request_params)
    @join_request.user = current_user
    @join_request.guild = Guild.where(invite_code: @join_request.invite_code).take!

    #todo: check if the join request already exists

    respond_to do |format|
      if @join_request.save
        format.html { redirect_to join_requests_url(@join_request), notice: "Join request was successfully created." }
        format.json { render :show, status: :created, location: @join_request }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @join_request.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /join_requests/1 or /join_requests/1.json
  def update

    # todo: check user owns guild

    respond_to do |format|
      if @join_request.update(join_approval_params)
        format.html { redirect_to guild_join_request_url(@join_request), notice: "Join request was successfully updated." }
        format.json { render :show, status: :ok, location: @join_request }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @join_request.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /join_requests/1 or /join_requests/1.json
  def destroy
    @join_request.destroy

    respond_to do |format|
      format.html { redirect_to join_requests_url, notice: "Join request was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_join_request
      @join_request = JoinRequest.find(params[:id])
      @guild = Guild.find(params[:guild_id])
      @join_user = User.find(@join_request.user_id)
    end

    # Only allow a list of trusted parameters through.
    def join_request_params
      params.require(:join_request).permit(:invite_code)
    end

    def join_approval_params
      params.require(:join_request).permit(:status)
    end
end
