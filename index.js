var http = require('http'),
    fileSystem = require('fs'),
    path = require('path');

http.createServer(function(request, response) {
    if(request.url == '/data'){
        var json = fileSystem.readFileSync('coords.json')
        response.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        console.log(json)
        response.end(json)
    } else {
        console.log('url', request.url)
        if(request.url != '/'){
            var filePath = path.join(__dirname, request.url);
            try{
                var stat = fileSystem.statSync(filePath);
                var name = request.url.split('.')[0]
                response.writeHead(200, {
                   'Content-Type': 'image/jpeg',
                   'Content-Length': stat.size
                })
                var readStream = fileSystem.createReadStream(filePath)
                readStream.pipe(response)
            }catch(e){
                response.writeHead(200)
                response.end()
            }
        } else {
            response.writeHead(200)
            response.end()
        }
    }
})
.listen(2000);
