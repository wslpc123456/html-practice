//渲染函数Rendering 先输出inter中的数据 再输出 counter 到 counter+10 的数据(经过判断不会输出del中的数据)
//下一页 使counter+10 不会>total
//上一页 使counter-10 不会<0
//删除   用del存储已被删除的数据采购订单号(reduce)和counter 同时删除inter中的相同数据
//增加   把增加时的counter(页数)和订单号(add)保存到inter中
let counter = 0;
let total = 73;
let del = [];
let inter = [];
$(function () {
    //增加
    $("#add").click(function () {
        let add = prompt("请输入要增加的采购订单号");
        if (add !== null) {
            //通过遍历当前页每一行第二列判断数据是否重复
            let j=0;
            $("tr").each(function (i) {
                $(this).children("td:eq(1)").each(function () {
                    j++;
                    if ($(this).text() === add) {
                        add = null;
                        alert('该订单号已存在');
                    }
                    if(j===10){
                        add=null;
                        alert('表格已满')
                    }
                })
            });
            $.getJSON("test.json", function (data) {
                //判断要增加的数据是否存在
                $.each(data[0].rows, function (i, item) {
                    if (item.orderCode === add) {
                        inter.push([counter, add]);
                        alert(i + '增加成功');
                    }
                })
            });
            //清除数据 刷新页面
            $('tr td').html('');
            Rendering();
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
                        del.push([counter, reduce]);
                        //清除inter中的数据
                        for (let z = 0; z < inter.length; j++) {
                            if (reduce === inter[z][1]) {
                                alert(inter.splice(z, 1) + '已被删除');
                            }
                        }
                        return alert(i + '  删除成功');
                    }
                })
            });
        }
        $('tr td').html('');
        Rendering();
    });

    //用一个函数实现渲染
    function Rendering() {
        $.getJSON("test.json", function (data) {
            let a = 1;
            for (let j = 0; j < inter.length; j++) {
                //判断:本页面是否存在增加的数据 存在:输出item.order=inter[j][1]的item的属性() 不存在:跳过
                //判断存在增加的数据以后 在对数据库(json)进行遍历 输出其中item.order=inter[j][1]的项的属性
                // 这样可以避免 只进行一次遍历无法处理orderCode顺序颠倒的问题
                if (counter === inter[j][0]) {
                    $.each(data[0].rows, function (i, item) {
                        if (inter[j][1] === item.orderCode) {
                            $("table tr:eq(" + a + ") td:eq(0)").append('<input type="checkbox" class="dataStatus" >供应商已回复');
                            if (item.dataStatus === "供应商已回复") {
                                $("table tr:eq(" + a + ") td:eq(0) input").attr("checked", "checked");
                            }
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
            $.each(data[0].rows, function (i, item) {
                if (i < 10 + counter && i >= counter) {
                    //函数一次遍历10个数据 如果数据的orderCode=del中任意一个数据,则不输出这个数据 每次遍历数据都循环遍历一次del进行判断
                    let dl = true;
                    for (let k = 0; k < del.length; k++) {
                        if (counter === del[k][0]) {
                            if (item.orderCode === del[k][1]) {
                                dl = false;
                            }
                        }
                    }
                    if (dl) {
                        $("table tr:eq(" + a + ") td:eq(0)").append('<input type="checkbox" class="dataStatus" >供应商已回复');
                        if (item.dataStatus === "供应商已回复") {
                            $("table tr:eq(" + a + ") td:eq(0) input").attr("checked", "checked");
                        }
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
            total = data[0].total;
        });
        $("#foot span").empty().append("当前页:" + Math.ceil(counter / 10 + 1) + "/总页数:" + Math.ceil(total / 10) + " 总行数:" + total);
    }

    Rendering();

    //下一页
    $("#next").click(function () {
        counter += 10;
        //alert(counter);
        if (counter > total) {
            counter -= 10;
            return alert("已到最后一页");
        }
        $('tr td').html('');
        Rendering();
    });

    //上一页
    $("#page").click(function () {
        counter -= 10;
        //alert(counter);
        if (counter < 0) {
            counter = 0;
            return alert('这是第一页');
        }
        $('tr td').html('');
        Rendering();
    })
});
