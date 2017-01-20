deploy: compress-css commit deploy-production

run:
	bundle exec jekyll serve --watch --drafts --trace

install:
	bundle install

update:
	bundle update

compress-images:
	imagemin ...

compress-js:
	uglify ...

compress-css:
	compass compile -c config.rb --force
	postcss --use autoprefixer stylesheets/app.css
	cleancss --s1 -o stylesheets/app.min.css stylesheets/app.css
	mv stylesheets/app.min.css stylesheets/app.css

commit:
	git add *
	git commit -m 'Production asset optimization'

deploy-production:
	git push origin

.PHONY: run install update deploy deploy-production compress-css compress-js compress-images commit-css
