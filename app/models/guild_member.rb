class GuildMember < ApplicationRecord
  belongs_to :user
  belongs_to :guild

  enum :role, [:member, :admin, :owner], default: :member
end
