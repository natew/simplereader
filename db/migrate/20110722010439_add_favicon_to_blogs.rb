class AddFaviconToBlogs < ActiveRecord::Migration
  def self.up
    add_column :blogs, :favicon_file_name,    :string
    add_column :blogs, :favicon_content_type, :string
    add_column :blogs, :favicon_file_size,    :integer
    add_column :blogs, :favicon_updated_at,   :datetime
  end

  def self.down
    remove_column :blogs, :favicon_file_name
    remove_column :blogs, :favicon_content_type
    remove_column :blogs, :favicon_file_size
    remove_column :blogs, :favicon_updated_at
  end
end
