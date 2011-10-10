class Blog < ActiveRecord::Base
  has_many :posts
  has_attached_file :favicon, :styles => { :large => "256x256>", :medium => "32x32>", :icon => "16x16>" }
end
