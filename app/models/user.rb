class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :messages
  has_many :guild_members
  has_many :guilds, through: :guild_members
  has_many :join_requests

  validates :username,
            presence: true,
            length: { minimum: 3, maximum: 15 },
            uniqueness: { case_sensitive: false }

  validates_date :birth_date, on_or_before: lambda { Date.current }

  has_one_attached :avatar
  validate :image_format

  private
  
  def image_format
    return unless avatar.attached?
    if avatar.blob.content_type.start_with? 'image/'
      if avatar.blob.byte_size > 5.megabytes
        errors.add(:avatar, 'size needs to be less than 5MB')
        avatar.purge
      end
      else
        avatar.purge
        errors.add(:avatar, 'needs to be an image')
      end
  end

end
