Jekyll::Hooks.register(:site, :post_write) do |_site|
  if ENV['JEKYLL_ENV'] == 'production'
    system("yarn run purge")
  end
end
