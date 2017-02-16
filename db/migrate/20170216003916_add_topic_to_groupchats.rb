class AddTopicToGroupchats < ActiveRecord::Migration[5.0]
  def change
    add_column :groupchats, :topic, :string
  end
end
