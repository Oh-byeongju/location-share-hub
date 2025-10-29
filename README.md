## **1. 프로젝트 개요**

### 1. **프로젝트 소개**
- Spring Boot와 JSP를 이용하여 개발한 위치정보 공유 플랫폼 프로젝트입니다.
- 그룹별로 자신만의 맛집이나 관심 장소를 지도 위에 공유해보자는 아이디어로 제작했습니다.
- GIS 기반 프로젝트를 진행하며 지도 API의 구조와 활용 방식을 직접 이해해보기 위해 개발을 진행했습니다.
### 2. **개발 기간**
- 핵심 기능: 2023.09.04 ~ 2023.10.27
- 기능 보완: 2025.10.10 ~ 2025.10.17

## **2. 기술 및 도구**

### `Environment`
- Java 11
- Spring Boot 2.7.3
- JSP Template
- Mybatis
- PostgreSQL
- Session-based Authentication
### `Library / API`
- CKEditor
- Kakao Maps API
### `Design Tools`
- Figma
- ERDCloud

## **3. ERD 설계**

<img width="100%" alt="ERD" src="https://github.com/user-attachments/assets/ec5aa1af-03b3-4aec-867e-6a375f726afc"/>

## **4. 시스템 아키텍처**
<div align="center">
    <img width="95%" alt="System" src="https://github.com/user-attachments/assets/e9fe3b75-5c45-4ff0-8679-1dd67c5b4f52"/>
</div>

<br>

1. 사용자가 Web 환경(`Chrome`, `Edge` 등)에서 URL에 접속하면, 브라우저는 `Tomcat` 서버로 요청을 보냅니다.
2. 서버는 `Spring Boot` 기반으로 동작하며, JSP 화면을 렌더링하거나 `MyBatis`를 통해 `PostgreSQL` 데이터베이스와 연동하여 필요한 데이터를 조회합니다.
3. 렌더링된 화면에서는 `KaKao Map API`를 통해 지도와 좌표 기반 UI를 실시간으로 표시하고, 그룹 정보 및 마커 정보를 조회할 수 있습니다.
4. 사용자는 `CKEditor 5`를 활용하여 마커에 대한 설명을 조회하거나 작성할 수 있으며, 입력된 데이터는 다시 `Tomcat` 서버로 전송되어 DB에 반영됩니다.
5. 이렇게, 서버와 클라이언트는 라이브러리를 활용해 지도, 데이터, 텍스트가 자연스럽게 연결되는 Web 환경에서 시스템이 동작합니다.

## **5. 사용자 요청 흐름**

<div align="center">
  <img width="90%" alt="Flow" src="https://github.com/user-attachments/assets/982e9546-ac5e-4941-a063-b8a3d1d94547" />
</div>

1. 사용자의 모든 요청은 `DispatcherServlet`을 거쳐 `Interceptor`를 통과한 뒤 `Controller`로 전달됩니다.
2. 로그인한 사용자만 접근할 수 있는 영역을 명확히 구분하였으며, 접근 허용 URL은 `properties`설정값을 통해 유지보수성과 확장성을 높였습니다.
3. `JSP Template`기반 구조이므로, 정적 화면이든 동적 데이터 요청이든 반드시 WAS를 경유합니다. 이로 인해 매 요청마다 세션 상태를 확인할 수 있어, `Interceptor`기반의 인증 구조를 적용하기에 적합하였습니다.
4. `Spring Security`를 사용해도 동일한 기능을 구현할 수 있으나, 프로젝트 규모가 크지 않고 인증 로직이 단순하여 `Spring Interceptor`필터 기반으로 구현하는 방식을 선택했습니다.

