require 'feedzirra'

class MainController < ApplicationController
  
  def index
    if params[:recache] and '19203239201y321321' == params[:secret]
      cache_feeds
      expire_fragment(:controller => 'main', :action => 'index') # next load of index will re-fragment cache
      render :text => "Done recaching feeds"
    else
      @aggregate = read_cache
      @aggregate = @aggregate.delete_if { |post| post[:feed_item][:body].nil? }
    end
  end
  
  private
  
  def cache_feeds
    system( "rake cron" )
  end
  
  def read_cache
    APP_CONFIG['feeds'].map { |uri|
      begin
        feed = CachedFeed.find_by_uri( uri )
        feed.parsed_feed[:items][0,6].map { |item| { :feed_id => feed.id, :feed_title => feed[:title], :feed_item => item } }
      rescue
        [] # because there might not be anything cached for some feed(s)
      end
    } .flatten .sort_by { |item| item[:feed_item][:published].to_s } .reverse
  end
end
