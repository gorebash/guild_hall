class AttendeesController < ApplicationController
    before_action :authenticate_user!
    before_action :set_attendee

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
          format.html { redirect_to guild_event_attendee_path(@attendee) }
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
      @guild_event = GuildEvent.find(params[:guild_event_id])
    end
end
