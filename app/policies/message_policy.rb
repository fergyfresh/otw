class MessagePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      Message.where(groupchat_id: user.groupchats)
    end
  end
end
