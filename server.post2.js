import http, { createServer, METHODS } from 'http';
import qs from 'qs'; // ? post 데이터를 parsing하기 위해 qs 모듈 사용



let form = `
<form method="POST" action="/data" accept-charset="utf-8">
  <input type="text" name="id">
  <input type="submit">
</form>
`
// ! POST 방식으로 통신하기 위해, form 태그의 method 값을 'POST'로 변경해줌

let greetingMessage = "성함을 적어주세요."

let greeting = `<h1>${greetingMessage}</h1>`

let mainPage = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
</head>
<body>
  ${greeting}
  ${form}
</body>
</html>
`
// ? 자바스크립트로 '문자열'을 넣기 위해 form 태그와 html 기본 양식을 지역변수에 담아줌.

function resultPage (text) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  </head>
  <body>
    <h1>환영합니다, ${text}님.
  </body>
  </html>
  `
}

// ! form에 값을 넣고 제출하면 나타날 페이지 양식을 작성. 이걸 안 할 수 있는 방법이 있을까?

const server = http.createServer(function(request, response){
  response.writeHead(200, {'Content-Type' : 'text/html'}); // 네트워크 header 값 설정
  response.write(mainPage); // 미리 선언해준 '문자열' 입력.
  if (request.method === 'POST') { // ! 요청 방식이 'POST'일 경우인 조건문 작성.
    let textData = '';
    request.on('data', function(data){ // request.on 메서드의 'data'가 실행될 때, 콜백함수 실행.
      textData = textData + data; // textData에 'data' 값을 담아줌.
    });
    request.on('end', function(){
      let parsedData = qs.parse(textData); // ! qs 모듈을 이용하여 값을 parsing함.
      console.log(parsedData.id); // ? 값이 잘 들어왔는지 확인.
      response.end(resultPage(parsedData.id)); // ! 값이 확인됐다면, 페이지에 출력.
    })
  }
});


server.listen(2080, function(){
  console.log('server is running'); // 정상적으로 작동 중인지 확인.
});