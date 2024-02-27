---
runme:
  id: 01HQN802AKN1HR27DQZMPVMH18
  version: v3
---

# Running Server
`npm start`

# Replicating issue
1. Start Server using `npm start`
2. Make following curl request
```
curl --request POST -i --location --header 'Content-Type: multipart/form-data' --header 'Cookies: ' --header 'X-Escape-Request-ID: abb75fdd19af42e09047f57663eb6f87' --data '{"query": "mutation graphql { __typename }"}' http://localhost:4000/graphql
```
## Result
You should see an error like this
```
Server is running on http://localhost:4000/graphql
ERR Error: Multipart: Boundary not found
    at new Multipart (/Users/vk/repo/yoga-issue/node_modules/busboy/lib/types/multipart.js:233:13)
    at getInstance (/Users/vk/repo/yoga-issue/node_modules/busboy/lib/index.js:33:12)
    at module.exports (/Users/vk/repo/yoga-issue/node_modules/busboy/lib/index.js:56:10)
    at /Users/vk/repo/yoga-issue/node_modules/@whatwg-node/node-fetch/cjs/Body.js:121:45
    at new Promise (<anonymous>)
    at Request.formData (/Users/vk/repo/yoga-issue/node_modules/@whatwg-node/node-fetch/cjs/Body.js:120:16)
    at parsePOSTMultipartRequest (file:///Users/vk/repo/yoga-issue/node_modules/graphql-yoga/esm/plugins/request-parser/post-multipart.js:10:37)
    at handle (file:///Users/vk/repo/yoga-issue/node_modules/graphql-yoga/esm/server.js:311:41)
ERR Error: Multipart: Boundary not found
    at new Multipart (/Users/vk/repo/yoga-issue/node_modules/busboy/lib/types/multipart.js:233:13)
    at getInstance (/Users/vk/repo/yoga-issue/node_modules/busboy/lib/index.js:33:12)
    at module.exports (/Users/vk/repo/yoga-issue/node_modules/busboy/lib/index.js:56:10)
    at /Users/vk/repo/yoga-issue/node_modules/@whatwg-node/node-fetch/cjs/Body.js:121:45
    at new Promise (<anonymous>)
    at Request.formData (/Users/vk/repo/yoga-issue/node_modules/@whatwg-node/node-fetch/cjs/Body.js:120:16)
    at parsePOSTMultipartRequest (file:///Users/vk/repo/yoga-issue/node_modules/graphql-yoga/esm/plugins/request-parser/post-multipart.js:10:37)
    at handle (file:///Users/vk/repo/yoga-issue/node_modules/graphql-yoga/esm/server.js:311:41)
```

# Expected Result
Yoga to validate multipart request and if it's malformed return 200 with an error. 

# Note
It looks like when calling multer it throws an error. Could the error be caught and GQL error returned at this point rather than letting the error bubble up all the way?