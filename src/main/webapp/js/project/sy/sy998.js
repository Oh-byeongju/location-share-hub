webix.ready(function() {

    $('.sumoselect_multiple').SumoSelect({
        placeholder: '선택해주세요'
    });

    const sampleData = [
        { id:'data1',value:'data1' },
        { id:'data2',value:'data2' },
        { id:'data3',value:'data3' },
        { id:'data4',value:'data4' },
        { id:'data5',value:'data5' },
        { id:'data6',value:'data6' },
        { id:'data7',value:'data7' },
    ]

    const sampleData2 = [
        { id:'1000',value:'1000' },
        { id:'2000',value:'2000' },
        { id:'3000',value:'3000' },
        { id:'4000',value:'4000' },
        { id:'5000',value:'5000' },
        { id:'6000',value:'6000' },
        { id:'7000',value:'7000' },
    ]

    let grid1 = webix.ui({
        id : "grid1",
        container : "grid1",
        leftSplit:2,
        dragColumn:true,
        view : "datagrid",
        columns : [
            {id:"no editorCol" ,     editor:"",              sort:"string",css:"textCenter",width:100,header : [{text:"multi-header" , colspan:2} , "no editor" ] },
            {id:"textCol",           editor:"text",          maxLength:20,sort:"string",css:"textCenter",width:120,header:[ "" , {text:"text"} ] },
            {id:"memoCol",           header:"memo",          editor:"popup",      maxLength:20,sort:"string",css:"textCenter",width:120,},
            new CodeHelp("codeHelpCol","codeHelp",{width:130,maxLength:7,css:"textCenter" }, { code: "01", target:"codeName", type:"code", param:{compCd:USER_INFO.COMP_CD,cdGb:"SY040"}} ),
            {id:"codeName" ,         editor:"",              header : "codeName", sort:"string",css:"textCenter",width:120,},
            {id:"selectCol",         header:"select",        editor:"select",options:sampleData,sort:"string",css:"textCenter",width:120},
            {id:"checkboxCol",       header:"checkbox",      editor:"checkbox", checkValue:"Y",uncheckValue:"N",template:"{common.checkbox()}",sort:"string",css:"textCenter",width:100},
            {id:"readonlyCheckboxCol", header:"readonlyCheckbox", editor:"checkbox", checkValue:"Y",uncheckValue:"N",template:"{common.checkbox()}",sort:"string",css:"textCenter",width:130 },
            {id:"mastercheckboxCol", header:{ content:"masterCheckbox", contentId:"mc1" },editor:"checkbox", checkValue:"Y",uncheckValue:"N",template:"{common.checkbox()}",sort:"string",css:"textCenter",width:100},
            {id:"dateCol",           header:"date",          editor:"editdate",format:dateFormat,sort:"string",css:"textCenter",width:120 , stringResult:true},
            {id:"comboCol",          header:"combo",         editor:"combo",collection:sampleData,sort:"string",css:"textCenter",width:120,},
            {id:"richselectCol",     header:"richselect",    editor:"richselect",collection:sampleData2,sort:"int",css:"textCenter",width:120,  },
            {id:"numberFormat",      header:"numberFormat",  editor:"text",sort:"int",css:"textRight",width:120,...webixNumberFormat()},
            {id:"templateHTML",      header:"templateHTML",  editor:"",sort:"int",css:"textCenter",width:150,template:function(data,editor){
                    return `<button style='color: red' onclick="alert('Click')">Button</button>`;
                }},

        ]
    });

    grid1.initGrid();

    const footer = [
        new Footer("textCol", "text", "Total"),
        new Footer("comboCol", "count","", "footerLeft"),
        new Footer("richselectCol", "avg","", "footerRight"),
        new Footer("numberFormat", "sum","", "footerRight"),
    ];

    grid1.setFooter(footer)
    //document.getElementById("category").value = '2'
    changeCategory(document.getElementById("category"))
    addRow(grid1)
    grid1.setReadonly("readonlyCheckboxCol");

    $("#focus").on("click",e => {
        grid1.setFocus(0, "textCol");
    })

    $("#gridData").on("click",e => {
        console.log(grid1.getData());
    })

    $("#selectedData").on("click",e => {
        console.log(grid1.getRowData(grid1.getRowIndex()));
    })

    $("#textUpdate").on("click" ,e => {
        let rowIndex = 0;
        let columnName = "textCol"
        let data = "update"
        grid1.setCellValue(rowIndex,columnName,data);
    })

    $("#setReadonly").on("click" , e => {
        grid1.setReadonly("codeHelpCol");
    })



});

(function (){
    [...Object.keys(listener.gridRow) ,...Object.keys(listener.gridEditor)].forEach(key => {
        listener.gridRow[key] = function () { console.log( `listener.gridRow.${key}   `,arguments ) }
    })

})()

listener.button.addRow.click = function(event) {
    addRow($$("grid1"))
}
listener.button.removeRow.click = function () {
    $$("grid1").removeSelectedRow();
}

listener.gridEditor.onHelpClick = function (grid, rowIndex, column , data) {
    let text = `
        codeHelp Click 
        rowIndex : ${rowIndex} , 
        column : ${column} ,
        data : ${data}
    `
    alert(text)
}

const addRow = (grid) => {
    grid.addRow()
}
const changeCategory  = (obj) => {
    if(obj.value === '1') {
        $("#componentContainer").css("display","block")
        $("#gridContainer").css("display","none")
    } else if( obj.value === '2') {
        $("#componentContainer").css("display","none")
        $("#gridContainer").css("display","block")
    }
}
