class Message < ApplicationRecord
  validates :body, presence: true
  #belongs_to :user

  scope :custom_display, -> { order(:created_at).last(20) }

  after_create_commit -> { broadcast_append_later_to 'messages' }
end
