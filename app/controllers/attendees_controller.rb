class AttendeesController < ApplicationController
    before_action :authenticate_user!

    def new
        @attendee = Attendee.new
    end
    
    def create
        @attendee = Attendee.new(attendee_params)
        @attendee.user = current_user

        respond_to do |format|
            if @attendee.save
                flash[:success] = "Your status for the event is saved!"
                format.html { redirect_to guild_event_path(@attendee.guild_event) }
            else
                flash[:danger] = "Could not save your event attendance, please try again."
                #format.html { render :new, status: :unprocessable_entity }
            end
        end
    end
    
    private
    
    def attendee_params
        params.require(:attendee).permit(:guild_event_id, :status)
    end
end
