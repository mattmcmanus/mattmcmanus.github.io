Jekyll::Hooks.register(:site, :post_write) do |_site|
  system("yarn run purge")
end
