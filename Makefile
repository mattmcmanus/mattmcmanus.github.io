deploy: compress-css commit deploy-production

compress-images:
	imagemin ...

compress-js:
	uglify ...

compress-css:
	compass compile -c config.rb --force
	autoprefixer stylesheets/app.css
	cleancss --s1 -o stylesheets/app.min.css stylesheets/app.css
	mv stylesheets/app.min.css stylesheets/app.css

commit:
	git add *
	git commit -m'Production asset optimization'

deploy-production:
	git push origin

.PHONY: deploy deploy-production compress-css compress-js compress-images commit-css
