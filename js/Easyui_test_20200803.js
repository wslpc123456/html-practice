window.onload=function () {
    loadDataGrid();
    show();
};
function loadDataGrid(){
    $("#cc").datagrid({
        width:1350,
        height:550,
        fitColumns:true,
        rownumbers : true,
        pagination: true, //显示分页栏
        pageSize: 10,//一页显示行数
        pageList:[10,20,50],
        url:'test2.json',
        columns:[[
            {
                field:'dataStatus',title:'状态',width:150
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
                field:' purchaseGroupName',title:'采购组',width:150
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
    });
}
function show(){
    $.ajax({
        url:'test.json',
        type:'post',
        dataType:'json',
        success:function(data){
            $("#cc").datagrid("loadData", data[0].rows.slice(0, 10));
            console.log(data[0].rows);
            //分页代码块
            var pager = $("#cc").datagrid("getPager");//返回页面对象
            //建立分页
            pager.pagination({
                total: data[0].rows.length,
                onSelectPage: function (pageN, pageSize) {
                    //定义起始显示的数据行数和末尾显示数据的行数
                    var start = (pageN - 1) * pageSize;
                    var end = start + pageSize;
                    $("#dg").datagrid("loadData",data[0].rows.slice(start, end));
                    pager.pagination('refresh', {
                        total: data.length,
                        pageNumber: pageN
                    });
                }
            });
        },
        err:function(xhr){
            alert(xhr.status);
        }
    });
}