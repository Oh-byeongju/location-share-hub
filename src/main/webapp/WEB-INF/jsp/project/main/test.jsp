<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>테스트 페이지</title>
    <script src="https://cdn.ckeditor.com/ckeditor5/29.1.0/classic/ckeditor.js"></script>
    <style>
        .map_wrap {position:relative;width:100%;height:100%;}
        .title {font-weight:bold;display:block;}
        .hAddr {position:absolute;left:10px;top:10px;border-radius: 2px;background:#fff;background:rgba(255,255,255,0.8);z-index:1;padding:5px;}
        #centerAddr {display:block;margin-top:2px;font-weight: normal;}
        .bAddr {padding:5px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
    </style>
</head>
<body>
    <div>
        <p>
            <button onclick="setMarker()">마커 찍기</button>
            <button onclick="stopMarker()">마커 그만찍기</button>
        </p>
        <div class="map_wrap">
            <div id="map" style="width:100%;height:350px;position:relative;"></div>
            <div class="hAddr">
                <span class="title">지도중심기준 행정동 주소정보</span>
                <span id="centerAddr"></span>
            </div>
        </div>
        <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=fb8bef5737e279bc3e7236391517d158&libraries=services"></script>
        <script>
            // 지도 할당
            const mapContainer = document.getElementById('map'),
                mapOption = {
                    center: new kakao.maps.LatLng(35.244791, 129.094453),
                    level: 3
                };

            // 지도 생성
            var map = new kakao.maps.Map(mapContainer, mapOption);

            // 주소-좌표 변환 객체를 생성합니다
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

            // 지도 맵 타입 컨트롤 생성
            var mapTypeControl = new kakao.maps.MapTypeControl();
            map.addControl(mapTypeControl, kakao.maps.ControlPosition.RIGHT);

            // 지도 확대 축소를 제어할 수 있는 줌 컨트롤 생성
            var zoomControl = new kakao.maps.ZoomControl();
            map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

            // // 클릭시 위도, 경도 정보 찾아오는 함수
            // let clickHandler = function(event) {
            //     alert('click: ' + event.latLng.toString());
            // };

            // 마커를 찍을 수 있게 만드는 함수
            function setMarker() {
                // 지도를 클릭했을때 클릭한 위치에 마커를 추가하도록 지도에 클릭이벤트를 등록합니다
                kakao.maps.event.addListener(map, 'click', addMarker);
            }

            // 지도에 표시된 마커 객체를 가지고 있을 배열입니다
            var markers = [];

            // 마커를 생성하고 지도위에 표시하는 함수입니다
            function addMarker(event) {
                console.log(event);

                searchDetailAddrFromCoords(event, function(result, status) {
                    if (status === kakao.maps.services.Status.OK) {

                        console.log(result);
                        console.log(status);

                        var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
                        detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';

                        var content = '<div class="bAddr">' +
                            '<span class="title">법정동 주소정보</span>' +
                            detailAddr +
                            '</div>';
                    }
                });

                // 마커를 생성
                // event.latLng --> 위도 경도 좌표
                var marker = new kakao.maps.Marker({
                    position: event.latLng
                });

                // 여기에 설명 추가란이 드가면됨
                if (window.confirm("마커를 추가하시겠습니까?")) {
                    // 마커가 지도 위에 표시되도록 설정합니다
                    marker.setMap(map);

                    // 생성된 마커를 배열에 추가합니다
                    markers.push(marker);
                }
            }

            // 좌표로 법정동 상세 주소 정보를 요청합니다
            function searchDetailAddrFromCoords(coords, callback) {
                // 여기 아래 매개변수 1번 2번 내가 수정한거
                geocoder.coord2Address(coords.latLng.La, coords.latLng.Ma, callback);
            }

            // 마커를 그만찍게 만드는 함수
            function stopMarker() {
                // 클릭이벤트 제거
                kakao.maps.event.removeListener(map, 'click', addMarker);
            }


        </script>
        <div id="level">
            현재 지도 레벨은 3 입니다
            <script>
                // 지도가 확대 또는 축소되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
                kakao.maps.event.addListener(map, 'zoom_changed', function() {

                    // 지도의 현재 레벨을 얻어옵니다
                    var level = map.getLevel();

                    var message = '현재 지도 레벨은 ' + level + ' 입니다';
                    var resultDiv = document.getElementById('level');
                    resultDiv.innerHTML = message;
                });
            </script>
        </div>
        <div id="position">
            현재 중심좌표는 35.24478218391704 이고, 경도는 129.09444260905875 입니다
            <script>
                // 마우스 드래그로 지도 이동이 완료되었을 때 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
                kakao.maps.event.addListener(map, 'dragend', function() {

                    // 지도 중심좌표를 얻어옵니다
                    var latlng = map.getCenter();

                    var message = '현재 중심좌표는 ' + latlng.getLat() + ' 이고, ';
                    message += '경도는 ' + latlng.getLng() + ' 입니다';

                    var resultDiv = document.getElementById('position');
                    resultDiv.innerHTML = message;
                });
            </script>
        </div>
        <div>
            <h2>
                간격 벌리기
            </h2>
            <div id="editor">
                <p>This is some sample content.</p>
            </div>
            <script>
                ClassicEditor
                    .create( document.querySelector( '#editor' ) )
                    .catch( error => {
                        console.error( error );
                    } );
            </script>
        </div>
    </div>
</body>
</html>