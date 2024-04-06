class AttendeesController < ApplicationController
    before_action :authenticate_user!
    before_action :set_attendee, except: [:index, :new, :create]
    before_action :set_guild_event
    before_action :validate_guild_membership, only: [:create, :update]

    def index
        @attendees = @guild_event.attendees
        
        @accepted = @attendees.where(status: :accepted).sort()
        @tentative = @attendees.where(status: :maybe).sort()
        @declined = @attendees.where(status: :declined).sort()
    end

    def new
        @attendee = Attendee.new
    end

    def show
    end
    
    def create
        @attendee = Attendee.new(attendee_params)
        @attendee.user = current_user
        @attendee.guild_event = @guild_event

        respond_to do |format|
            if @attendee.save
                flash[:success] = "Your status for the event is saved!"
                format.html { redirect_to guild_event_path(@attendee.guild_event) }
            else
                flash[:danger] = "Could not save your event attendance, please try again."
                format.html { render :new, status: :unprocessable_entity }
            end
        end
    end

    def edit
    end

    def update
      @attendee.guild_event = @guild_event
      respond_to do |format|
        if @attendee.update(attendee_params)
          flash[:success] = "Your status for the event is saved!"
          format.html { redirect_to guild_event_attendee_path(@guild_event, @attendee) }
        else
          format.html { render :edit, status: :unprocessable_entity }
        end
      end
    end
    
    private
    
    def attendee_params
      params.require(:attendee).permit(:status)
    end

    def set_attendee
      @attendee = Attendee.find(params[:id])
    end

    def set_guild_event
      @guild_event = GuildEvent.find(params[:guild_event_id])
    end

    def validate_guild_membership
      unless current_user_in_guild? && @guild_event.guild == @guild
        flash[:danger] = "You are not a member of this guild."
        return redirect_to guild_event_path(@guild_event)
      end
    end
end
