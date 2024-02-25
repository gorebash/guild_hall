class Guild < ApplicationRecord
    has_many :guild_members
    has_many :users, through: :guild_members
    has_many :messages
    has_many :join_requests

    validates :name, :description, presence: true

    before_create do
        self.invite_code = generate_unique_token(6).upcase
    end

    has_one_attached :banner_image
    validate :image_format

    private

    def generate_unique_token(length)
        loop do
            token = SecureRandom.hex(length / 2)[0, length]
            return token unless Guild.exists? invite_code: token
        end
    end

    # todo: move to module or something
    def image_format
        return unless banner_image.attached?
        if banner_image.blob.content_type.start_with? 'image/'
        if banner_image.blob.byte_size > 5.megabytes
            errors.add(:banner_image, 'size needs to be less than 5MB')
            banner_image.purge
        end
        else
            banner_image.purge
            errors.add(:banner_image, 'needs to be an image')
        end
    end
end
