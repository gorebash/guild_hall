class JoinRequestsController < ApplicationController
  before_action :authenticate_user!
  before_action :require_permission, only: %i[ update ]
  before_action :set_join_request, only: %i[ show edit update destroy ]
  after_action :clear_session, only: %i[ create update ]

  # GET /join_requests or /join_requests.json
  def index
    @join_requests = JoinRequest.where guild_id:@guild.id, status: :pending
  end

  # GET /join_requests/new
  def new
    @join_request = JoinRequest.new

    if params[:invite_code]
      token = params[:invite_code].upcase
      @join_request.invite_code = token
      @join_request.valid_code = true if find_guild_by_code token
    end
  end

  # GET /guilds/1/join_requests/1/edit
  def edit
  end

  # POST /join_requests or /join_requests.json
  def create
    
    @join_request = JoinRequest.new(join_request_params)
    @join_request.user = current_user
    @join_request.invite_code = @join_request.invite_code.upcase
    @join_request.guild = find_guild_by_code @join_request.invite_code

    if (@join_request.guild == nil)
      flash[:danger] = "That guild does not exist."
      return render :new, status: :unprocessable_entity
    end

    if JoinRequest.exists? invite_code: @join_request.invite_code, user: current_user
      flash[:danger] = "You have already requested to join this guild."
      return render :new, status: :unprocessable_entity
    end

    respond_to do |format|
      if @join_request.save
        flash[:success] = "Your request to join was successfully sent."
        format.html { redirect_to new_join_request_url }
        format.json { render :show, status: :created, location: @join_request }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @join_request.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /join_requests/1 or /join_requests/1.json
  def update
    respond_to do |format|
      if @join_request.update(join_approval_params)

        if (@join_request.status == "accepted")
          membership = GuildMember.new()
          membership.user = @join_request.user
          membership.guild = @join_request.guild
          
          if !membership.save 
            flash[:danger] = "There was a problem creating this membership."
            return render :edit, status: :unprocessable_entity
          end
        end
        
        flash[:success] = "Membership was #{@join_request.status}."
        format.html { redirect_to join_requests_path }
        
      else
        flash[:danger] = "There was a problem saving the join decision."
        format.html { render :edit, status: :unprocessable_entity }
      end
    end
  end

  private
    
  def set_join_request
    @join_request = JoinRequest.find(params[:id])
    @join_user = User.find(@join_request.user_id)
  end

  def join_request_params
    params.require(:join_request).permit(:invite_code)
  end

  def join_approval_params
    params.require(:join_request).permit(:status)
  end

  def require_permission
    no_access_redirect("You are not able to view requests for this guild.") if 
      !GuildMember.exists?(guild_id: @guild.id, user: current_user)
  
    no_access_redirect("You are not an administrator for this guild.") if 
      !can_edit_guild?  
  end

  def no_access_redirect(message)
    respond_to do |format|
      flash[:danger] = message
      format.html { redirect_to guild_url(@guild) }
    end
  end

  def find_guild_by_code (invite_code)
    Guild.where(invite_code: invite_code).take
  end

  def clear_session
    session[:join_request_count] = nil
  end
end