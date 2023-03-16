# SLOTH 프로젝트 TODO 리스트

[GitHub repository URL](https://github.com/kcdevdes/Sloth-server)

날짜 | 변경점 | 해야할 내용 | Git commit message 
---|:---:|:---:|---
230130 | 기본 구조 변경 및 확립 | auth 로그인 구현 (JWT) | `feature: add basic structure files`
230131 | /auth - sign in, authenticate, authenticate access token 구현 및 성공, refresh 실패 | ~~refresh token 구현 및 로그인 프로세스 재확립 필요~~, user 객체 생성을 위한 DB 설계, ~~auth.service.js 미들웨어 함수객체 모두 middlewares로 이전, Readme 작성~~ | None
230209 | /auth - login, logout, signup 구현| User profile 관련 라우터 작업, Photo 업로드 방안 찾기 | `feature: add AuthRouter with a session login`
230210 | /user - get profile, update profile, update password 완료 | Photo, Article 라우터 작업하기, README.md 업데이트 하기, Branch 분기하기 | `feature: add UserRouter`
230313 | /article - get a specific article, upload a new article, and update any specific article 완료 | Likes Router 작업하기 | `feature: add article endpoints/ searching for article, uploading...`
230316 | /feed, /like, /follow 작업완료, 베타버전 배포 시작 | 