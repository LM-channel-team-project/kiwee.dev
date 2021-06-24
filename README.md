# [kiwee.dev](https://kiwee.dev/)

<img width="250" alt="logo" src="https://user-images.githubusercontent.com/36879690/123251187-de004d00-d525-11eb-8f7a-03f6bfdd46a2.png">

#### 여러 IT기술 블로그의 최신 게시물을 모아볼 수 있는 웹앱입니다.
배포: https://kiwee.dev/

<br>

## 🌟 주요 기능 및 페이지

### 로그인

<img width="400" alt="스크린샷 2021-06-24 20 19 43" src="https://user-images.githubusercontent.com/36879690/123254399-94196600-d529-11eb-8fb6-b6879ef2fec0.png">

- Google, GitHub 계정으로 OAuth인증을 통해 로그인이 가능합니다.
- [NextAuth](https://next-auth.js.org/)를 이용해 OAuth 인증을 하고 JWT을 발급 받아 서버와 통신합니다.

### 읽은 글, 좋아요, 북마크

![Jun-24-2021 20-58-24](https://user-images.githubusercontent.com/36879690/123259001-f9238a80-d52e-11eb-86e7-889086cfae26.gif)

- 게시물 클릭 시 읽은 글로 등록 됩니다.
- 읽은 게시물은 프로필 페이지의 읽은 글 항목에서 확인할 수 있습니다.
- 좋아요 및 북마크를 할 수 있습니다.
- 좋아요 게시물은 프로필 페이지, 북마크 게시물은 북마크 페이지에서 확인할 수 있습니다.

### 테마(다크모드)

<img width="600" alt="theme mode" src="https://user-images.githubusercontent.com/36879690/123260351-6daaf900-d530-11eb-933b-e5c2df56c222.gif">

- 설정탭에서 다크모드를 설정할 수 있습니다.

### 새로운 탭 열기

<img width="600" alt="new tab" src="https://user-images.githubusercontent.com/36879690/123260259-523fee00-d530-11eb-90fd-963ec89a7cae.gif">

- 설정탭에서 새로운 탭 열기를 설정할 수 있습니다.
- 새로운 탭 열기 설정 시 게시물이 새로운 탭으로 열립니다.

### 메인 페이지

<img width="800" alt="main page" src="https://user-images.githubusercontent.com/36879690/123256875-697cdc80-d52c-11eb-849d-8c5170f87160.png">

- 현재 구독 중인 IT기술 블로그의 최신 게시물을 보여줍니다.
- 무한 스크롤을 사용해 페이징 처리를 했습니다.

### 프로필 페이지

<img width="800" alt="profile page" src="https://user-images.githubusercontent.com/36879690/123257469-2a9b5680-d52d-11eb-85d9-1dba966e8079.png">

- 방문한 게시물 목록과 좋아요한 게시물을 보여줍니다.
- 메인 페이지와 같이 무한 스크롤이 구현되어 있습니다.

### 북마크 페이지

<img width="800" alt="bookmark page" src="https://user-images.githubusercontent.com/36879690/123257682-73eba600-d52d-11eb-97bb-d73e2e3f7de0.png">

- 북마크한 게시물을 보여줍니다.
- 메인 페이지와 같이 무한 스크롤이 구현되어 있습니다.

### blogs 페이지

<img width="800" alt="blog page" src="https://user-images.githubusercontent.com/36879690/123258391-46532c80-d52e-11eb-902d-efeb58da0a46.png">

- 현재 kiwee.dev가 구독 중인 IT기술 블로그의 목록을 보여줍니다.
- 블로그 클릭 시 해당 블로그로 이동합니다.

<br>

## 📑 협업

|Meeting|Pull Requests|
|:------:|:----:|
|<img height="250" alt="meet list" src="https://user-images.githubusercontent.com/36879690/123249372-d8a20300-d523-11eb-8446-757855ad0b43.png">|<img width="300" alt="screenshot" src="https://user-images.githubusercontent.com/36879690/123250688-51558f00-d525-11eb-8f57-a6584ff36a45.png">|
|매주 1~2회 화상회의 통해 비대면 프로젝트 진행|PR 템플릿과 2명 이상의<br/>approve가 있어야 merge 가능|

<br>

## 🛠 아키텍처
![architecture](https://user-images.githubusercontent.com/36879690/123248167-93310600-d522-11eb-802d-214564929fa8.png)

<br>

## 🛠 기술 스택
![tech_stack](https://user-images.githubusercontent.com/36879690/123248259-b0fe6b00-d522-11eb-9c55-93533a86e2fc.png)

- Common: [Typescript](https://www.typescriptlang.org/)
- Client:  [React.js](https://ko.reactjs.org/), [Next.js](https://nextjs.org/), [Redux](https://redux.js.org/), [Styled-components](https://styled-components.com/), [SWR](https://swr.vercel.app/)
- Server: [Node.js](https://nodejs.org/ko/), [Express](https://expressjs.com/ko/), [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Deployment: [Google Cloud](https://cloud.google.com/)

<br>

## 💻 팀원

- 👨‍💻[김은택](https://github.com/euntaek)
- 👨‍💻[천정호](https://github.com/Jungho-Cheon)
- 👨‍💻[백상흔](https://github.com/97baek)
- 👨‍💻[이장민](https://github.com/Leo-Xee)

<br>

## ⚙️ Dependencies

### Client

```json

"dependencies": {
  "axios": "^0.21.1",
  "dayjs": "^1.10.4",
  "next": "^10.2.2",
  "next-auth": "^3.21.1",
  "react": "^17.0.2",
  "react-content-loader": "^6.0.3",
  "react-dom": "^17.0.2",
  "styled-components": "^5.2.3",
  "styled-reset": "^4.3.4",
  "swr": "^0.5.5"
},
"devDependencies": {
  "@babel/core": "^7.13.16",
  "@types/next-auth": "^3.15.0",
  "@types/node": "^14.14.41",
  "@types/react": "^17.0.3",
  "@types/styled-components": "^5.1.9",
  "@typescript-eslint/eslint-plugin": "^4.22.0",
  "@typescript-eslint/parser": "^4.22.0",
  "babel-loader": "^8.2.2",
  "babel-plugin-inline-react-svg": "^2.0.1",
  "babel-plugin-styled-components": "^1.12.0",
  "eslint": "^7.24.0",
  "eslint-config-prettier": "^8.2.0",
  "eslint-plugin-react": "^7.23.2",
  "mongodb": "^3.6.6",
  "ts-loader": "^9.1.1",
  "ts-node": "^9.1.1",
  "typescript": "^4.2.4"
}

```

### Server

```json
"dependencies": {
  "@types/cors": "^2.8.10",
  "axios": "^0.21.1",
  "cors": "^2.8.5",
  "dotenv": "^8.2.0",
  "express": "^4.17.1",
  "mongoose": "^5.12.5",
  "mongoose-paginate-v2": "^1.3.17",
  "swagger-jsdoc": "6.0.0",
  "swagger-ui-express": "^4.1.6",
  "uuid": "^8.3.2"
}
"devDependencies": {
  "@types/express": "^4.17.11",
  "@types/mongoose": "^5.10.5",
  "@types/mongoose-paginate-v2": "^1.3.9",
  "@types/node": "^14.14.41",
  "@types/swagger-jsdoc": "^6.0.0",
  "@types/swagger-ui-express": "^4.1.2",
  "@types/uuid": "^8.3.0",
  "nodemon": "^2.0.7",
  "ts-node": "^9.1.1",
  "typescript": "^4.2.4"
}
