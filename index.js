var http = require('http'),
    fileSystem = require('fs'),
    path = require('path');

http.createServer(function(request, response) {
    if(request.url == '/data'){
        var chests = fileSystem.readFileSync('data/chests.json')
        var roots = fileSystem.readFileSync('data/roots.json')
        var kingSorrels = fileSystem.readFileSync('data/ks.json')
        var goblins = fileSystem.readFileSync('data/goblins.json')
        response.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        var jsonResponse = {chests: JSON.parse(chests), roots: JSON.parse(roots), kingSorrels: JSON.parse(kingSorrels), goblins: JSON.parse(goblins)}
        response.end(Buffer.from(JSON.stringify(jsonResponse)))
    } else {
        if(request.url != '/' && request.url.match('/[0-9]/[0-9]?[0-9]_[0-9]?[0-9].jpg')){
            var filePath = path.join(__dirname, 'tiles/' + request.url);
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
            response.write('Doesnt match any!')
            response.end()
        }
    }
})
.listen(process.env.PORT || 2000);
