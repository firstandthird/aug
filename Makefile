boosh:
	smoosh make ./build.json
test:
	./node_modules/.bin/nodeunit test/node.js

.PHONY: test
