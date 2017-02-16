# app/channels/messages_channel.rb
class MessagesChannel < ApplicationCable::Channel  
  def subscribed
    stream_from "messages_#{params['groupchat_id']}_channel"
  end
end 
