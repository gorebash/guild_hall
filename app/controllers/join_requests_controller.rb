class JoinRequestsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_join_request, only: %i[ show edit update destroy ]

  # GET /join_requests or /join_requests.json
  def index
    guild = Guild.find(params[:guild_id])

    # user must be a member of the current guild
    # todo: user must also be an admin in the current guild.
    if (GuildMember.exists?(guild_id: guild.id, user: current_user))
      @join_requests = JoinRequest.where guild_id:guild.id, status: "pending"
    else
      flash[:danger] = "You are not able to view requests for this guild."
      format.html { render guilds_path, status: :unprocessable_entity }
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
    @join_request.guild = Guild.where(invite_code: @join_request.invite_code).take
    @join_request.invite_code = @join_request.invite_code.upcase

    if (@join_request.guild == nil)
      flash[:danger] = "That guild does not exist."
      return render :new, status: :unprocessable_entity
    end

    if JoinRequest.exists? invite_code: @join_request.invite_code
      flash[:danger] = "You have already requested to join this guild."
      return render :new, status: :unprocessable_entity
    end

    respond_to do |format|
      if @join_request.save
        flash[:success] = "Your request to join was successfully sent."
        format.html { redirect_to join_requests_url(@join_request) }
        format.json { render :show, status: :created, location: @join_request }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @join_request.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /join_requests/1 or /join_requests/1.json
  def update

    # todo: restrict to admin role in guild as well
    if !(GuildMember.exists? user: current_user, guild: @guild)
      flash[:danger] = "You are not authorized to process membership requests."
      return render :new, status: :unprocessable_entity
    end

    respond_to do |format|
      if @join_request.update(join_approval_params)

        # todo: create guildmembership if approved
        # todo: assign newly created members to an entry role
        if (@join_request.status == "approved")
          membership = GuildMember.new(params.require(:guild_members).permit(:user_id, :guild_id))
          membership.user = @join_request.user
          membership.guild = @join_request.guild
          
          if !membership.save 
            flash[:danger] = "There was a problem creating this membership."
            return render :edit, status: :unprocessable_entity
          end
        end
        
        flash[:success] = "Membership was #{@join_request.status}."
        format.html { redirect_to guild_join_requests_path }
        
      else
        flash[:danger] = "There was a problem saving the join decision."
        format.html { render :edit, status: :unprocessable_entity }
      end
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
