/*
渲染函数Rendering  先输出 counter 到 counter+nor 的数据(经过判断不会输出del中的数据)再输出inter中的数据
下一页 使counter+nor 不会>total
上一页 使counter-nor 不会<0
删除   用del存储已被删除的数据采购订单号(reduce)和counter(页数) 同时删除inter中的相同数据
增加   把增加时的total(数量)和订单号(add)保存到inter中
*/
//页数
let counter = 0;
//数据数
let total;
//行数
let nor=10;
let del = [];
let inter = [];
$(function () {
    $.getJSON("test.json",function (data) {
        total=parseInt(data[0].total);
        //alert(total+"...first执行")
    });
});
window.onload=function () {
    //获得行数
    $("#nor").change(function () {
        nor=parseInt($(this).val());
        //alert(nor+"...second执行");
        $('tr td').html('');
        Rendering();
    });

    //增加
    $("#add").click(function () {
        let add = prompt("请输入要增加的采购订单号");
        if (add !== null) {
            $.getJSON("test.json", function (data) {
                //判断要增加的数据是否存在
                $.each(data[0].rows, function (i, item) {
                    if (item.orderCode === add) {
                        alert(i + '增加成功');
                        total++;
                        //遍历del查询本页是否有被删除的数据
                        let dl=ergDel(counter);
                        //遍历inter查询本页是否有增加的数据
                        let inc=0;
                        for(let y=0;y<inter.length;y++){
                            if(inter[y][0]===counter){
                                inc++;
                            }
                        }
                        if(inc>=dl){
                        last();
                        }
                        inter.push([counter, add]);
                        if(inc<dl){
                            $('tr td').html('');
                            Rendering();
                        }
                    }
                })
            });
        }
    });

    //删减
    $("#reduce").click(function () {
        let reduce = prompt("请输入要删减的采购订单号");
        if (reduce !== null) {
            //判断要删除数据是否存在
            $.getJSON("test.json", function (data) {
                $.each(data[0].rows, function (i, item) {
                    if (item.orderCode === reduce) {
                        let inc=false;
                        //清除inter中的数据
                        for (let z = 0; z < inter.length; z++) {
                            //先判断本页是否有增加的相同数据
                            if(counter===inter[z][0]) {
                                if (reduce === inter[z][1]) {
                                    //有增加的数据 直接在inter中删除
                                    alert(inter.splice(z, 1) + '已被删除');
                                    total--;
                                    inc=true;
                                }
                            }
                        }

                        //本页没有增加的相同数据 把需删除数据加到del中
                        if(!inc){
                        del.push([counter, reduce]);
                        total--;
                        }
                            //渲染
                            $('tr td').html('');
                            Rendering();
                        return alert(i + '  删除成功');
                    }
                })
            });
        }
    });

    //遍历del,返回当前页面删除数据数量i
    function ergDel(counter){
        let i=0;
        for(let z=0;z<del.length;z++){
            if(del[z][0]===counter){
                i++;
            }
        }
        return i;
    }
    //用一个函数实现渲染
     function Rendering() {
         //清除多余的行
         $("tr:not(:first)").remove();
         //给表格添加行
         for(let x=0;x<nor;x++) {
             $("table").append("<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
         }
        $.getJSON("test.json", function (data) {
            let a = 1;
                $.each(data[0].rows, function (i, item) {
                    if (i < nor + counter && i >= counter) {
                        //函数一次遍历nor个数据 如果数据的orderCode=del中任意一个数据,则不输出这个数据 每次遍历数据都循环遍历一次del进行判断
                        let dl = true;
                        for (let k = 0; k < del.length; k++) {
                            if (counter === del[k][0]) {
                                if (item.orderCode === del[k][1]) {
                                    dl = false;
                                }
                            }
                        }
                        /*
                        let y=ergDel(counter);
                        if(y===nor){
                            next();
                        }
                        */
                        if (dl) {
                            $("table tr:eq(" + a + ") td:eq(0)").append(item.dataStatus);
                            $("table tr:eq(" + a + ") td:eq(1)").append(item.orderCode);
                            $("table tr:eq(" + a + ") td:eq(2)").append(item.supplierCode);
                            $("table tr:eq(" + a + ") td:eq(3)").append(item.supplierName);
                            $("table tr:eq(" + a + ") td:eq(4)").append(item.companyCodeAndName);
                            $("table tr:eq(" + a + ") td:eq(5)").append(item.purchaseGroupName);
                            $("table tr:eq(" + a + ") td:eq(6)").append(item.sapPoType);
                            $("table tr:eq(" + a + ") td:eq(7)").append(item.currencyCode);
                            $("table tr:eq(" + a + ") td:eq(8)").append(item.createDateStr);
                            a++;
                        }
                    }
                });
            for (let j = 0; j < inter.length; j++) {
                if (counter === (inter[j][0]-inter[j][0]%nor)) {
                    $.each(data[0].rows, function (i, item) {
                        if (inter[j][1] === item.orderCode) {
                            $("table tr:eq(" + a + ") td:eq(0)").append(inter[j][0]+":"+item.dataStatus);
                            $("table tr:eq(" + a + ") td:eq(1)").append(item.orderCode);
                            $("table tr:eq(" + a + ") td:eq(2)").append(item.supplierCode);
                            $("table tr:eq(" + a + ") td:eq(3)").append(item.supplierName);
                            $("table tr:eq(" + a + ") td:eq(4)").append(item.companyCodeAndName);
                            $("table tr:eq(" + a + ") td:eq(5)").append(item.purchaseGroupName);
                            $("table tr:eq(" + a + ") td:eq(6)").append(item.sapPoType);
                            $("table tr:eq(" + a + ") td:eq(7)").append(item.currencyCode);
                            $("table tr:eq(" + a + ") td:eq(8)").append(item.createDateStr);
                            a++;
                        }
                    })
                }
            }
            $("#foot span").empty().append("当前页:" + Math.ceil(counter / nor + 1) + "/总页数:" + Math.ceil(total / nor) + " 总行数:" + total);
        });
    }
    Rendering();

    //下一页
    function next() {
        counter += nor;
        //alert(counter);
        if (counter >= total) {
            counter -= nor;
            return alert("已到最后一页");
        }
        $('tr td').html('');
        Rendering();
    }
        $("#next").click(next);

    //上一页
    function page() {
        counter -= nor;
        //alert(counter);
        if (counter < 0) {
            counter = 0;
            return alert('这是第一页');
        }
        $('tr td').html('');
        Rendering();
    }
        $("#page").click(page);

    //跳到尾页
    function last(){
        counter=nor*Math.floor(total/nor);
        if(Math.ceil(counter / nor + 1)>Math.ceil(total / nor)){
            counter-=nor;
        }
        $('tr td').html('');
        Rendering();
    }
    $("#last").click(last);

    //跳到首页
    function first(){
        counter=0;
        $('tr td').html('');
        Rendering();
    }
    $("#first").click(first);
};
