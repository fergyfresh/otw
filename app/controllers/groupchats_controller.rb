class GroupchatsController < ApplicationController

  def index
    @groupchat = Groupchat.new
    @groupchats = policy_scope(Groupchat).reverse_order
  end

  def new
    @groupchat = Groupchat.new
    @users = User.where.not(id: current_user)
    gon.current_user = current_user
  end

  def edit
    @groupchat = Groupchat.find_by(slug: params[:slug])
    gon.ids = @groupchat.users.pluck(:id).map(&:to_s)
    gon.names = @groupchat.users.pluck(:name).map(&:to_s)
  end
  
  def destroy
    @groupchat = Groupchat.find_by(slug: params[:slug])
    if @groupchat.users[0] == current_user
      @groupchat.destroy!
    end
    redirect_to authenticated_root_url
  end    

  def leave
    @groupchat = Groupchat.find_by(slug: params[:groupchat_id])
    @groupchat.users.delete(current_user)
    redirect_to authenticated_root_url
  end

  def create
    params[:groupchat][:user_ids] = params[:groupchat][:user_ids][0].split(',')
    @groupchat = Groupchat.new(groupchat_params)

    if @groupchat.save
      respond_to do |format|
        format.html { redirect_to @groupchat }
        format.js
      end
    else
      respond_to do |format|
        flash[:notice] = {error: ["A chatroom with this topic already exists"]}
        format.html { redirect_to new_groupchat_path }
        format.js { render template: 'groupchats/groupchat_error.js.erb' }
      end
    end
  end

  def update
    params[:groupchat][:user_ids] = params[:groupchat][:user_ids][0].split(',')
    @groupchat = Groupchat.find_by(slug: params[:slug])
    if @groupchat.users[0] == current_user
      @groupchat.update(groupchat_params)
    end

    redirect_to @groupchat
  end

  def show
    @groupchat = Groupchat.find_by(slug: params[:slug])
    @message = Message.new
    gon.current_user = current_user
  end

  private
    def groupchat_params
      params.require(:groupchat).permit(:topic, {:user_ids => []})
    end
end
