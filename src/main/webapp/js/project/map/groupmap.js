// 그리기 작업 중인지 여부를 저장하는 변수
var isDrawing = false;
var kakaoMap = null;
var positions = null;
// 생성된 오버레이 리스트
var createOverlay = [];
// 오버레이 리스트
var overlayList = [];

function initPage() {
}

$(document).ready(function() {
    // 존재하지 않는 그룹일경우 예외처리
    if (groupId === '') {
        popup.alert.show("존재하지 않는 그룹입니다.", function () {
            // main 페이지를 새로고침
            parent.refreshParent();
        });
    }
    // 그룹에서 차단당했을 경우 예외처리
    else if (groupUserRankCd === 'blocked') {
        popup.alert.show("사용할 수 없는 그룹입니다.", function () {
            // main 페이지를 새로고침
            parent.refreshParent();
        });
    } else {
        const mapContainer = document.getElementById('map'),
            mapOption = {
                center: new kakao.maps.LatLng(groupLat, groupLong),
                level: groupLev
            };

        // 지도 생성
        kakaoMap = new kakao.maps.Map(mapContainer, mapOption);

        // 생성된 오버레이에 이벤트 넣는 함수
        $(document).on("click", "#closeButton", function(event) {
            event.preventDefault();
            event.stopPropagation();

            // 닫기 누른 오버레이의 마커 id
            var $this = $(this);
            var deleteNo = $this.data("marker-no");

            // 오버레이 삭제 함수 호출
            removeOverlay(deleteNo);
        });

        // 오버레이의 삭제 버튼 이벤트
        $("body").on("click", "#delButton", function() {
            // 삭제 누른 오버레이의 마커 id
            // var $this = $(this);
            // var markerId = $this.data("marker-no");

            popup.alert.show("아직 구현되지 않은 기능입니다.")
        });

        // 오버레이의 수정 버튼 이벤트
        $("body").on("click", "#modifyButton", function() {
            // 수정 누른 오버레이의 마커 id
            // var $this = $(this);
            // var markerId = $this.data("marker-no");

            popup.alert.show("아직 구현되지 않은 기능입니다.")
        });

        // 오버레이의 즐겨찾기 버튼 이벤트
        $("body").on("click", ".favoriteButton", function() {
            // 즐겨찾기 누른 오버레이의 마커 id
            var $this = $(this);
            var markerId = $this.data("marker-no");

            // 즐겨찾기 요청
            $.ajax({
                type: "POST",
                async: true,
                url: "http://localhost:8080/marker/bookmark",
                data: JSON.stringify({"markerNo": markerId}),
                contentType: "application/json",
                withCredentials: true,          // 세션 쿠키 날리는 설정
                success: function (data) {
                    // 존재하지 않는 마커 예외처리
                    if (data === "error") {
                        popup.alert.show("존재하지 않는 마커입니다.", function () {
                            // main 페이지를 새로고침
                            parent.refreshParent();
                        });
                    }

                    const modifyMarker = markerList.find(marker => marker && marker.markerNo === markerId.toString());
                    
                    // 내가 저장한 배열에서는 수정했는데
                    // 기존에걸 삭제하고 다시 밀어넣어야하나 아니면
                    // 저거 이미지만 변경이 가능한가 고민해보기
                    // // 찾은 객체가 있고, 해당 객체의 markerBookmark를 리턴값으로 변경
                    // if (modifyMarker) {
                    //     targetObject.markerBookmark = data;
                    // }


                },
                error: function (data) {
                    popup.alert.show("존재하지 않는 마커입니다.", function () {
                        // main 페이지를 새로고침
                        parent.refreshParent();
                    });
                }
            });
        });

        // 오버레이의 상세보기 버튼 이벤트
        $("body").on("click", "#detailButton", function() {
            // 상세보기 누른 오버레이의 마커 id
            var $this = $(this);
            var markerId = $this.data("marker-no");

            var callback = new Callback(function(result) {});
            // 마커 상세정보 요청
            customPopup.show("/marker/markerDetail/"+ markerId, "마커 정보", 780, 715, callback, {groupId: "temp"});
        });

        // 오버레이를 생성하고 리스트에 추가하는 함수
        function addOverlay(marker) {
            // content에 들어갈 마커 내용
            var markerNo = marker.markerNo.toString();
            var userId = marker.userId;
            var userNm = marker.userNm
            var markerNm = marker.markerNm;
            var markerAddress = marker.markerAddress;
            var cdNm = marker.cdNm;
            var markerBookmark = marker.markerBookmark;

            // 사용자가 만든 마커인지 확인하는 변수 + 사용자가 그룹장인지 확인하는 변수
            var isUserMatch = USER_INFO.USER_ID === userId;
            var isLeaderMatch = groupUserRankCd === 'leader';

            var content = `
                <div class="wrap">
                    <div class="info">
                        <div class="title">
                            ${markerNm}
                            <div id="closeButton" class="close" title="닫기" data-marker-no="${markerNo}"></div>
                        </div>
                        <div class="body">
                            <button class="favoriteButton" data-marker-no="${markerNo}">
                                ${markerBookmark === 'y' ? `
                                    <img src="/img/heart_fill.png" alt="Image Button">
                                ` : `
                                    <img src="/img/heart_empty.png" alt="Image Button">
                                `}
                            </button>
                            <div class="desc">
                                <div class="jibun ellipsis" style="width: 180px">주소 : ${markerAddress}</div>
                                <div class="jibun ellipsis">분류 : ${cdNm}</div>
                                ${isUserMatch || isLeaderMatch ? `
                                    <ul class="ButtonList">
                                        <li class="ButtonWrap">
                                            <button id="delButton" data-marker-no="${markerNo}">
                                                삭제
                                            </button>
                                        </li>
                                        <li class="ButtonWrap">
                                            <button id="modifyButton" data-marker-no="${markerNo}">
                                                수정
                                            </button>
                                        </li>
                                    </ul>
                                ` : `
                                    <div class="jibun ellipsis" style="margin-top: 30px; color: black"></div>
                                `}
                                <div class="jibun ellipsis" style="margin-top: 10px; color: black">
                                    만든이 : ${userNm}
                                </div>
                                <button id="detailButton" class="detailButton" data-marker-no="${markerNo}">
                                    상세보기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // 오버레이 생성
            // 생성 시 마커의 넘버도 할당
            var overlay = new kakao.maps.CustomOverlay({
                content: content,
                map: kakaoMap,
                position: marker.getPosition(),
            });
            overlay.markerNo = markerNo;

            // 오버레이 리스트에 추가
            overlayList.push(overlay);
        }

        // 오버레이를 삭제하는 함수
        function removeOverlay(overlayId) {
            // 지도에서 해당 ID를 가진 overlay 제거
            const targetOverlay = overlayList.find(overlay => overlay.markerNo === overlayId.toString());
            if (targetOverlay) {
                targetOverlay.setMap(null);
            }

            // ID가 일치하지 않는 오버레이로 이루어진 배열을 생성
            const filteredOverlayList = overlayList.filter(overlay => overlay.markerNo !== overlayId.toString());

            // 현재의 overlayList를 filteredOverlayList로 교체하여 해당 ID를 가진 overlay를 제거
            overlayList.splice(0, overlayList.length, ...filteredOverlayList);

            // 생성된 overlayList 갱신
            createOverlay = createOverlay.filter(overlay => overlay !== overlayId.toString());
        }

        // 기존의 존재하는 마커생성 및 지도에 추가
        markerList.forEach(markerInfo => {
            // 마커의 이미지 주소입니다((일반))
            var imageSrc = "http://t1.daumcdn.net/mapjsapi/images/2x/marker.png";

            // 사용자가 즐겨찾기한 마커면 별모양 마커 생성
            // 마커 이미지의 이미지 주소입니다((별모양))
            if (markerInfo.markerBookmark === 'y') {
                imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
            }

            // 마커 이미지의 이미지 크기 입니다
            var imageSize = new kakao.maps.Size(29, 43);

            // 마커 이미지를 생성합니다
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

            const marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(markerInfo.markerLat, markerInfo.markerLong),
                title: markerInfo.markerNm,
                image : markerImage
            });

            // 마커에 대한 정보 할당
            marker.markerNo = markerInfo.markerNo;
            marker.userId = markerInfo.userId;
            marker.userNm = markerInfo.userNm
            marker.markerNm = markerInfo.markerNm;
            marker.markerAddress = markerInfo.markerAddress;
            marker.cdNm = markerInfo.cdNm;
            marker.markerBookmark = markerInfo.markerBookmark;

            // 마커에 클릭이벤트 등록
            kakao.maps.event.addListener(marker, 'click', function() {
                // 특정마커에 생성된 오버레이가 없을경우
                if (!createOverlay.includes(marker.markerNo.toString())) {
                    // 마커의 key를 배열에 넣고 오버레이 생성
                    createOverlay.push(marker.markerNo);
                    addOverlay(marker);
                } else {
                    // 마커의 key를 배열에서 삭제하고 오버레이 제거
                    removeOverlay(marker.markerNo);
                }
            });

            // 마커를 지도에 추가
            marker.setMap(kakaoMap);
        });

        // 지도 맵 타입 컨트롤 생성
        var mapTypeControl = new kakao.maps.MapTypeControl();
        kakaoMap.addControl(mapTypeControl, kakao.maps.ControlPosition.RIGHT);

        // 지도 확대 축소를 제어할 수 있는 줌 컨트롤 생성
        var zoomControl = new kakao.maps.ZoomControl();
        kakaoMap.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        // 주소-좌표 변환 객체를 생성
        var geocoder = new kakao.maps.services.Geocoder();
        // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
        searchAddrFromCoords(kakaoMap.getCenter(), displayCenterInfo);

        // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
        kakao.maps.event.addListener(kakaoMap, 'idle', function() {
            searchAddrFromCoords(kakaoMap.getCenter(), displayCenterInfo);
        });

        function searchAddrFromCoords(coords, callback) {
            // 좌표로 행정동 주소 정보를 요청합니다
            geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
        }

        // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
        function displayCenterInfo(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                var infoDiv = document.getElementById('centerAddr');

                for(var i = 0; i < result.length; i++) {
                    // 행정동의 region_type 값은 'H' 이므로
                    if (result[i].region_type === 'H') {
                        infoDiv.innerHTML = result[i].address_name;
                        break;
                    }
                }
            }
        }

        // drawing 옵션
        var options = { // Drawing Manager를 생성할 때 사용할 옵션입니다
            map: kakaoMap, // Drawing Manager로 그리기 요소를 그릴 map 객체입니다
            drawingMode: [ // Drawing Manager로 제공할 그리기 요소 모드입니다
                kakao.maps.drawing.OverlayType.MARKER
            ],
            // 사용자에게 제공할 그리기 가이드 툴팁입니다
            guideTooltip: ['draw'],
            markerOptions: { // 마커 옵션 커스텀
                markerImages:
                    [
                        {
                            src: 'http://t1.daumcdn.net/mapjsapi/images/2x/marker.png',
                            width: 29,
                            height: 43
                        },
                    ]
            },
        };

        // 매니저 변수 할당
        var manager = new kakao.maps.drawing.DrawingManager(options);

        function selectOverlay(type) {
            // 마커 생성 작업 중이면 생성을 취소합니다
            if (isDrawing) {
                manager.cancel();
                isDrawing = false;
            } else {
                // 마커 생성을 할당합니다.
                manager.select(kakao.maps.drawing.OverlayType[type]);
                isDrawing = true;
            }
        }

        // 마커 찍고 나서 콜백 개념의 함수
        kakao.maps.event.addListener(manager, 'drawend', function (data) {
            // marker의 마지막 index
            var lastIndex=  manager.getData().marker.length - 1;
            var mapAddress = ""

            // 경도, 위도 순서대로 전달 (주소 찾기)
            searchDetailAddrFromCoords(manager.getData().marker[lastIndex].x, manager.getData().marker[lastIndex].y, function(result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    // 주소 계산 후 할당
                    mapAddress = result[0].address.address_name;

                    // 주소 때문에 콜백이후 함수 실행
                    var callback = new Callback(function(event) {
                        // 마커생성 성공 케이스
                        if (event !== "실패" && event !== undefined) {
                            // 마커의 이미지 주소입니다((일반))
                            var imageSrc = "http://t1.daumcdn.net/mapjsapi/images/2x/marker.png"

                            // 마커 이미지의 이미지 크기 입니다
                            var imageSize = new kakao.maps.Size(29, 43);

                            // 마커 이미지를 생성합니다
                            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

                            const marker = new kakao.maps.Marker({
                                position: new kakao.maps.LatLng(event.markerLat, event.markerLong),
                                title: event.markerNm,
                                image : markerImage
                            });

                            // 마커에 대한 정보 할당
                            marker.markerNo = event.markerNo
                            marker.userId = event.userId;
                            marker.userNm = event.userNm
                            marker.markerNm = event.markerNm;
                            marker.markerAddress = event.markerAddress;
                            marker.cdNm = event.cdNm;

                            // 마커에 클릭이벤트 등록
                            kakao.maps.event.addListener(marker, 'click', function() {
                                // 특정마커에 생성된 오버레이가 없을경우
                                if (!createOverlay.includes(marker.markerNo.toString())) {
                                    // 마커의 key를 배열에 넣고 오버레이 생성
                                    createOverlay.push(marker.markerNo.toString());
                                    addOverlay(marker);
                                } else {
                                    // 마커의 key를 배열에서 삭제하고 오버레이 제거
                                    removeOverlay(marker.markerNo);
                                }
                            });

                            // 마커를 지도에 추가
                            marker.setMap(kakaoMap);
                        }

                        // 마커를 그렸으니까 다시 false로 변경
                        isDrawing = false;

                        // 매너지가 생성한 마커를 제거
                        manager.remove(data.target);
                    });

                    // 마커 생성 팝업창을 여는 함수
                    // 파라미터로 커주소, 위도, 경도를 전달
                    customPopup.show("/groupmap/markerCreatePopup", "마커 생성", 780, 725, callback,
                        {groupId: groupId,
                            markerAddress: mapAddress,
                            markerLat: manager.getData().marker[lastIndex].y,
                            markerLong: manager.getData().marker[lastIndex].x});
                }
            });
        });

        // 좌표로 법정동 상세 주소 정보를 요청합니다 (위도, 경도 기준)
        function searchDetailAddrFromCoords(x, y, callback) {
            geocoder.coord2Address(x, y, callback);
        }

        // 마커생성 버튼에 대한 클릭 이벤트를 등록합니다
        $('#create').on('click', function () {
            // 등급에 따른 마커 생성 예외처리
            if (groupUserRankCd === 'normal') {
                popup.alert.show("등급이 낮아 마커생성이 불가능합니다.");
                return;
            }

            // 마커 생성 시작
            selectOverlay('MARKER');
        });
    }
});

// 그룹정보 버튼
listener.button.search.click = function () {
    var callback = new Callback(function(result) {});
    // 그룹정보 팝업창 여는 함수
    customPopup.show("/groupmap/groupInfoPopup/"+ groupId, "그룹 정보", 520, 510, callback, {groupId: "temp"});
}