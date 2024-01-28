class JoinRequest < ApplicationRecord
  belongs_to :user
  belongs_to :guild

  #enum :status, [:shipped, :being_packed, :complete, :cancelled]
  enum status: {
    pending: 0,
    declined: 1,
    accepted: 2
  }

  def get_status (key) 
    status[key]
  end
end
