class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :messages

  validates :username,
            presence: true,
            length: { minimum: 3, maximum: 15 },
            uniqueness: { case_sensitive: false }

  validates_date :birth_date, on_or_before: lambda { Date.current },
            presence: true

  has_many :messages
end
