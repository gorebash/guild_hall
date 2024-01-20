class Message < ApplicationRecord
  validates :body, presence: true
  belongs_to :user
  belongs_to :guild

  scope :custom_display, -> { order(:created_at).last(20) }

  after_create_commit -> { broadcast_append_later_to 'messages' }
end
