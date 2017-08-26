module ApplicationHelper
  def current_action?(controller: 'default', action: 'default')
    (controller == params[:controller]) and (action == params[:action])
  end

end
