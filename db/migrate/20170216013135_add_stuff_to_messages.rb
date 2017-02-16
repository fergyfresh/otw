class AddStuffToMessages < ActiveRecord::Migration[5.0]
  def change
    add_column :messages, :user_id, :integer
    add_column :messages, :groupchat_id, :integer
    add_column :messages, :content, :string
  end
end
