
$(function () {

    $("#sb").splitbutton({
        iconCls:'icon-ok',
        menu:'#menu'
    });

    $("#x").panel({
        width:300,
        height:200,
        tools:[{iconCls:'icon-save',handler:function () {
                alert("save");
            }},{iconCls:'icon-add',handler:function () {
                alert("add");
            }}],
        onBeforeOpen:function () {
            alert("loading...")
        }
    });

    $("#tab").tabs({
        onClose:function () {
            alert("正在关闭选项卡");
        },
        onAdd:function () {
            alert("正在添加选项卡")
        },
        tools:'#tab-tools'
    });

    $("#tab").tabs('add',{
        title:"panel 4",
        content:"4",
        closable:true,
        tools:[{iconCls:'icon-mini-refresh',handler:function () {
                alert('refresh');
            }}],
    });

    $("#vl").progressbar({
       value:1
    });

for(let i=0;i<5;i++) {
    setTimeout(function () {
        let v = $("#vl").progressbar('getValue');
        v += Math.floor(Math.random() * 10);
        if (v < 100) {
            $("#vl").progressbar('setValue', v);
        }
    }, 1000);
}

});

