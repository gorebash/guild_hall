class GuildEventsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_guild_event, only: %i[ show edit update destroy ]

  # GET /guild_events or /guild_events.json
  def index
    @guild_events = @guild.guild_events
  end

  # GET /guild_events/1 or /guild_events/1.json
  def show
    @attendee = @guild_event.attendees.find_by(user_id: current_user.id)
  end

  # GET /guild_events/new
  def new
    @guild_event = GuildEvent.new
  end

  # GET /guild_events/1/edit
  def edit
  end

  # POST /guild_events or /guild_events.json
  def create
    @guild_event = GuildEvent.new(guild_event_params)
    @guild_event.user = current_user
    @guild_event.guild = @guild

    respond_to do |format|
      if @guild_event.save
        flash[:success] = "Event was successfully created."
        format.html { redirect_to guild_event_url(@guild_event) }
        format.json { render :show, status: :created, location: @guild_event }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @guild_event.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /guild_events/1 or /guild_events/1.json
  def update
    respond_to do |format|
      if @guild_event.user == current_user && @guild_event.update(guild_event_params)
        flash[:success] = "Event was successfully updated."
        format.html { redirect_to guild_event_url(@guild_event) }
        format.json { render :show, status: :ok, location: @guild_event }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @guild_event.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /guild_events/1 or /guild_events/1.json
  def destroy
    #@guild_event.destroy
    @guild_event.status = "cancelled"
    @guild_event.update(guild_status_params)

    respond_to do |format|
      format.html { redirect_to guild_events_url, notice: "Event was cancelled." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_guild_event
      @guild_event = GuildEvent.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def guild_event_params
      params.require(:guild_event).permit(:name, :description, :starts, :ends, :location)
    end

    def guild_status_params
      params.permit(:status)
    end
end
