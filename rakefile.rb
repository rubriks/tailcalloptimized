namespace :posts do
    desc "site specific tasks"
    task :new do
        post_name = ENV["POST_NAME"]
        if post_name == nil
            raise "please specify POST_NAME env variable like this: rake posts:new POST_NAME=\"My first blog post\""
        end



        puts "Creating new post: #{post_name}"
    end
end

