class Attendee < ApplicationRecord
  belongs_to :user
  belongs_to :guild_event
  enum :status, [:maybe, :accepted, :declined], default: :maybe
end