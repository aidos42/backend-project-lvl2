install:
	npm ci
lint:
	npx eslint .
test:
	node --experimental-vm-modules node_modules/jest/bin/jest.js

.PHONY: test