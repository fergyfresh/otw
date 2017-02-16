class AddSlugToGroupchats < ActiveRecord::Migration[5.0]
  def change
    add_column :groupchats, :slug, :string
  end
end
