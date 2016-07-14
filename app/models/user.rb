class User < ActiveRecord::Base
  has_many :accounts
  has_many :storages
  validates :name, presence: true
  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :password_hash, presence: true
end 