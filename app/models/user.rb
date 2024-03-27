class User < ApplicationRecord
  extend FriendlyId

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  friendly_id :username, use: :slugged

  has_many :messages
  has_many :guild_members
  has_many :guilds, through: :guild_members
  has_many :join_requests
  has_many :guild_events

  validates :username,
            presence: true,
            length: { minimum: 3, maximum: 15 },
            uniqueness: { case_sensitive: false }

  validates_date :birth_date, on_or_before: lambda { Date.current }

  validates :first_name,
            presence: true,
            length: { minimum: 2, maximum: 25 }
  
  validates :last_name,
            presence: true,
            length: { minimum: 2, maximum: 35 }

  has_one_attached :avatar
  validate :image_format

  def full_name
    "#{first_name} #{last_name}"
  end

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
