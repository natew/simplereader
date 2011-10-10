class CachedFeed < ActiveRecord::Base
  validates_presence_of :uri, :parsed_feed
  validates_uniqueness_of :uri
  serialize :parsed_feed, Hash
end
