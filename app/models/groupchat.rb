class Groupchat < ApplicationRecord
  has_many :messages, dependent: :destroy
  has_many :memberships, dependent: :destroy
  has_many :users, :through => :memberships
  validates :topic, presence: true, uniqueness: true, case_sensitive: false
  before_validation :sanitize, :slugify, :clean_members

  def to_param
    self.slug
  end

  def slugify
    self.slug = self.topic.downcase.gsub(" ", "-")
  end

  def sanitize
    self.topic = self.topic.strip
  end
  
  def clean_members
    self.user_ids = self.user_ids[0].split(',')
  end
end
