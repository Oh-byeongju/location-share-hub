// 그리기 작업 중인지 여부를 저장하는 변수
var isDrawing = false;

function initPage() {
}

$(document).ready(function() {
    const mapContainer = document.getElementById('map'),
        mapOption = {
            center: new kakao.maps.LatLng(groupLat, groupLong),
            level: groupLev
        };

    // 지도 생성
    var kakaoMap = new kakao.maps.Map(mapContainer, mapOption);

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
        // 사용자에게 도형을 그릴때, 드래그할때, 수정할때 가이드 툴팁을 표시하도록 설정합니다
        guideTooltip: ['draw'],
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
    kakao.maps.event.addListener(manager, 'drawend', function () {


        // 경도, 위도 순서대로 전달
        searchDetailAddrFromCoords(manager.getData().marker[0].x, manager.getData().marker[0].y, function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                console.log('이거 날라오는거 내일 매핑해버리기 도로명 주소 있으면 도로명 아니면 그냥 주소 --> test코드 보기')
                
                console.log(result);
                console.log(status);

            }
        });



        var callback = new Callback(function(result) {
            // 마커를 그렸으니까 다시 false로 변경
            isDrawing = false;
        });

        // 마커 생성 팝업창을 여는 함수
        // 파라미터로 마커주소, 위도, 경도를 전달
        // customPopup.show("/groupmap/markerCreatePopup", "마커 생성", 520, 510, callback, {markerLat: manager.getData().marker[0].y, markerLong: manager.getData().marker[0].x});
    });

    // 좌표로 법정동 상세 주소 정보를 요청합니다 (위도, 경도 기준)
    function searchDetailAddrFromCoords(x, y, callback) {
        geocoder.coord2Address(x, y, callback);
    }

    // 마커생성 버튼에 대한 클릭 이벤트를 등록합니다
    $('#create').on('click', function () {
        selectOverlay('MARKER');
    });
});

// 그룹정보 버튼
listener.button.search.click = function () {
    var callback = new Callback(function(result) {});
    // 그룹정보 팝업창 여는 함수
    customPopup.show("/groupmap/groupInfoPopup/"+ groupId, "그룹 정보", 520, 510, callback, {groupId: "temp"});
}