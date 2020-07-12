/* 监听页面的加载，等页面加载完再执行js代码 */
$(() => {

    $("#phoneID").val(13926291888);
    $("#usernameID").val("zs");
    $("#passwordA").val(123);
    $("#passwordB").val(123);

    let imgCode;
    /*不传值，统一走默认值*/
    // let captcha = new Captcha({
    //     lineWidth: 1, //线条宽度
    //     lineNum: 2, //线条数量
    //     // dotR: 200, //点的半径
    //     // dotNum: 1000, //点的数量
    //     preGroundColor: [10, 80], //前景色区间
    //     backGroundColor: [150, 250], //背景色区间
    //     fontSize: 40, //字体大小
    //     fontFamily: ['Georgia', '微软雅黑', 'Helvetica', 'Arial'], //字体类型
    //     fontStyle: 'stroke', //字体绘制方法，有fill和stroke
    //     content: '0123456789', //验证码内容
    //     length: 4 //验证码长度
    // });

    // captcha.draw(document.querySelector('#captcha'), r => {
    //     console.log('验证码', r);
    //     imgCode = r;

        /* 自动触发标签的事件 */
    //     $("#imageCode").trigger("blur");
    // });

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
    $(".info input").blur(function() {
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
            phone: $.trim($("#phoneID").val()),
            password: md5($.trim($("#passwordA").val())).slice(0, 15)
        }
        console.log(data);
        /* [3] 发送网络请求去执行注册 */
        $.ajax({
            url: "../php/res.php",
            type: "post",
            data,
            dataType: "json",
        }).done(data => {
            if (data.status == "success") {
                alert("注册成功!");
                // location.href = "http://www.baidu.com";
            } else {
                alert(data.msg);
            }
        })
    });

    /* 用户A：密码12345   明文12345QQ */
    /* 用户B：密码loveIt  明文loveItQQ */

    /* 密码：12345QQ     明文：12345QQ */
    /* 密码：loveItQQ    明文：12345QQ */
    /* md5加密 */
    // console.log(md5("loveIt"), md5("loveIt").slice(0, 10));
});


/* 数据安全相关： */
/* (1) 如果我们发送网络请求需要提交敏感数据给服务器端，那么应该使用POST请求 */
/* (2) 再多做一层安全措施 */
/*     [1] HTTPS   花钱  */
/*     [2] 加密 */

/* 加密方案: */
/* [1] Base64 编码(解码)方案，把所有的数据(视频|文本|图片)都转换为字符串 */
/* http://wendingding.com/2019/02/08/%E6%95%B0%E6%8D%AE%E5%AE%89%E5%85%A8%E7%B3%BB%E5%88%97%20Base64/ */
/* [2] 单向散列(消息摘要算法|哈希)函数
    经典算法：MD4 MD5    SHA SHA256 SHA512   
    特点：
        (1) 加密的过程是不可逆的。  可以加密，不能解密
        (2) 明文相同，密文一定相同
        (3) 明文不同，密文一定不同
        (4) 加密速度快，效率高
    应用：注册和登录
 */
/* [3] 对称加密算法 
    经典算法：DES 3DES AES(高级数据加密标准)
*/

/* [4] 非对称加密算法 */
/* 经典算法：RSA */

/* MD5加密也并不是特别的安全 */
/* 开发的策略： */
/* (0) 单次MD5   60 */
/* (1) 多次MD5   65 */
/* (2) MD5+salt  80*/
/* (3) MD5+salt+截取 */
/* (4) 单次MD5+截取 */

/* 注意点：使用MD5类似方案加密的数据是不可逆的，是不可找回的。 */