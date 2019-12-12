## 이유
클라이언트에서 서버에서 아직 구현되지 않은 api 를 사용해야 할 수 있다.
이 경우에 간단하게 구현할 수 있도록 한다. (엇... 서버의 url 을 한 곳에서 관리할 수 있도록 해야겠다.)

## 사용할 목 서버
- https://github.com/typicode/json-server#add-custom-routes

## 문서
- https://github.com/typicode/json-server#module

## 환경 구성하기
$ npm install -g json-server

## 실행하기
$ json-server --watch db.json --routes routes.json --middlewares singular.js --port 33333