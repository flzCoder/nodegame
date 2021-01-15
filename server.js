const fs = require('fs')
const path = require('path')
const resolve = file => path.resolve(__dirname, file)
var server = require('express')()
templatePath = resolve('./index.html')
let template = fs.readFileSync(templatePath, 'utf-8')

server.get('*', (req, res) => {
  res.end(template)
})

server.listen(8080)
