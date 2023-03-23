import http from 'http';
import { parse, resolve } from 'path';
import qs from 'qs';
import { PassThrough } from 'stream';
// ! 쿼리스트링을 다루기 위해 npm에서 qs 받아옴. (반드시 확인하자!)

const form = `
<form method="POST" action="/login" accept-charset="utf-8">
  <input type="text" name="id">
  <input type="submit">
</form>
`
// ! POST 방식으로 통신하기 위해 form 태그 method를 'POST'로 변경

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
// ? 선언한 form을 page 변수 안에 담아냄.


function secondPage(text) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  </head>
  <body>
  <h1>환영합니다, ${text}님.</h1>
  </body>
  </html>
  `
}

// ! POST 방식으로 두번째 페이지를 불러왔을 때 실행할 함수를 선언해줌.


const server = http.createServer(function(request, response) {
 // ! 서버 객체 생성
    

  if (request.method === 'GET' && request.url === '/') {
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write(page);
    response.end();
  }
  // ? 첫번째 페이지는 'GET' 방식으로 지정해줌. 여기까지는 이전에 썼던 GET 방식과 비슷하다.

  if (request.method === 'POST') {
    let textdata = '';
    // ! 요청 변수와 값을 담을 지역변수 선언
    request.on('data', function(data) { // ? request.on <- 이것이 정확히 어떤 것인지는 아직 모른다. 일단, addEventListner와 비슷한 성질이라고 생각해두자.
      textdata = textdata + data;
      // ? 'data' 가 발생할 경우 콜백함수 실행.
      // ? 지역변수 안에 'data'를 담아줌.
    });
    // ! GET 방식은 주소의 끝에 ?를 붙이고 변수명=값 형태로 요청하지만
    // ! POST는 '주소만 요청'하고 변수와 값을 주소로 아닌 요청 'BODY'에 담아서 서버 측에 요청함.
    request.on('end', function() { // ? 마찬가지로 어떤 기능인진 모르지만, 'end'와 연관된 이벤트가 발생할 경우 함수 실행.
      response.writeHead(200, {'Content-Type' : 'text/html'});
      let parsedText = qs.parse(textdata);
      // ! 맨 위에서 불러온 qs 모듈을 이용하여 querystring을 parsing함.
      console.log(parsedText.id);
      // ! form에 입력한 값이 정상적으로 parsing 됐는지 콘솔로 확인
      response.end(secondPage(parsedText.id));
      // ! 응답이 '끝날 경우' secondPage 함수를 실행해준다. 함수 안의 값은 parsing이 완료된 객체의 id값을 넣어준다.
    })

  }
})



server.listen(2080, function() {
  console.log('server is runnig')
});

// 서버 객체 생성