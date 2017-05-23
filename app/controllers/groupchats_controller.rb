class GroupchatsController < ApplicationController

  def index
    @groupchat = Groupchat.new
    @groupchats = policy_scope(Groupchat).reverse_order
  end

  def new
    if request.referrer.split("/").last == "groupchat"
      flash[:notice] = nil
    end
    @groupchat = Groupchat.new
    @users = User.where.not(id: current_user)
  end

  def edit
    @groupchat = Groupchat.find_by(slug: params[:slug])
  end

  def create
    @groupchat = Groupchat.new(groupchat_params)
    @groupchat.users << current_user

    if @groupchat.save
      respond_to do |format|
        format.html { redirect_to @groupchat }
        format.js
      end
    else
      respond_to do |format|
        flash[:notice] = {error: ["a chatroom with this topic already exists"]}
        format.html { redirect_to new_groupchat_path }
        format.js { render template: 'groupchats/groupchat_error.js.erb'}
      end
    end
  end

  def update
    groupchat = Groupchat.find_by(slug: params[:slug])
    groupchat.update(groupchat_params)
    redirect_to groupchat
  end

  def show
    @groupchat = Groupchat.find_by(slug: params[:slug])
    @message = Message.new
  end

  private

    def groupchat_params
      params.require(:groupchat).permit(:topic, {:user_ids => []})
    end

end
