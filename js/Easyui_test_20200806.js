let rows;
let select = [], selectP = 0;
/*
文档就绪函数
 */
$(function () {
    $.ajaxSettings.async = false;
    $.ajax({
        url: 'test.json',
        type: 'post',
        dataType: 'json',
        success: function (data) {
            rows = data[0].rows;
        }

    });
    $('#menu').dialog('close');
    loadDataGird();
    Rendering();
    $('#add').click(function () {
        $('.cc input').val("");
    });
    $("#del").click(delData);
    $("#edit").click(editData);
    $("#see").click(seeData);
    $("#addbtn").click(addData);
    $("#savebtn").click(saveData);
    $('#xx1').on('input', query);
    $('#xx2').on('input', query2);
    $('#sl1').change(query3);
    $('#sl2').change(query4);
    //$('#date2').change(query5)
});

/*
定义数据表格
 */
function loadDataGird() {
    $("#dg").datagrid({
        width: 1400,
        height: 550,
        fitColumns: true,
        pagination: true,
        pageSize: 10,
        pageList: [5, 10, 15],
        url: 'test.json',
        columns: [[
            {
                field: 'checkbox', title: '复选框', checkbox: true
            },
            {
                field: 'dataStatus', title: '状态', width: 100
            },
            {
                field: 'orderCode', title: '采购订单号', width: 100
            },
            {
                field: 'supplierCode', title: '供应商编码', width: 63
            },
            {
                field: 'supplierName', title: '供应商名称', width: 150
            },
            {
                field: 'companyCodeAndName', title: '公司', width: 150
            },
            {
                field: 'purchaseGroupName', title: '采购组', width: 75
            },
            {
                field: 'sapPoType', title: '采购订单类型', width: 150
            },
            {
                field: 'currencyCode', title: '货币代码', width: 50
            },
            {
                field: 'createDateStr', title: '创建日期', width: 100
            },
        ]],
        //事件:选择一行
        onSelect: function () {
            $('#edit').linkbutton('enable');
            $('#del').linkbutton('enable');
        },
        //事件:选择所有行
        onSelectAll: function () {
            $('#edit').linkbutton('enable');
            $('#del').linkbutton('enable');
        },
        //事件:取消选择一行
        onUnselect: function () {
            if ($('#dg').datagrid('getSelections').length === 0) {
                $('#edit').linkbutton('disable');
                $('#del').linkbutton('disable');
            }
        },
        //事件:取消选择所有行
        onUnselectAll: function () {
            $('#edit').linkbutton('disable');
            $('#del').linkbutton('disable');
        }
    })
}

/*
增加数据
 */
function addData() {
    let record = {};
    $.each($("#addFrom").serializeArray(), function (i, item) {
        record[item.name] = item.value;
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
function editData() {
    $('#menu').dialog('open');
    $('#savebtn').show();
    if (select.length === 0) {
        select = $('#dg').datagrid('getSelections');
    }
    var i = selectP;
    console.log('编辑的行为' + select[i].orderCode);
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

/*
删除数据
 */
function delData() {

    var row = $('#dg').datagrid('getChecked');
    for (var j = 0; j < row.length; j++) {
        var pos = $.inArray(row[j], rows);
        rows.splice(pos, 1);
        console.log(row[j].orderCode + '已删除');
    }
    Rendering();
}

/*
保存数据
 */
function saveData() {
    let pos = $.inArray(select[selectP], rows);
    let record = {};
    $.each($("#addFrom").serializeArray(), function (i, item) {
        record[item.name] = item.value;
    });
    rows.splice(pos, 1, record);
    console.log('保存成功');
    $('#menu').dialog('close');
    Rendering();
    if (selectP + 1 < select.length) {
        selectP++;
        editData();
    }
    else {
        select = [];
        selectP = 0;
    }
}

/*
查看数据
 */
function seeData() {
    $.messager.prompt('提示信息', '请输入需要查询的订单号：', function (val) {
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].orderCode === val) {
                $('#menu').dialog('open');
                $('#ip1').val(rows[i].dataStatus);
                $('#ip2').val(rows[i].orderCode);
                $('#ip3').val(rows[i].supplierCode);
                $('#ip4').val(rows[i].supplierName);
                $('#ip5').val(rows[i].companyCodeAndName);
                $('#ip6').val(rows[i].purchaseGroupName);
                $('#ip7').val(rows[i].sapPoType);
                $('#ip8').val(rows[i].currencyCode);
                $('#ip9').val(rows[i].createDateStr);
            }
        }
    });
}

/*
渲染函数
 */
function Rendering() {

    //加载本地数据
    $('#dg').datagrid('loadData', rows);
    console.log('loadData', rows);

    //用page承装数据表格dg中的所有数据
    let page = $('#dg').datagrid('getPager');

    //显示第一页的内容
    $('#dg').datagrid('loadData', rows.slice(0, page.data('pagination').options.pageNumber * page.data('pagination').options.pageSize));

    //建立分页
    page.pagination({
        total: rows.length,
        //事件:翻页
        onSelectPage: function (pageNumber, pageSize) {
            //显示 (页数-1~页数)*行数 的数据
            $('#dg').datagrid('loadData', rows.slice((pageNumber - 1) * pageSize, pageNumber * pageSize));
            //恢复上面的查询栏为初始状态
            $('.bb input').val("");
            $('.bb select').val("all");
            //此时total和pageNumber发生了改变 调用refresh方法刷新它们的值
            page.pagination('refresh', {
                total: rows.length,
                pageNumber: pageNumber,
            })
        },
    });
    $('#edit').linkbutton('disable');
    $('#del').linkbutton('disable');
}

/*
关键字查询
 */
function query() {
    var Row = $('#dg').datagrid('getRows');
    //得到数据表格的行数据，通过上面的方法得到的行下标进行操作
    var trs = $('#dg').datagrid('getPanel').find('table.datagrid-btable').find('tr');
    for (var i = 0; i < Row.length; i++) {
        trs.eq(i).show();
        if (Row[i].supplierCode.indexOf($('#xx1').val()) === -1 && Row[i].supplierName.indexOf($('#xx1').val()) === -1) {
            trs.eq(i).hide()
        }
    }
}

function query2() {
    var Row = $('#dg').datagrid('getRows');
    var trs = $('#dg').datagrid('getPanel').find('table.datagrid-btable').find('tr');
    for (var i = 0; i < Row.length; i++) {
        trs.eq(i).show();
        if (Row[i].orderCode.indexOf($('#xx2').val()) === -1) {
            trs.eq(i).hide()
        }
    }
}

/*
下拉框选项查询
 */
function query3() {
    var Row = $('#dg').datagrid('getRows');
    var trs = $('#dg').datagrid('getPanel').find('table.datagrid-btable').find('tr');
    for (var i = 0; i < Row.length; i++) {
        trs.eq(i).show();
        if (Row[i].sapPoType.indexOf($('#sl1').val()) === -1) {
            trs.eq(i).hide()
        }
        if ($('#sl1').val() === 'all') {
            trs.eq(i).show();
        }
    }
}

function query4() {
    var Row = $('#dg').datagrid('getRows');
    var trs = $('#dg').datagrid('getPanel').find('table.datagrid-btable').find('tr');
    for (var i = 0; i < Row.length; i++) {
        trs.eq(i).show();
        if (Row[i].purchaseGroupName.indexOf($('#sl2').val()) === -1) {
            trs.eq(i).hide()
        }
        if ($('#sl2').val() === 'all') {
            trs.eq(i).show();
        }
    }
}
