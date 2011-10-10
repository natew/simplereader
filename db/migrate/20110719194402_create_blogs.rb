class CreateBlogs < ActiveRecord::Migration
  def self.up
    create_table :blogs do |t|
      t.string :title, :url, :feed, :author, :email, :twitter, :facebook
      t.text :description
      t.integer :views, :flow, :importance
      t.timestamps
    end
  end

  def self.down
    drop_table :blogs
  end
end
