# React-firebase 프로젝트 설정

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 1. node.js 설치
 - https://nodejs.org 사이트에 접속한다.
 - LTS 버전을 설치한다.

## 2. Command 창을 열고, 아래 명령어를 실행한다.
 - node -v or node --version 입력하여 현재 노드 버전을 확인한다.
 - npm install -g yarn 을 입력하여 yarn 을 설치한다.
 - yarn -v 를 입력하여 버전을 확인한다.

## 3. React 프로젝트 설치
 - 프로젝트를 설치할 폴더로 이동하여 Command 창을 연다.
 - yarn create react-app react-firebase --template typescript 를 실행하면, 타입스크립트를 자동 설치 해준다. (프로젝트명은 react-firebase 입니다.)
 - cd react-firebase 입력 -> code . 입력하면 프로젝트가 visual studio code 가 열린다.

## 4. 파이어베이스 설치
 - VSC(Visual studio code)에서 터미널을 열고, yarn add firebase 명령어를 실행 한다.
 - firebase 상용버전(v9.22.2)이 설치 된 것을 package.json 파일을 열어 확인 해본다.

## 5. 파이어베이스 프로젝트 생성
 - https://console.firebase.google.com/u/0/ 사이트로 이동한다.
 - 프로젝트 추가 -> 프로젝트 이름 입력 -> 모든 설정을 default 설정
 - 프로젝트 메인 -> 프로젝트 개요 -> 프로젝트 설정 -> 내 앱에서 web 선택 -> 모든 설정을 default 설정 (설정 진행 중 초기화 방법이 나오는데, 프로젝트 설정에서 재확인 가능합니다.)
 - VSC로 돌아오고, 최상위 디렉토리에서 firebase-config.js 파일을 생성한 후에, 초기화 방법에 나왔던 코드를 복사하여 붙여 넣는다.

## 6. VSC에서 파이어베이스 초기화
 - VSC를 열고, 프로젝트의 최상위 디렉토리에서 firebase-config.js 파일을 생성한다.
 - 파이어베이스 프로젝트 생성 시 초기화 코드를 복사하여 firebase-config.js 에 붙여넣어 준다.

## 7. 데이터베이스 만들기
 - 파이어베이스 프로젝트 메인으로 다시 돌아온다.
 - 빌드 -> Firebase Database 메뉴 선택 -> 데이터베이스 만들기 선택 -> 규칙 탭 선택 -> read write 기능이 초기에는 false 인데, true로 수정하고 게시를 선택 한다.
 - 데이터 탭 선택 -> 컬렉션 시작 선택 -> 컬렉션 ID 입력 -> 필드/유형/값 을 각각 입력 -> 자동 ID 선택 -> 저장 선택

## 8. VSC에서 파이어베이스 초기화
 - VSC를 열고, 프로젝트의 src 폴더 안에 config 폴더를 생성한다. 그리고 firebase-config.js 파일을 생성한다.
 - 파이어베이스 프로젝트 생성 시 초기화 코드를 복사하여 firebase-config.js 에 붙여넣어 준다.

