class GuildEvent < ApplicationRecord
  belongs_to :user
  belongs_to :guild
  has_many :attendees
  enum :status, [:upcoming, :cancelled, :past], default: :upcoming
  enum :theme, [:primary, :info, :success, :warning, :danger], default: :primary # :secondary
  has_rich_text :description

  validates :name, :description, :starts, presence: true
  validates_date :starts, on_or_after: lambda { Date.current }
  validates_date :ends, on_or_after: lambda { :starts }

  def accepted
    self.attendees.where(status: :accepted)
  end

  def tentative
    self.attendees.where(status: :maybe)
  end

  def declined
    self.attendees.where(status: :declined)
  end

  before_create do
    self.theme = rand(5)
  end
end
