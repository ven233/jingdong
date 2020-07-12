$(() => {
    let good_id = localStorage.getItem("good_nid");
    $.ajax({
        url: "./php/item.php",
        data: { good_id },
        dataType: "json",
    }).done(data => {
    
        let html = data.map(item => {
            return `<div class="product-info">
                    <div class="fl preview-wrap">
                        <!--放大镜效果-->
                        <div class="zoom">
                            <!--默认第一个预览-->
                            <div id="preview" class="spec-preview">
                                <img class="xzoom" xoriginal="uploads/b1.png" src="${item.src}" width="100%">
                            </div>
                            <!--下方的缩略图-->
                            <div class="spec-scroll left">
                                <a href="uploads/b1.png"><img class="xzoom-gallery" src="${item.src}" width="60"></a>
                                <a href="uploads/b2.png"><img class="xzoom-gallery" src="" width="60"></a>
                                <a href="uploads/b3.png"><img class="xzoom-gallery" src="" width="60"></a>
                                <a href="uploads/b1.png"><img class="xzoom-gallery" src="" width="60"></a>
                                <a href="uploads/b2.png"><img class="xzoom-gallery" src="" width="60"></a>
                                <span class="prev"></span>
                                <span class="next"></span>
                            </div>
                        </div>
                    </div>
                    <div class="fr itemInfo-wrap">
                    <div class="sku-name">
                        <h4>${item.title}</h4>
                    </div>
                    <div class="summary">
                        <div class="summary-wrap">
                            <div class="fl title"><i>价　　格</i></div>
                            <div class="fl price"><i>¥</i><em>${item.price}</em> <s>降价通知</s></div>
                            <div class="fr remark"><i>累计评价</i><em>612188</em></div>
                        </div>
                        <div class="summary-wrap">
                            <div class="fl title"><i>促　　销</i></div>
                            <div class="fl price"><span>加价购</span>满999.00另加20.00元，或满1999.00另加30.00元，或满2999.00另加40.00元，<br/>即可在购物车换购热销商品 <a href="#">详情》</a></div>
                        </div>
                    </div>
                    <div class="support">
                                <div class="summary-wrap">
                                    <div class="fl title"><i>支　　持</i></div>
                                    <div class="fl fix-width"><em class="t-gray">以旧换新，闲置手机回收 4G套餐超值抢 礼品购</em></div>
                                </div>
                                <div class="summary-wrap">
                                    <div class="fl title"><i>配 送 至</i></div>
                                    <div class="fl fix-width"><em class="t-gray">北京海淀区中关<i class="iconfont"></i>有货    支持  99元免运费 |货到付款 |211限时达   </em></div>
                                    <div class="fl express"><em class="t-gray">由自营发货，并提供售后服务。11:00前完成下单，预计<strong>今天（08月10日）送达</strong></em></div>
                                </div>
                            </div>
                            <div class="clearfix choose">
                                <div id="specification" class="summary-wrap clearfix">
                                    <dl>
                                        <dt class="fl title"><i>选择颜色</i></dt>
                                        <dd>
                                            <a href="#" class="selected">金色</a>
                                            <a href="#">银色</a>
                                            <a href="#">黑色</a>
                                            <a href="#">玫瑰金</a>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt class="fl title"><i>选择版本</i></dt>
                                        <dd>
                                            <a href="#" class="selected">公开版</a>
                                            <a href="#">移动4G</a>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt class="fl title"><i>内存容量</i></dt>
                                        <dd>
                                            <a href="#" class="selected">16G</a>
                                            <a href="#">64G</a>
                                            <a href="#">128G</a>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt class="fl title"><i>购买方式</i></dt>
                                        <dd>
                                            <a href="#" class="selected">官方标配</a>
                                            <a href="#">移动优惠购</a>
                                            <a href="#">电信优惠购</a>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt class="fl title"><i>套　　装</i></dt>
                                        <dd>
                                            <a href="#" class="selected">保护套装</a>
                                            <a href="#">充电套装</a>
                                        </dd>
                                    </dl>
                                </div>
    
                                <div class="summary-wrap">
                                    <div class="controls">
                                        <input autocomplete="off" type="text" value="1" minnum="1" class="itxt">
                                        <a href="#" class="increment plus">+</a>
                                        <a href="#" class="increment mins">-</a>
                                    </div>
                                    <a class="sui-btn  btn-danger addshopcar">加入购物车</a>
                                </div> 
                </div>`
        }).join("");
        $(".product-info").html(html);
    })
    

    // 检测是否登录
    let user_id = localStorage.getItem("user_id") || "";
    let user_name = localStorage.getItem("username") || "";
    console.log(user_id, user_name);
    if (user_id && user_name) {
    $(".userInfo").text(`${user_name}:京东欢迎您！`);
    $(".status").text("注销");
    } else {
    $(".userInfo").text(`匿名用户:京东欢迎您！`);
    $(".status").text("登录");
    }

    $(".status").click(function() {
    if ($(this).text() == "登录") {
        location.href = "../login.html";
    } else {
        localStorage.removeItem("user_id")
        localStorage.removeItem("username");
        /* 重新加载 */
        window.location.reload();
    }
    })


    // 加入购物车的点击事件
    $(".product-info").on("click", ".addshopcar", function() {
    console.log("++")
        /* user_id user_name */
    let user_id = localStorage.getItem("user_id") || "";
    let user_name = localStorage.getItem("username") || "";

    console.log(user_id, user_name, good_id);
    if (user_id && user_name) {
        /* 发请求，执行添加到购物车 */
        $.ajax({
            url: "./php/addCart.php",
            data: { user_id, good_id }
        }).done(data => {
            console.log("返回值:", data);
        })

    } else {
        /* 跳转去登录 */
        location.href = "./login.html"
    }
    })
    
    })