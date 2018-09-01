# Rakefile

require 'jekyll'

task default: %w[build]

desc "Build the site"
task :build do
  config = Jekyll.configuration({
    url: url,
  })

  site = Jekyll::Site.new(config)
  Jekyll::Commands::Build.build(site, config)
end

def url
  ENV["JEKYLL_ENV"] == 'production' ? ENV["URL"] : ENV["DEPLOY_PRIME_URL"]
end
