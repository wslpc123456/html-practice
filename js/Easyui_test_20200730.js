window.onload=function () {

    $("#pp").pagination({
        onSelectPage:function (pageNumber,pageSize) {
            console.log(111111);
            if(pageNumber===10){
                console.log(222222);
                $("#pe").panel({
                    width:100,
                    height:100,
                    title:'panel 1',
                    tools:[{iconCls:'icon-add',handler:function () {
                            console.log("add++")
                        }},{iconCls:'icon-save',handler:function () {
                            console.log("saving...")
                        }}]
                })
            }
        }
    });

    $("#check").searchbox({
        width:200,
        prompt:'写点什么',
        menu:'#mm',
        searcher:function (value,name) {
            alert('您要找的是不是..'+value);
        }
    });

$("#dg").datagrid({
   width:500,
   height:500,
    fitColumns:true,
    rownumbers : true,
    pagination: true, //显示分页栏
    pageSize: 10,//一页显示行数
    pageList:[10,20,50],
    url:'test2.json',
    columns:[[
        {
       field:'orderCode',title:'订单号',width:100
    },
        {
       field:'id',title:'ID',width:100
    },
        {
        field:'orderDate',title:'Date',width:100
        }
        ]],
});
  $("#btn").click(function () {
      $("#dg").datagrid('reload');
  });

    function show(){
        $.ajax({
            url:'test2.json',
            type:'get',
            dataType:'json',
            success:function(data){
                $("#dg").datagrid('loadData',data);
                $("#dg").datagrid("loadData", data.slice(0, 10),console.log(data));
                //分页代码块
                var pager = $("#dg").datagrid("getPager");//返回页面对象
                //建立分页
                pager.pagination({
                    total: data.length,
                    onSelectPage: function (pageN, pageSize) {
                        //定义起始显示的数据行数和末尾显示数据的行数
                        var start = (pageN - 1) * pageSize;
                        var end = start + pageSize;
                        $("#dg").datagrid("loadData",data.slice(start, end));
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
    show();

};