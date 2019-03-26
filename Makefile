install: install-deps

run:
	npx babel-node 'src/bin/gendiff.js'

install-deps:
	npm install

build:
	rm -rf dist
	npm run build

test:
	npm test

lint:
	npm run eslint

publish:
	npm publish
