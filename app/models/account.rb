class Account < ActiveRecord::Base
  belongs_to :user

  validates :account_type, presence: true
end 