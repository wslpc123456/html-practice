window.onload=function () {
    $('#div').draggable({
        handle: '#test2',
        proxy: 'clone',
        revert: true,
        onDrag: function () {
            $(this).draggable('proxy').css('z-index', 10)
        }
    });

    $('.left .item').draggable({
        revert: true,
        proxy: 'clone'
    });

    $('.right td.drop').droppable({
        onDragEnter: function () {
            $(this).addClass('over');
        },
        onDragLeave: function () {
            $(this).removeClass('over');
        },
        onDrop: function (e, source) {
            $(this).removeClass('over');
            if ($(source).hasClass('assigned')) {
                $(this).append(source);
            } else {
                var c = $(source).clone().addClass('assigned');
                $(this).empty().append(c);
                c.draggable({
                    revert: true
                });
            }
        }
    });

    $("#div1").resizable({
        maxHeight: 150,
        maxWidth: 150
    });



    $("#me").menu('show',{
        inline:true,
        onClick:function (item) {
            alert(item.name + '..is onclick');
        }
    });
};