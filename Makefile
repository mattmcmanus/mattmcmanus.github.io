deploy: compress-css commit-css deploy-production

compress-css:
	compass compile -c config.rb --force
	autoprefixer style.css
	cleancss --s1 -o style.min.css style.css
	mv style.min.css style.css

commit-css:
	git add style.css
	git commit -m'CSS prod prep'

deploy-production:
	git push origin

.PHONY: deploy deploy-production compress-css commit-css

