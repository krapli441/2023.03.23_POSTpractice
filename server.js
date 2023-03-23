// const http = require('http');
// 웹 서버를 만들기 위해 http 모듈 가져옴. (commonJS 방식으로)

import http from 'http';
// ? 웹 서버를 만들기 위해 esm 방식으로 모듈을 가져옴

const form = `
<form method="GET" action="/login" accept-charset="utf-8">
  <input type="text" name="id">
  <input type="submit">
</form>
`
// ? form 양식을 변수로 선언해줌.
// ! 양식 안에 넣어준 값은 /login 이라는 곳으로 일단 보냄 (/login이라는 주소가 있던 없던)

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
// ? html 양식을 변수에 담아줌.
// ? page 변수 안에 아까 선언해준 form 변수를 넣어줬다.


const server = http.createServer(function(request, response) {
  if (request.method === 'GET' && request.url === '/') {
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write(page);
    response.end();
  }
  // ? 요청 방식이 GET일 경우 혹은 요청 url에 '/'이 있을 경우 (브라우저에는 /가 생략되서 나온다)
  // ? header 값을 정해준다. Content-Type : text/html로. (문서 타입을 정해준다)
  // ? respose.write로 위에 선언해준 page를 가져옴. page 안에는 '문자열로 구성된' html 양식이 있음
  // ! 때문에 page 값을 write한다면 html 페이지 한 장이 만들어지게 된다.
  // ? 모든 작업이 끝났으면 response.end()로 응답 종료.
  
  if (request.method === 'GET' && request.url.startsWith('/login')) {
    // ? 양식에 값을 입력하고 제출했다면 /login 이라는 주소로 '일단' 보냈다.
    // ! 그런데, 위 조건문에는 '/login'이라는 주소가 있을 시 명령을 실행하도록 함.
    // ! 따라서 조건을 충족하므로 아래 내용을 실행함.
    response.writeHead(200, {'Content-Type' : 'text/html'});
    const name = request.url.split('=')[1];
    // ! '='를 기준점으로 잘라낸 뒤, 1번째 배열을 변수에 담아줬다.
    // ! [url,'입력한 값'] 2개의 배열이 만들어지고, 1번째 배열을 변수에 담아주게 된 것임.


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
    <h1>환영합니다, ${decodeURIComponent(name)}님.</h1>
    </body>
    </html>
    `
    // ? 두번째 페이지 변수에 담아줌.
    // ! 변수 안에 '입력한 값'을 넣어줬는데, 해석이 필요하기 때문에 decodeURIComponent로 해석해준다.
    response.write(secondPage);
    // ! 선언해둔 두번째 페이지 변수로 작성한다.
    response.end();
    // ! 응답 종료
  }
})

// '/login'으로 시작하는 주소가 있다면 조건문 실행
// ! const name = request.url.split('=')[1];
// ! 내용 안의 '='를 기준점으로 잘라내고, 잘라낸 배열의 1번째 배열을 불러옴 -> 즉 제출한 내용이 나오게 됨

server.listen(2080, function() {
  console.log('server is runnig')
});

// 서버 객체 생성