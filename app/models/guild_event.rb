class GuildEvent < ApplicationRecord
  belongs_to :user
  enum :status, [:upcoming, :cancelled, :past], default: :upcoming
  enum :theme, [:primary, :secondary, :info, :success, :warning, :danger], default: :primary

  before_create do
    self.theme = rand(6)
  end
end
