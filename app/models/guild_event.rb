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
    
    # STOP. This needs to be a single entry per user.

    attnd = attendees_distinct_sorted

    attnd.where(status: :accepted)
    
  end

  def tentative
    attendees_distinct_sorted.where(status: :maybe)
  end

  def declined
    attendees_distinct_sorted.where(status: :declined)
  end

  def attendees_distinct_sorted
    self.attendees.order(:created_at).select(:user_id).distinct
  end

  before_create do
    self.theme = rand(5)
  end
end
