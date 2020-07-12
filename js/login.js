$(() => {

    $(".tab-login-item").click(function() {
        /* (1) 设置当前标签的选中状态 */
        $(this).addClass("active").siblings().removeClass("active");
        /* (2) 切换显示对应的内容 */

        let index = $(this).index();
        $(".loginView").eq(index).addClass("loginViewCurrent").siblings().removeClass("loginViewCurrent");
    })

    /* 获取登录按钮，添加事件 */
    $("#loginBtn").click(function() {
        let username = $.trim($("#username-ID").val());
        let password = $.trim($("#password-ID").val());

        /* 先检查用户名和密码和是否勾选，都满足则发请求 */
        if (username.length == 0) {
            alert("用户名不能为空");
            return
        }

        if (password.length == 0) {
            alert("密码不能为空");
            return;
        }

        // if (!$("#protocol").is(":checked")) {
        //     alert("请阅读并同意用户协议");
        //     return;
        // }

        $.ajax({
            type: "post",
            url: "../php/login.php",
            dataType: "json",
            data: `username=${username}&password=${md5(password).slice(0,15)}`
        }).done(data => {
            // alert(data.msg);
            /* 如果 */
            if (data.status == "success") {
                alert(data.msg);
                /* 跳转 */
            } else {
                alert(data.msg);
            }
        })

    })

})