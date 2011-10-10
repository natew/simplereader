task :cron => :environment do
  feed_urls = APP_CONFIG['feeds'].map
  
  feeds = Feedzirra::Feed.fetch_and_parse(feed_urls)
  
  feeds.each do |uri,feed|
    puts "saving feed #{uri}"
    
    begin
      feed.sanitize_entries!
    rescue
    end
    
    # save feed
    begin
      new = CachedFeed.find_or_create_by_uri( uri )
      new.title = feed.title
      new.parsed_feed = { :uri => feed.url, :title => feed.title, 
       					:items => feed.entries.map { |item| {:title => item.title, :published => item.published, :link => item.url, :body => item.content } } }
      new.save!
    rescue Exception => e
      puts e.message
    end
  end
end