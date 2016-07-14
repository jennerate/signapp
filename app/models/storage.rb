class Storage < ActiveRecord::Base
  belongs_to :user

  validates :name, presence: true
  validates :link_url, presence: true

end 