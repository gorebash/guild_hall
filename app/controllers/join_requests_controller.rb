class JoinRequestsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_join_request, only: %i[ show edit update destroy ]

  # GET /join_requests or /join_requests.json
  def index
    @join_requests = JoinRequest.all
  end

  # GET /join_requests/1 or /join_requests/1.json
  def show
  end

  # GET /join_requests/new
  def new
    @join_request = JoinRequest.new
  end

  # GET /join_requests/1/edit
  def edit
  end

  # POST /join_requests or /join_requests.json
  def create
    @join_request = JoinRequest.new(join_request_params)
    @join_request.user = current_user
    @join_request.guild = Guild.where(invite_code: @join_request.invite_code).take!

    respond_to do |format|
      if @join_request.save
        format.html { redirect_to join_request_url(@join_request), notice: "Join request was successfully created." }
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
      if @join_request.update(join_request_params)
        format.html { redirect_to join_request_url(@join_request), notice: "Join request was successfully updated." }
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
    end

    # Only allow a list of trusted parameters through.
    def join_request_params
      params.require(:join_request).permit(:invite_code)
    end
end
