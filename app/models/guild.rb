class Guild < ApplicationRecord
    has_many :guild_members
    has_many :users, through: :guild_members

    validates :name, :description, presence: true
end