```java
package com.lsh.framework;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Spring MVC Interceptor
 */
@Slf4j
public class FrameHandlerInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        HttpSession session = request.getSession();

        // 로그인 정보 있으면 /main, 로그인 정보 없으면 /login
        if (request.getRequestURI().equals("/")) {
            if (session != null) {
                Object obj = session.getAttribute(FrameConstants.LOGIN_USER_ATTR);
                if (obj != null) {
                    response.sendRedirect(request.getContextPath() + "/main");
                }
                else {
                    response.sendRedirect(request.getContextPath() + "/login");
                }
            }
            else {
                response.sendRedirect(request.getContextPath() + "/login");
            }
            return true;
        }

        // 로그인 정보를 확인하고 존재하면 Controller로 전달
        if (session != null) {
            Object obj = session.getAttribute(FrameConstants.LOGIN_USER_ATTR);
            if (obj != null) {
                return true;
            }
        }

        // 로그인 정보가 없으면 리다이렉션
        response.sendRedirect(request.getContextPath() + "/login");
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }
}
```

## **6. 기능 소개 Wiki**

**1️⃣ 메인화면 - [상세보기](https://github.com/Oh-byeongju/TechBlog_Internal/wiki/1.-%EB%A9%94%EC%9D%B8%ED%99%94%EB%A9%B4)**

```
- 인기 게시물 조회
- 전체 게시물 조회
- 다크모드 지원
- 반응형 웹 지원
- 게시물 검색
```

**2️⃣ 회원 - [상세보기](https://github.com/Oh-byeongju/TechBlog_Internal/wiki/2.-%ED%9A%8C%EC%9B%90)**

```
- 회원가입
- 로그인 (JWT 기반)
- 회원정보 수정
- 내가 쓴 게시물 조회
```

**3️⃣ 게시물 - [상세보기](https://github.com/Oh-byeongju/TechBlog_Internal/wiki/3.-%EA%B2%8C%EC%8B%9C%EB%AC%BC)**

```
- 게시물 상세조회
- 개시물 공감
- 게시물 작성, 수정, 삭제
- 댓글 작성, 삭제
```

**4️⃣ AI - [상세보기](https://github.com/Oh-byeongju/TechBlog_Internal/wiki/4.-AI)**

```
- 사용자가 작성한 게시물 요약
- 게시물 내용을 기반으로 한 해시태그 추출
```

## **8. 개선사항 및 향후 개발 계획**

### 1. 에디터 기능 강화
- 이미지 첨부 시 드래그 앤 드롭 및 복사-붙여넣기 지원
- 게시물 작성 및 수정 중 임시 저장 기능 제공, 페이지 이탈 시 경고 메시지 출력
- 이미지 업로드 시 `temp` 디렉토리를 활용하여 불필요한 이미지 저장 방지
- 일정 주기로 자동 저장되는 기능 구현

### 2. Markdown 파일 서버 연동 및 이력 관리
- 현재 프론트엔드에서만 사용하는 `md` 파일을 백엔드 서버와 연동하여 관리
- `boad_cont_info` 테이블에 게시물 메타 정보(분류, 공개 여부 등) 저장
- `sy_file_md_info` 테이블을 활용해 버전별 `md` 파일을 관리하고, GitHub처럼 히스토리 관리 기능 제공

### 3. 관리자 페이지 구축
- 공통 코드, 사용자, 게시물 등을 효율적으로 관리할 수 있는 관리자 페이지 개발
- 외부에 공개되는 프로젝트와 연동될 수 있도록 기능 확장 및 API 설계

### 4. AI 기능 비동기화
- 게시물 작성 시 ChatGPT 요약 및 태그 생성을 비동기 처리로 전환하여 사용자 경험 개선

## **9. 개발 후기**

**✏️ 프로젝트에 대한 후기 및 느낀점입니다.**

> 이번 프로젝트를 통해 **Next.js의 각종 렌더링 방식**부터, **파일 저장 구조와 경로 관리**, **암호화 처리**, **OpenAI API 연동**, 그리고 Spring Boot 환경에서의 **전역 설정 및 상수 관리**, **로그·이력 관리 방식**까지 폭넓게 다뤄볼 수 있었습니다. 특히 백엔드에서는 파일 업로드/저장 시 디렉토리 구조를 어떻게 잡을지, 경로를 어떻게 안전하게 관리할지를 직접 설계해보며 실무적인 감각을 키울 수 있었습니다. 이번 경험을 바탕으로 다음에는 더 많은 사람들과 함께 협업하며, 완성도 높은 프로젝트를 만들어보고 싶다는 생각이 들었습니다.