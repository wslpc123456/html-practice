let rows;
let del=[];
$(function () {
    $.ajaxSettings.async = false;
    $.ajax({
        url:'test.json',
        type:'post',
        dataType:'json',
        success:function(data){
            rows=data[0].rows;
        }

    });
    $('#menu').dialog('close');
    loadDataGird();
    Rendering();
    $("#addbtn").click(addData);
    $("#del").click(delData);
    $("#edit").click(editData);
    $("#savebtn").click(saveData);

});

/*
定义数据表格
 */
function loadDataGird() {
    $("#dg").datagrid({
        width:1350,
        height:550,
        fitColumns:true,
        pagination:true,
        pageSize:10,
        pageList:[5,10,15],
        url:'test.json',
        columns:[[
            {
                field:'dataStatus',title:'状态',width:150,checkbox:true
            },
            {
                field:'orderCode',title:'采购订单号',width:150
            },
            {
                field:'supplierCode',title:'供应商编码',width:150
            },
            {
                field:'supplierName',title:'供应商名称',width:150
            },
            {
                field:'companyCodeAndName',title:'公司',width:150
            },
            {
                field:'purchaseGroupName',title:'采购组',width:150
            },
            {
                field:'sapPoType',title:'采购订单类型',width:150
            },
            {
                field:'currencyCode',title:'货币代码',width:150
            },
            {
                field:'createDateStr',title:'创建日期',width:150
            },
            ]],
    })
}


/*
增加数据
 */

function addData(){
let record={};
$.each($("#addFrom").serializeArray(),function (i,item) {
    record[item.name]=item.value;
});
    rows.push(record);
    console.log(rows);
    console.log("添加成功");
    $('#menu').dialog('close');
    Rendering();
}

/*
编辑数据
 */
function editData(){
 var select=$('#dg').datagrid('getSelections');
 for(var i=0;i<select.length;i++){
     console.log('选中的行'+select[i].orderCode);
     $('#ip1').val(select[i].dataStatus);
     $('#ip2').val(select[i].orderCode);
     $('#ip3').val(select[i].supplierCode);
     $('#ip4').val(select[i].supplierName);
     $('#ip5').val(select[i].companyCodeAndName);
     $('#ip6').val(select[i].purchaseGroupName);
     $('#ip7').val(select[i].sapPoType);
     $('#ip8').val(select[i].currencyCode);
     $('#ip9').val(select[i].createDateStr);
 }
}


/*
删除数据
 */
function delData(){

    var row=$('#dg').datagrid('getChecked');
    for(var j=0;j<row.length;j++){
        console.log(row[j].orderCode);
        var pos=$.inArray(row[j],rows);
        rows.splice(pos,1);
        console.log(row.length+'已删除');
    }
    Rendering();
}

/*
保存数据
 */
function saveData() {
    let record={};
    $.each($("#addFrom").serializeArray(),function (i,item) {
        record[item.name]=item.value;
    });
    console.log('保存成功'); //待完成
    $('#menu').dialog('close');
    Rendering();
}

/*
渲染函数
 */
function Rendering() {

    //加载本地数据
    $('#dg').datagrid('loadData',rows);
    console.log('loadData',rows);

    //用page承装数据表格dg中的所有数据
    let page=$('#dg').datagrid('getPager');

    //显示第一页的内容
    $('#dg').datagrid('loadData',rows.slice(0,page.data('pagination').options.pageNumber*page.data('pagination').options.pageSize));

    //建立分页
    page.pagination({
        total:rows.length,
        //事件:翻页
        onSelectPage:function(pageNumber,pageSize){
            //显示 (页数-1~页数)*行数 的数据
            $('#dg').datagrid('loadData',rows.slice((pageNumber-1)*pageSize,pageNumber*pageSize));
            //此时total和pageNumber发生了改变 调用refresh方法刷新它们的值
            page.pagination('refresh',{
                total:rows.length,
                pageNumber:pageNumber,
            })
        }
    });

}