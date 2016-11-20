/**
 * Entry-point for the server
 */

import * as http from 'http'
import * as path from 'path'
import * as fs from 'fs'

const publicPath = [__dirname, '..', 'public']

http.createServer(function (request, response) {
    let filePath = '.' + request.url
    if (filePath === './') {
        filePath = './index.html'
    }
    filePath = path.resolve(...publicPath, filePath)

    let extname = path.extname(filePath)
    let contentType = 'text/html'
    switch (extname) {
        case '.js':
            contentType = 'text/javascript'
            break
        case '.css':
            contentType = 'text/css'
            break
        case '.json':
            contentType = 'application/json'
            break
        case '.png':
            contentType = 'image/png'
            break
        case '.jpg':
            contentType = 'image/jpg'
            break
        case '.wav':
            contentType = 'audio/wav'
            break
    }

    fs.readFile(filePath, function (error, content) {
        if (error) {
            if (error.code === 'ENOENT') {
              const path404 = path.resolve(...publicPath, './404.html')
              fs.readFile(path404, function (err, content) {
                  if (err) {
                    response.writeHead(500, { 'Content-Type': 'text/plain' })
                    response.end(`ERROR: ${err.stack}`, 'utf-8')
                    return
                  }

                  response.writeHead(200, { 'Content-Type': contentType })
                  response.end(content, 'utf-8')
              })
            } else {
              response.writeHead(500)
              response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n')
              response.end()
            }
        } else {
          response.writeHead(200, { 'Content-Type': contentType })
          response.end(content, 'utf-8')
        }
    })
}).listen(3000)

console.log('Server running at http://127.0.0.1:3000/')
