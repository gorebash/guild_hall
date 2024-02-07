class JoinRequest < ApplicationRecord
  belongs_to :user
  belongs_to :guild
  enum :status, [:pending, :declined, :accepted], default: :pending

  validates :invite_code, presence: true
end
