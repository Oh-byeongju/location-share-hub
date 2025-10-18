var groupInfo = null;

function initPage() {
}

function initFrame(param) {
    groupInfo = param;
}

$(document).ready(function() {
    const mapContainer = document.getElementById('map'),
        mapOption = {
            center: new kakao.maps.LatLng(groupInfo.groupLat, groupInfo.groupLong),
            level: groupInfo.groupLev
        };

    // 지도 생성
    var map = new kakao.maps.Map(mapContainer, mapOption);

    // 지도 맵 타입 컨트롤 생성
    var mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.RIGHT);

    // 지도 확대 축소를 제어할 수 있는 줌 컨트롤 생성
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 주소-좌표 변환 객체를 생성
    var geocoder = new kakao.maps.services.Geocoder();
    // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
    searchAddrFromCoords(map.getCenter(), displayCenterInfo);

    // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'idle', function() {
        searchAddrFromCoords(map.getCenter(), displayCenterInfo);
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

    // 지도 레벨 바꾸는 Listener
    kakao.maps.event.addListener(map, 'zoom_changed', function() {
        // 지도의 현재 레벨을 얻어옵니다
        var level = map.getLevel();

        // 레벨 업데이트
        var latDiv = document.getElementById('mapLevel');
        latDiv.innerHTML = '지도 레벨 : ' + level
    });

    // 지도 경도 위도 바꾸는 Listener
    kakao.maps.event.addListener(map, 'dragend', function() {
        // 지도 중심좌표를 얻어옵니다
        var latlng = map.getCenter();
        
        // 위도 경도는 6자리까지 자르기
        // 위도 업데이트
        var latDiv = document.getElementById('mapLat');
        latDiv.innerHTML = '중심 위도 : ' + latlng.getLat().toFixed(6);

        // 경도 업데이트
        var lngDiv = document.getElementById('mapLong');
        lngDiv.innerHTML = '중심 경도 : ' + latlng.getLng().toFixed(6);
    });

    // 그룹 수정 함수
    $("#submitButton").click(function () {
        // 모든 input값 가져오기
        const idInput = $("#groupIdText").val();
        const pwInput = $("#groupPwText").val();
        const nameInput = $("#groupNmText").val();

        // 지도 관련 값
        const level = map.getLevel();
        const latlng = map.getCenter();

        // 아이디 빈칸 예외처리
        if (idInput === null || idInput.trim() === '') {
            popup.alert.show("그룹 아이디를 입력해주세요!", function () {
                $("#groupIdText").focus();
            });
        }
        // 비밀번호 빈칸 예외처리
        else if (pwInput === null || pwInput.trim() === '') {
            popup.alert.show("그룹 비밀번호를 입력해주세요!", function () {
                $("#groupPwText").focus();
            });
        }
        // 이름 빈칸 예외처리
        else if (nameInput === null || nameInput.trim() === '') {
            popup.alert.show("그룹명을 입력해주세요!", function () {
                $("#groupNmText").focus();
            });
        } else {
            $.ajax({
                type: "POST",
                async: true,
                url: "http://localhost:8080/groupmanage/groupUpdate", // 그룹수정 요청 URL
                data: JSON.stringify({
                    groupId: idInput,
                    groupPw: pwInput,
                    groupNm: nameInput,
                    groupLev: level,
                    groupLat: latlng.getLat().toFixed(6),
                    groupLong: latlng.getLng().toFixed(6)
                }), // body에 넣을 값
                contentType: "application/json",									// 무슨형의 데이터를 보낼것인지
                dataType: "json",													// 무슨형으로 데이터를 받을것인지
                withCredentials: true,          // 세션 쿠키 날리는 설정
                success: function (data, jqXHR) {
                    // 요청이 정상적으로 되었을때 실행
                    if (jqXHR === 'nocontent') {
                        customPopup.hide();
                        popup.alert.show('그룹 수정에 성공하였습니다.', function () {
                            $(window.parent.document)
                                .find(`.sidebar-top-level-item[data-program-id='${idInput}'] .nav-item-name`)
                                .text(nameInput + ' 그룹');
                        });
                    }
                },
                error: function (data) {
                    customPopup.hide();
                    popup.alert.show('그룹 수정에 실패하였습니다.');
                }
            });
        }
    });
});