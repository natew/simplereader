class ApplicationController < ActionController::Base
  protect_from_forgery
  
  before_filter :load_titles_and_topics
  
  def load_titles_and_topics
    @titles = CachedFeed.where(['title != ?', ''])
    @topics = Topic.order("RANDOM()").limit(50)
  end
  
end
