install:
	npm install
run:
	npx babel-node -- src/bin/gendiff.js
publish:
	npm publish
make lint:
	npm run eslint src/**
