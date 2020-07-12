/* 监听页面的加载，等页面加载完再执行js代码 */
$(() => {

    $("#phoneID").val(13926291888);
    $("#usernameID").val("zs");
    $("#passwordA").val(123);
    $("#passwordB").val(123);
    
    
    
    // (1) 正则校验
    // (2) 事件处理(表单)
    // (3) 图形验证码
    /* 思路：给输入框添加事件(失去焦点)监听，当失去焦点的时候，应该获取输入框的内容进行正则校验 */
    let options = {
        "usernameID": {
            reg: `/^[a-zA-Z]{2,6}$/.test(val)`,
            msg: "用户名不符合规范!!!"
        },
        "phoneID": {
            reg: `/^1[3-9]\\d{9}$/.test(val)`,
            msg: "手机号码不符合规范!!!"
        },
        "passwordA": {
            reg: `/^[a-zA-Z0-9]{3,6}$/.test(val)`,
            msg: "密码不符合规范!!!"
        },
        "passwordB": {
            reg: `$.trim($("#passwordA").val()) === val`,
            msg: "两次输入的密码不相同!!!"
        },
        // "imageCode": {
        //     reg: "val == imgCode",
        //     msg: "图形验证码不正确！！！"
        // }
    }
    $(".sui-form input").blur(function() {
        let option_id = this.id;
        console.log("option_id", options[option_id]);
    
        let val = $.trim($(this).val());
    
        if (eval(options[option_id].reg)) {
            $(this).next().text("");
            $(this).parents(".control-group").removeClass("form-group-error");
        } else {
            $(this).next().text(options[option_id].msg);
            $(this).parents(".control-group").addClass("form-group-error");
        }
    })
    
    // (4) 注册功能(获取参数并且发送网络请求， 在服务器端进行处理)
    $("#registerBtn").click(function() {
        console.log("click");
        /* [1] 检查表单验证是否全部都通过，如果有一个没有通过那么就return  */
        $("#phoneID,#usernameID,#passwordA,#passwordB").trigger("blur");
    
        if ($(".form-group-error").length != 0) {
            return;
        }
        
        /* [2] 检查是否勾选 */
        // let isCheck = $("#protocol").is(":checked");
        // if (!isCheck) {
        //     alert("请阅读并同意用户的注册协议!!!");
        //     return;
        // }
        let data = {
            username: $.trim($("#usernameID").val()),
            password: $.trim($("#passwordA").val()),
            phone: $.trim($("#phoneID").val())
        }
        console.log(data);
        /* [3] 发送网络请求去执行注册 */
        $.ajax({
                data,
                type: "get",
                dataType: "json",
                url: "./php/res.php",
                success(response) {
                    if (response.status == "success") {
                        alert(response.msg);
                        window.location.href = "./login.html";
                    } else {
                        alert(response.msg);
                    }
                }
            })
    });
    
    /* 用户A：密码12345   明文12345QQ */
    /* 用户B：密码loveIt  明文loveItQQ */
    
    /* 密码：12345QQ     明文：12345QQ */
    /* 密码：loveItQQ    明文：12345QQ */
    /* md5加密 */
    // console.log(md5("loveIt"), md5("loveIt").slice(0, 10));
    })
