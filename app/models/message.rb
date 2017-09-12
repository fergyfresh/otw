class Message < ApplicationRecord
  belongs_to :groupchat
  belongs_to :user
  validates :topic, presence: true 
end
