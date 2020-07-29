window.onload = function () {
    $("#btn").click(function () {
        $('#ff').form({
            onSubmit: function () {
                if ($("#ff").form('validate')) {
                    alert("check success");
                }
                // return false to prevent submit;
            },
            success: function (data) {
                alert("成功提交");
            }
        });
// submit the form
        $('#ff').submit();
    });

    $('#cc').combobox({
        url: 'try.json',
        valueField: 'id',
        textField: 'text'
    });
    $("#ca").combobox('setValue', 'cc');

    $("#n").numberbox({
        onChange: function () {
            var v = $("#n").numberbox('getValue');
            alert(v);
        }
    });

    $("#date").datebox('setValue', '6/1/2020');

    $("#sp").numberspinner({
        increment: 10,
        max: 100,
        min: 0,
        onChange: function () {
            var v = $("#sp").spinner('getValue');
            console.log("超过了" + v + "%的人");
        }
    });

    $('#time').timespinner({
        value: '9:00',
        max: '23:59:59',
        min: '8:30',
        showSeconds: true
    });

    $("#sd").slider({
        max: 100,
        min: 0,
        onSlideEnd: function () {
            if ($("#sd").slider('getValue') === 100) {
                console.log("到头了");
            }
        }
    });

    $("#fs").filebox({
        buttonText: '选择文件',
        multiple: true,
        separator: '|',
        accept:'.png'
    })
};