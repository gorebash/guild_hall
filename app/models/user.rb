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
  has_many :attendees
  has_many :user_devices

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
            length: { minimum: 2, maximum: 50 }

  has_one_attached :avatar
  validate :image_format

  def full_name
    "#{first_name.titleize} #{last_name.titleize}"
  end

  def send_notification_to_user(title, description)
    payload = {payload: { title: title , description: description } }
    android_condition = "device_type = 'android' and user_id = #{id.to_i}"

    register_device(android_condition)
    send_notification(payload, android_condition, 'android')
    
    #ios_condition = "device_type = 'ios' and user_id = #{id.to_i}"
    #send_notification(payload, ios_condition, 'ios')
  end

  private
  
  def image_format
    return unless avatar.attached?
    if avatar.blob.content_type.start_with? 'image/'
      if avatar.blob.byte_size > 1.megabytes
        errors.add(:avatar, 'size needs to be less than 1MB')
        avatar.purge
      end
      else
        avatar.purge
        errors.add(:avatar, 'needs to be an image')
      end
  end

  def send_notification(payload, condition, device_type)
    tokens = UserDevice
      .where(condition)
      .pluck(:token)
      .compact 
      UserDevice.send_notification(tokens, payload, device_type)
  end

  # this needs to be moved to user registration or something
  # replace condition with userId and token props
  def register_device (condition)
    registered = UserDevice
      .where(condition)
      .any?

    if !registered
      UserDevice.create(user_id: id, token: "token_001", device_type: "android")
    end 
  end

end
