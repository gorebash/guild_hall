class User < ApplicationRecord
  EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  before_save { self.email = email.downcase }

  validates :username,
            presence: true,
            length: { minimum: 3, maximum: 15 },
            uniqueness: { case_sensitive: false }

  validates :email,
            presence: true,
            uniqueness: { case_sensitive: false },
            length: { minimum: 3, maximum: 105 },
            format: { with: EMAIL_REGEX }

  has_many :messages
  has_secure_password
end
