class JoinRequest < ApplicationRecord
  belongs_to :user
  belongs_to :guild

  validates :invite_code, presence: true

  enum status: {
    pending: 0,
    declined: 1,
    accepted: 2
  }
end
