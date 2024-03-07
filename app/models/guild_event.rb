class GuildEvent < ApplicationRecord
  belongs_to :user
  belongs_to :guild
  enum :status, [:upcoming, :cancelled, :past], default: :upcoming
  enum :theme, [:primary, :info, :success, :warning, :danger], default: :primary # :secondary

  before_create do
    self.theme = rand(5)
  end
end
