//文档就绪函数
$(function () {
    layui.use(['layer', 'form'], function(){
        var layer = layui.layer
            ,form = layui.form;

    });
    //注意：导航 依赖 element 模块，否则无法进行功能性操作
    layui.use('element', function(){
        var element = layui.element;

        //…
    });
});
