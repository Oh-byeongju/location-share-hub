<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<link>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>위치정보 공유 플랫폼</title>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <link type="text/css" rel="stylesheet" href="css/project/main/login.css">
    <script src="js/project/main/login.js"></script>
</head>
<body>
    <div class="topLine">
        <a href="/login">
            <img src="/img/map_icon.png" class="topTitleIcon">
        </a>
        <h1 class="topTitle">
            위치정보 공유 플랫폼
        </h1>
    </div>
    <div class="loginLayout">
        <div class="loginTitle">
            회원 로그인
        </div>
        <form class="loginForm">
            <div class="inputArea">
                <div class="inputLayout">
                    <div class="inputCenter">
                        <input class="inputText" placeholder="아이디를 입력해주세요." maxlength="15" id="id_text" type="text">
                    </div>
                </div>
            </div>
            <div class="inputArea">
                <div class="inputLayout">
                    <div class="inputCenter">
                        <input class="inputText" placeholder="비밀번호를 입력해주세요." maxlength="20" id="pw_text" type="password">
                    </div>
                </div>
            </div>
            <div class="loginButtonArea">
                <button id="loginButton" type="button">
                    로그인
                </button>
            </div>
            <div class="joinButtonArea">
                <button id="joinButton" type="button">
                    회원가입하기
                </button>
            </div>
        </form>
    </div>
</body>
</html>