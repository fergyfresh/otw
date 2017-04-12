class GroupchatPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      user.groupchats
    end
  end
end
