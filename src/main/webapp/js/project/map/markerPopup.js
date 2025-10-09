var groupUserRankCd  = null;
var markerNo = null;

function initPage() {
}

function initFrame(param) {
    groupUserRankCd = param.groupUserRankCd;
    markerNo = param.markerNo;
}

$(document).ready(function() {
    // ul 요소를 선택
    const commentList = $(".commentData");

    // 리뷰의 삭제 버튼 이벤트
    $("body").on("click", "#delButton", function() {
        // 삭제 누른 오버레이의 마커 id
        var $this = $(this);
        var reviewNo = $this.data("review-no");

        popup.confirm.show("리뷰를 삭제하시겠습니까?", function(bool) {
            if (bool) {
                try {
                    var param = {"reviewNo": reviewNo};
                    var callback = new Callback(function(result) {
                        if (result === '성공') {
                            popup.alert.show('리뷰 삭제에 성공하였습니다.', function () {
                                // 최신순 버튼 클릭 상태
                                if ($("#newSort").css("color") === 'rgb(22, 174, 129)') {
                                    var callback = new Callback(function(result) {
                                        // 정렬값 갱신
                                        // ul태그 비우고 사용
                                        commentList.empty();
                                        if (result.length === 0) {
                                            // 배열이 비어있을 경우 '콘텐츠가 없습니다' 출력
                                            commentList.append("<li style='text-align: center; padding-top: 40px'>작성된 리뷰가 없습니다.</li>");
                                        } else {
                                            // 배열이 비어있지 않을 경우 각 요소에 대해 li 태그 동적으로 생성
                                            result.forEach(function(item) {
                                                commentList.append(`
                                            <li class="comment">
                                                <div class="writer_time">
                                                    <span class="commentWriter">
                                                        ${item.userNm}
                                                    </span>
                                                    <span class="commentTime" title=${item.markerReviewDts}>
                                                        ${detailDate(item.markerReviewDts)}
                                                    </span>
                                                    <span class="reviewLike">
                                                        <button class="reviewLikeButton" data-review-no="${item.markerReviewNo}">
                                                            ${item.reviewLike === 'y' ? `
                                                                <img src="/img/heart_fill.png" alt="Image Button">
                                                            ` : `
                                                                <img src="/img/heart_empty.png" alt="Image Button">
                                                            `}
                                                        </button>
                                                        <span class="likeNum" data-review-no="${item.markerReviewNo}">
                                                            ${item.likeCount}
                                                        </span>
                                                    </span>
                                                </div>
                                                <div class="commentContent">
                                                    ${item.markerReviewText}
                                                </div>
                                                <div class="commentButtons">
                                                  ${USER_INFO.USER_ID === item.userId || groupUserRankCd === 'leader' ? `
                                                    <button id="delButton" class="delButton" data-review-no="${item.markerReviewNo}">
                                                      삭제
                                                    </button>
                                                    <button id="modifyButton" class="modifyButton">
<!--                                                      수정-->
                                                    </button>` : ''}
                                                </div>
                                            </li>
                                            `);
                                            });
                                        }
                                    });
                                    platform.getService("/marker/markerList/" + markerNo + "?sort=new", callback, null);
                                } else {
                                    var callback = new Callback(function (result) {
                                        // 정렬값 갱신
                                        // ul태그 비우고 사용
                                        commentList.empty();
                                        if (result.length === 0) {
                                            // 배열이 비어있을 경우 '콘텐츠가 없습니다' 출력
                                            commentList.append("<li style='text-align: center; padding-top: 40px'>작성된 리뷰가 없습니다.</li>");
                                        } else {
                                            // 배열이 비어있지 않을 경우 각 요소에 대해 li 태그 동적으로 생성
                                            result.forEach(function (item) {
                                                commentList.append(`
                                            <li class="comment">
                                                <div class="writer_time">
                                                    <span class="commentWriter">
                                                        ${item.userNm}
                                                    </span>
                                                    <span class="commentTime" title=${item.markerReviewDts}>
                                                        ${detailDate(item.markerReviewDts)}
                                                    </span>
                                                    <span class="reviewLike">
                                                        <button class="reviewLikeButton" data-review-no="${item.markerReviewNo}">
                                                            ${item.reviewLike === 'y' ? `
                                                                <img src="/img/heart_fill.png" alt="Image Button">
                                                            ` : `
                                                                <img src="/img/heart_empty.png" alt="Image Button">
                                                            `}
                                                        </button>
                                                        <span class="likeNum" data-review-no="${item.markerReviewNo}">
                                                            ${item.likeCount}
                                                        </span>
                                                    </span>
                                                </div>
                                                <div class="commentContent">
                                                    ${item.markerReviewText}
                                                </div>
                                                <div class="commentButtons">
                                                  ${USER_INFO.USER_ID === item.userId || groupUserRankCd === 'leader' ? `
                                                    <button id="delButton" class="delButton" data-review-no="${item.markerReviewNo}">
                                                      삭제
                                                    </button>
                                                    <button id="modifyButton" class="modifyButton">
<!--                                                      수정-->
                                                    </button>` : ''}
                                                </div>
                                            </li>
                                            `);
                                            });
                                        }
                                    });
                                    platform.getService("/marker/markerList/" + markerNo + "?sort=like", callback, null);
                                }
                            })
                        } else {
                            popup.alert.show("존재하지 않는 리뷰입니다.", function () {
                                // main 페이지를 새로고침
                                parent.refreshParent();
                            });
                        }
                    });
                    platform.postService("/marker/reviewDelete", param, callback);
                }
                catch (e) {}
            }
        });
    });

    // 리뷰의 공감 버튼 이벤트
    $("body").on("click", ".reviewLikeButton", function() {
        // 공감 누른 리뷰 No
        var $this = $(this);
        var reviewNo = $this.data("review-no");

        // 즐겨찾기 요청
        $.ajax({
            type: "POST",
            async: true,
            url: "http://localhost:8080/marker/review/like",
            data: JSON.stringify({"reviewNo": reviewNo}),
            contentType: "application/json",
            withCredentials: true,          // 세션 쿠키 날리는 설정
            success: function (data) {
                // 존재하지 않는 마커 예외처리
                if (data === "error") {
                    popup.alert.show("존재하지 않는 리뷰입니다.", function () {
                        // main 페이지를 새로고침
                        parent.refreshParent();
                    });
                }

                // 버튼 이미지 변경
                var $button = $('.reviewLikeButton[data-review-no="' + reviewNo + '"]');
                if (data === 'y') {
                    $button.html('<img src="/img/heart_fill.png" alt="Image Button">');
                } else {
                    $button.html('<img src="/img/heart_empty.png" alt="Image Button">');
                }

                // 좋아요 수 변경
                var $span = $('.likeNum[data-review-no="' + reviewNo + '"]');
                if (data === 'y') {
                    $span.html(parseInt($span.text()) + 1);
                } else {
                    $span.html(parseInt($span.text()) - 1);
                }

            },
            error: function (data) {
                popup.alert.show("존재하지 않는 마커입니다.", function () {
                    // main 페이지를 새로고침
                    parent.refreshParent();
                });
            }
        });
    });

    // 리뷰 작성을 막는 코드
    if (groupUserRankCd === 'normal') {
        $('#writeForm').prop('disabled', true);
        $('#writeForm').prop('placeholder', '등급이 낮아 리뷰를 작성할 수 없습니다.');
        $('#writeButton').prop('disabled', true);
        $('#writeButton').css('cursor', 'default');
    } else {
        $('#writeForm').prop('disabled', false);
    }

    // 공감순 버튼 색상 변경
    $("#newSort").css("color", "#16ae81");

    // 글자수 html 표현
    $("#writeForm").on("input", function() {
        // 현재 textarea의 글자수 가져오기
        var charCount = $(this).val().length;

        // 글자수를 출력하는 요소 업데이트
        $("#writeNumber").text(charCount + " / " + "100");
    });

    // 리뷰 작성 버튼 누를때 함수
    $("#writeButton").on("click", function () {
        var writeFormContent = $('#writeForm').val();

        // 리뷰 입력빈칸 예외처리
        if (writeFormContent === null || writeFormContent.trim() === '') {
            popup.alert.show("리뷰를 입력해주세요", function () {
                $('#writeForm').focus();
            })
            return;
        }

        popup.confirm.show("리뷰를 작성하시겠습니까?", function(bool) {
            if (bool) {
                try {
                    // 빈칸으로 만듬
                    $('#writeForm').val('');
                    $("#writeNumber").text("0" + " / " + "100");

                    var param = {
                        "markerNo":markerNo,
                        "markerReviewText":writeFormContent
                    };

                    var callback = new Callback(function(result) {
                        if (result === '성공') {
                            popup.alert.show('리뷰 작성에 성공하였습니다.', function () {
                                // 최신순 버튼 클릭 상태
                                if ($("#newSort").css("color") === 'rgb(22, 174, 129)') {
                                    var callback = new Callback(function(result) {
                                        // 정렬값 갱신
                                        // ul태그 비우고 사용
                                        commentList.empty();
                                        if (result.length === 0) {
                                            // 배열이 비어있을 경우 '콘텐츠가 없습니다' 출력
                                            commentList.append("<li style='text-align: center; padding-top: 40px'>작성된 리뷰가 없습니다.</li>");
                                        } else {
                                            // 배열이 비어있지 않을 경우 각 요소에 대해 li 태그 동적으로 생성
                                            result.forEach(function(item) {
                                                commentList.append(`
                                            <li class="comment">
                                                <div class="writer_time">
                                                    <span class="commentWriter">
                                                        ${item.userNm}
                                                    </span>
                                                    <span class="commentTime" title=${item.markerReviewDts}>
                                                        ${detailDate(item.markerReviewDts)}
                                                    </span>
                                                    <span class="reviewLike">
                                                        <button class="reviewLikeButton" data-review-no="${item.markerReviewNo}">
                                                            ${item.reviewLike === 'y' ? `
                                                                <img src="/img/heart_fill.png" alt="Image Button">
                                                            ` : `
                                                                <img src="/img/heart_empty.png" alt="Image Button">
                                                            `}
                                                        </button>
                                                        <span class="likeNum" data-review-no="${item.markerReviewNo}">
                                                            ${item.likeCount}
                                                        </span>
                                                    </span>
                                                </div>
                                                <div class="commentContent">
                                                    ${item.markerReviewText}
                                                </div>
                                                <div class="commentButtons">
                                                  ${USER_INFO.USER_ID === item.userId || groupUserRankCd === 'leader' ? `
                                                    <button id="delButton" class="delButton" data-review-no="${item.markerReviewNo}">
                                                      삭제
                                                    </button>
                                                    <button id="modifyButton" class="modifyButton">
<!--                                                      수정-->
                                                    </button>` : ''}
                                                </div>
                                            </li>
                                            `);
                                            });
                                        }
                                    });
                                    platform.getService("/marker/markerList/" + markerNo + "?sort=new", callback, null);
                                } else {
                                    var callback = new Callback(function (result) {
                                        // 정렬값 갱신
                                        // ul태그 비우고 사용
                                        commentList.empty();
                                        if (result.length === 0) {
                                            // 배열이 비어있을 경우 '콘텐츠가 없습니다' 출력
                                            commentList.append("<li style='text-align: center; padding-top: 40px'>작성된 리뷰가 없습니다.</li>");
                                        } else {
                                            // 배열이 비어있지 않을 경우 각 요소에 대해 li 태그 동적으로 생성
                                            result.forEach(function (item) {
                                                commentList.append(`
                                            <li class="comment">
                                                <div class="writer_time">
                                                    <span class="commentWriter">
                                                        ${item.userNm}
                                                    </span>
                                                    <span class="commentTime" title=${item.markerReviewDts}>
                                                        ${detailDate(item.markerReviewDts)}
                                                    </span>
                                                    <span class="reviewLike">
                                                        <button class="reviewLikeButton" data-review-no="${item.markerReviewNo}">
                                                            ${item.reviewLike === 'y' ? `
                                                                <img src="/img/heart_fill.png" alt="Image Button">
                                                            ` : `
                                                                <img src="/img/heart_empty.png" alt="Image Button">
                                                            `}
                                                        </button>
                                                        <span class="likeNum" data-review-no="${item.markerReviewNo}">
                                                            ${item.likeCount}
                                                        </span>
                                                    </span>
                                                </div>
                                                <div class="commentContent">
                                                    ${item.markerReviewText}
                                                </div>
                                                <div class="commentButtons">
                                                  ${USER_INFO.USER_ID === item.userId || groupUserRankCd === 'leader' ? `
                                                    <button id="delButton" class="delButton" data-review-no="${item.markerReviewNo}">
                                                      삭제
                                                    </button>
                                                    <button id="modifyButton" class="modifyButton">
<!--                                                      수정-->
                                                    </button>` : ''}
                                                </div>
                                            </li>
                                            `);
                                            });
                                        }
                                    });
                                    platform.getService("/marker/markerList/" + markerNo + "?sort=like", callback, null);
                                }
                            })
                        } else {
                            popup.alert.show('이미 작성된 리뷰가 존재합니다.');
                        }
                    });
                    platform.postService("/marker/reviewWrite", param, callback);
                } catch (e) {}
            }
        });
    })

    // 최신순 버튼 클릭 이벤트 핸들러
    $(".newSort").on("click", function() {
        $("#newSort").css("color", "#16ae81");
        $("#likeSort").css("color", "#1e2022");

        var callback = new Callback(function(result) {
            // 정렬값 갱신
            // ul태그 비우고 사용
            commentList.empty();
            if (result.length === 0) {
                // 배열이 비어있을 경우 '콘텐츠가 없습니다' 출력
                commentList.append("<li style='text-align: center; padding-top: 40px'>작성된 리뷰가 없습니다.</li>");
            } else {
                // 배열이 비어있지 않을 경우 각 요소에 대해 li 태그 동적으로 생성
                result.forEach(function(item) {
                    commentList.append(`
                <li class="comment">
                    <div class="writer_time">
                        <span class="commentWriter">
                            ${item.userNm}
                        </span>
                        <span class="commentTime" title=${item.markerReviewDts}>
                            ${detailDate(item.markerReviewDts)}
                        </span>
                        <span class="reviewLike">
                            <button class="reviewLikeButton" data-review-no="${item.markerReviewNo}">
                                ${item.reviewLike === 'y' ? `
                                    <img src="/img/heart_fill.png" alt="Image Button">
                                ` : `
                                    <img src="/img/heart_empty.png" alt="Image Button">
                                `}
                            </button>
                            <span class="likeNum" data-review-no="${item.markerReviewNo}">
                                ${item.likeCount}
                            </span>
                        </span>
                    </div>
                    <div class="commentContent">
                        ${item.markerReviewText}
                    </div>
                    <div class="commentButtons">
                      ${USER_INFO.USER_ID === item.userId || groupUserRankCd === 'leader' ? `
                        <button id="delButton" class="delButton" data-review-no="${item.markerReviewNo}">
                          삭제
                        </button>
                        <button id="modifyButton" class="delButton">
<!--                          수정-->
                        </button>` : ''}
                    </div>
                </li>
                `);
                });
            }
        });

        platform.getService("/marker/markerList/" + markerNo + "?sort=new", callback, null);
    });

    // 공감순 버튼 클릭 이벤트 핸들러
    $(".likeSort").on("click", function() {
        $("#newSort").css("color", "#1e2022");
        $("#likeSort").css("color", "#16ae81");

        var callback = new Callback(function(result) {
            // 정렬값 갱신
            // ul태그 비우고 사용
            commentList.empty();
            if (result.length === 0) {
                // 배열이 비어있을 경우 '콘텐츠가 없습니다' 출력
                commentList.append("<li style='text-align: center; padding-top: 40px'>작성된 리뷰가 없습니다.</li>");
            } else {
                // 배열이 비어있지 않을 경우 각 요소에 대해 li 태그 동적으로 생성
                result.forEach(function(item) {
                    commentList.append(`
                <li class="comment">
                    <div class="writer_time">
                        <span class="commentWriter">
                            ${item.userNm}
                        </span>
                        <span class="commentTime" title=${item.markerReviewDts}>
                            ${detailDate(item.markerReviewDts)}
                        </span>
                        <span class="reviewLike">
                            <button class="reviewLikeButton" data-review-no="${item.markerReviewNo}">
                                ${item.reviewLike === 'y' ? `
                                    <img src="/img/heart_fill.png" alt="Image Button">
                                ` : `
                                    <img src="/img/heart_empty.png" alt="Image Button">
                                `}
                            </button>
                            <span class="likeNum" data-review-no="${item.markerReviewNo}">
                                ${item.likeCount}
                            </span>
                        </span>
                    </div>
                    <div class="commentContent">
                        ${item.markerReviewText}
                    </div>
                    <div class="commentButtons">
                      ${USER_INFO.USER_ID === item.userId || groupUserRankCd === 'leader' ? `
                        <button id="delButton" class="delButton" data-review-no="${item.markerReviewNo}">
                          삭제
                        </button>
                        <button id="modifyButton" class="modifyButton">
<!--                          수정-->
                        </button>` : ''}
                    </div>
                </li>
                `);
                });
            }
        });

        platform.getService("/marker/markerList/" + markerNo + "?sort=like", callback, null);
    });

    // 리뷰 동적으로 할당 하는 부분
    // test 배열이 비어있는지 확인
    if (reviewList.length === 0) {
        // 배열이 비어있을 경우 '콘텐츠가 없습니다' 출력
        commentList.append("<li style='text-align: center; padding-top: 40px'>작성된 리뷰가 없습니다.</li>");
    } else {
        // 배열이 비어있지 않을 경우 각 요소에 대해 li 태그 동적으로 생성
        reviewList.forEach(function(item) {
            commentList.append(`
                <li class="comment">
                    <div class="writer_time">
                        <span class="commentWriter">
                            ${item.userNm}
                        </span>
                        <span class="commentTime" title=${item.markerReviewDts}>
                            ${detailDate(item.markerReviewDts)}
                        </span>
                        <span class="reviewLike">
                            <button class="reviewLikeButton" data-review-no="${item.markerReviewNo}">
                                ${item.reviewLike === 'y' ? `
                                    <img src="/img/heart_fill.png" alt="Image Button">
                                ` : `
                                    <img src="/img/heart_empty.png" alt="Image Button">
                                `}
                            </button>
                            <span class="likeNum" data-review-no="${item.markerReviewNo}">
                                ${item.likeCount}
                            </span>
                        </span>
                    </div>
                    <div class="commentContent">
                        ${item.markerReviewText}
                    </div>
                    <div class="commentButtons">
                      ${USER_INFO.USER_ID === item.userId || groupUserRankCd === 'leader' ? `
                        <button id="delButton" class="delButton" data-review-no="${item.markerReviewNo}">
                          삭제
                        </button>
                        <button id="modifyButton" class="modifyButton">
<!--                          수정-->
                        </button>` : ''}
                    </div>
                </li>
            `);
        });
    }
});

// 작성 시간을 변경해주는 함수
function detailDate(date) {
    const milliSeconds = new Date() - new Date(date);

    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;

    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;

    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;

    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;

    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;

    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;

    const years = days / 365;
    return `${Math.floor(years)}년 전`;
};