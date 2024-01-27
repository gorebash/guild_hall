class Guild < ApplicationRecord
    has_many :guild_members
    has_many :users, through: :guild_members
    has_many :messages
    has_many :join_requests

    validates :name, :description, presence: true

    before_create do
        self.invite_code = generate_unique_token(6)
    end

    def generate_unique_token(length)
        loop do
            token = SecureRandom.hex(length / 2)[0, length]
            return token unless Guild.exists? invite_code: token
        end
    end
end
