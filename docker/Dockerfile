# Create a container for blog.mikaellundin.name
FROM ubuntu:14.04
MAINTAINER Mikael Lundin <hello@mikaellundin.name>

#Install prerequisites
RUN apt-get update && apt-get install -y git ruby ruby-dev gem nodejs npm

# Install jekyll and redcarpet
RUN gem install jekyll redcarpet --no-ri --nordoc

# Make sure that nodejs is found
RUN ln -s /usr/bin/nodejs /usr/bin/node

# Install bower and gulp globally
RUN npm install --global bower gulp

# Make a volume for the code
VOLUME /var/www

# Clone project into /var/www
RUN git clone https://github.com/miklund/tailcalloptimized.git /var/www

# Set current working directory
WORKDIR /var/www

# Download frontend dependencies
RUN bower install --config.interactive=false

# Download gulp dependencies
RUN npm install

# Build static assets, once
RUN gulp

# open port 4000 for http
EXPOSE 4000

# start jekyll and gulp, and watch for file changes
ENTRYPOINT ["server.sh"]


