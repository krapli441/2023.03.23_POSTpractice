import http from 'http';
import { parse, resolve } from 'path';
import qs from 'qs';
import { PassThrough } from 'stream';
//

const form = `
<form method="POST" action="/login" accept-charset="utf-8">
  <input type="text" name="id">
  <input type="submit">
</form>
`
const page = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>서버생성</h1>
  ${form}
</body>
</html>
`




const server = http.createServer(function(request, response) {

    

  if (request.method === 'GET' && request.url === '/') {
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write(page);
    response.end();
  }

  if (request.method === 'POST') {
    let textdata = '';
    request.on('data', function(data) {
      textdata = textdata + data;
    });
    
    request.on('end', function() {
      response.writeHead(200, {'Content-Type' : 'text/html'});
      let parsedText = qs.parse(textdata);
      const secondPage = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      </head>
      <body>
      <h1>환영합니다, ${parsedText.id}님.</h1>
      </body>
      </html>
      `
      response.end(secondPage);
    })

  }
})

server.listen(2080, function() {
  console.log('server is runnig')
});

// 서버 객체 생성