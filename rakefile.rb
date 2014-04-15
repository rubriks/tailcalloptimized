require 'mustache'
require 'date'

namespace :posts do
    desc "site specific tasks"
    task :new do
        post_name = ENV["POST_NAME"]
        if post_name == nil
            raise "please specify POST_NAME env variable like this: rake posts:new POST_NAME=\"My first blog post\""
        end

        # replace all spaces with dash
        post_id = post_name.gsub(/[^\w\d:]/, "-")

        # make all characters in string lower case
        post_id = post_id.downcase

        # add date stamp to id
        post_id = Date.today.strftime("%Y-%m-%d-") + post_id

        # create and switch to new branch
        puts "Create new git branch: #{post_id}"
        unless system "git checkout -b #{post_id}"
            puts "Failed to create new branch #{post_id}"
            exit
        end

        # create directory for assets
        assets_dir = "assets/posts/#{post_id}"
        puts "Create assets directory: #{assets_dir}"
        Dir.mkdir(assets_dir)

        # make sure the directory get committed
        system "touch #{assets_dir}/.gitignore"
        system "git add #{assets_dir}/.gitignore"

        # date of a new post
        post_date = DateTime.now.strftime("%Y-%m-%d %H:%M:%S")

        # create new post
        post_file = "_posts/#{post_id}.html"
        puts "Create new post: #{post_file}"
        post_template = File.read("_posts/post.mustache");
        post_data = { :post_id => post_id, :post_name => post_name, :post_date => post_date, :assets_dir => assets_dir }
        post_content = Mustache.render(post_template, post_data) 
        File.open(post_file, "w") { |file| file.write(post_content) }

        # add new post to git index
        system "git add #{post_file}"

        # make first commit of post
        puts "Initial commit to branch: #{post_id}"
        system "git commit -m \"Initial commit to post #{post_name}\""

        puts "Done."
    end
end

