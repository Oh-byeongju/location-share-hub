var groupId = null;
var markerAddress = null;
var markerLat = null;
var markerLong = null;

function initPage() {
}

function initFrame(param) {
    groupId = param.groupId;
    markerAddress = param.markerAddress;
    markerLat = param.markerLat;
    markerLong = param.markerLong;
}

$(document).ready(function(){
    // 마커 주소값 설정
    $("#markerAddress").val(markerAddress);
    
    // SelectBox 생성
    webix.ui({
        id : "selectBox",
        container: "selectBox",
        view: "select",
        options: categoryList
    });

    // editor 생성
    CKEDITOR.ClassicEditor
        .create(document.getElementById("editor"), {
            toolbar: {
                items: [
                    'heading', '|', 'bold', 'italic', 'fontSize', 'fontColor', 'strikethrough', 'underline', '|', 'bulletedList', 'numberedList', '|',
                    'outdent', 'indent', '|', 'undo', 'redo', '|', 'link'
                ],
                shouldNotGroupWhenFull: true
            },

            heading: {
                options: [
                    { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                    { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                    { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                    { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                    { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                    { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                    { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
                ]
            },
            placeholder: '마커 정보를 입력해주세요.',
            fontSize: {
                options: [8, 9, 10, 11, 12, 13, 'default', 16, 17, 18],
                supportAllValues: true
            },
            removePlugins: [
                'ExportPdf',
                'ExportWord',
                'CKBox',
                'CKFinder',
                'EasyImage',
                'RealTimeCollaborativeComments',
                'RealTimeCollaborativeTrackChanges',
                'RealTimeCollaborativeRevisionHistory',
                'PresenceList',
                'Comments',
                'TrackChanges',
                'TrackChangesData',
                'RevisionHistory',
                'Pagination',
                'WProofreader',
                'MathType'
            ]
        })
        .then(editor => {
            // 전역 변수로 에디터를 저장
            window.editor = editor;
        })
        .catch(error => {
                console.error('에디터 초기화 중 오류가 발생했습니다.', error);
        });

    // 버튼 클릭 시 에디터의 값 가져오기
    function getEditorValue() {
        if (window.editor) {
            return window.editor.getData();
        } else {
            console.error('에디터가 초기화되지 않았습니다.');
        }
    }

    // 마커 생성버튼 함수
    $("#submitButton").click(function () {
        // 마커이름 값 가져오기
        const markerNameValue = $("#markerName").val();

        // 마커이름 빈칸 예외처리
        if (markerNameValue.trim() === '') {
            popup.alert.show("마커 이름을 입력해주세요.", function () {
                $("#markerName").focus();
            });
            return;
        }

        // editor값 가져오기
        const editorValue = getEditorValue();

        // editor값 빈칸 예외처리
        if (editorValue === '') {
            popup.alert.show("마커 정보를 입력해주세요.", function () {
                editor.focus();
            });
        }

        // selectBox 컴포넌트의 값 가져오기
        // ex) restaurant, cafe...
        const selectBoxValue = $$("selectBox").getInputNode().value;

        console.log(markerLat.toFixed(6));
        console.log(markerLong.toFixed(6));
       

        // 전달할 값 객체로 생성
        const param = {
            "groupId": groupId,
            "markerName": markerNameValue,
            "markerLat": markerLat,
            "markerLong": markerLong,
            "markerAddress": markerAddress,
            "markerTypeCd": selectBoxValue,
            "markerText": editorValue
        }

        const callback = new Callback(function(result) {
            console.log(result);
            if (Object.values(result).length === 2) {
                customPopup.hide();
                popup.alert.show('마커 생성에 성공하였습니다.', function () {
                    // 여기를 이제 어떻게 할것인가가 고민인데
                    // 마커를 밀어넣는 방법을 고민해야함
                    // 비효율적이지만 하려고 하면
                    // 이거 콘솔 닫힐때 마다 지도를 refresh 해줘야함
                    // 그때마다 마커 정보를 들고와서 지도에 띄우는 형식으로 진행
                    // 그러면 여기에 로딩창이 있으면 될꺼같은데
                });
            } else {
                customPopup.hide();
                popup.alert.show("마커 생성에 실패하였습니다.", function () {
                    // main 페이지를 새로고침
                    parent.refreshParent();
                });
            }
        });
        platform.postService("/groupinsert/groupJoin", param, callback);
    })
});

