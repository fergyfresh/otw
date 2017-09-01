class MessagesController < ApplicationController

  def create
    message = Message.new(message_params)
    message.user = current_user
    if message.save
      ActionCable.server.broadcast "messages_#{message.groupchat_id}_channel",
        message: message.content,
        user: message.user.name
      head :ok
    end
  end

  private

    def message_params
      params.require(:message).permit(:content, :groupchat_id)
    end
end
