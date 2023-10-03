class Message < ApplicationRecord
  validates :body, presence: true
  belongs_to :user

  scope :custom_display, -> { order(:created_at).last(50) }

  # after_update_commit { broadcast_update }
  # after_create_commit { broadcast_prepend_to(messages) }
end
