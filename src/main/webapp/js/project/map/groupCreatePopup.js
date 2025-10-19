function initPage() {
}

function initFrame() {
}

$(document).ready(function() {
    const mapContainer = document.getElementById('map'),
        mapOption = {
            center: new kakao.maps.LatLng(35.156773, 129.059111),
            level: 3
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

    // 아이디 중복확인 이벤트
    $("#groupIdCheckButton").click(function () {
        // id input값 가져오기
        const idInput = $("#groupIdText").val();

        // id 빈칸 예외처리
        if (idInput === null || idInput.trim() === '') {
            popup.alert.show("그룹 아이디를 입력해주세요!", function () {
                $("#groupIdText").focus();
            });
        } else {
            $.ajax({
                type : "GET",
                async: true,
                url : "http://localhost:8080/groupinsert/idCheck", // 아이디 중복확인 URL
                data : {groupId: idInput}, // RequestParam 값
                contentType: "application/json",									// 무슨형의 데이터를 보낼것인지
                dataType : "json",													// 무슨형으로 데이터를 받을것인지
                success : function(data, jqXHR) {
                    popup.alert.show("사용 가능한 그룹 아이디입니다.", function () {
                        $("#groupIdText").attr('disabled', true);
                        $("#groupIdCheckButton").attr('disabled', true);
                    });
                },
                error : function(data) {
                    popup.alert.show("이미 사용중인 아이디입니다.");
                }
            });
        }
    });

    // 그룹 생성 함수
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
        }
        // 아이디 중복확인 안된 케이스 예외처리
        else if ($("#groupIdCheckButton").attr('disabled') === undefined) {
            popup.alert.show("아이디 중복확인을 해주세요!");
        } else {
            $.ajax({
                type: "POST",
                async: true,
                url: "http://localhost:8080/groupinsert/groupCreate", // 그룹가입 요청 URL
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
                        popup.alert.show('그룹 생성에 성공하였습니다.', function () {
                            // 그룹 ID, 그룹명
                            const gId = idInput;
                            const gNm = nameInput;

                            const newListItem = $(
                                `<li class='sidebar-top-level-item' title='${gId} 그룹' 
                                  data-program-id='${gId}' 
                                  data-program-name='${gId}' 
                                  data-program-path='/groupmap/${gId}' 
                                  data-program-path-name='${gId}' 
                                  data-program-rmrk='${gId}'>
                                  <a class='sidebar-top-level-item-header'>
                                    <div class='menuIco'>
                                      <img class='menu-image' style='display:flex' src='/img/project/menuicon/ico-menu-03.png'>
                                    </div>
                                    <span class='nav-item-name'>
                                      ${gNm} 그룹
                                    </span>
                                  </a>
                              </li>`
                            );
                            $(window.parent.document).find('#groupInsertTag').before(newListItem);
                        });
                    }
                },
                error: function (data) {
                    customPopup.hide();
                    popup.alert.show('그룹 생성에 실패하였습니다.');
                }
            });
        }
    });
});