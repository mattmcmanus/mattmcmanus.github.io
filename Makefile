deploy: compress-css commit deploy-production

compress-images:
	imagemin ...

compress-js:
	uglify ...

compress-css:
	compass compile -c config.rb --force
	autoprefixer style.css
	cleancss --s1 -o style.min.css style.css
	uncss style.min.css

commit:
	git add *
	git commit -m'Production asset optimization'

deploy-production:
	git push origin

.PHONY: deploy deploy-production compress-css compress-js compress-images commit-css
