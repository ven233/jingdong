$(() => {

    /* 登录状态的处理 */
    /* 检查本地是否保存user_id和user_name的值，如果本地有，那么表示当前是登录状态 */
    /* 如果没有，那么表示当前是未登录的状态 */
    let user_id = localStorage.getItem("user_id") || "";
    let user_name = localStorage.getItem("username") || "";
  
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


    let oUl = document.querySelector(".cart-item-list");
    /* 2、根据商品数据来创建li标签渲染页面 */
    let user_id = localStorage.getItem("user_id") || "";
    $.ajax({
        url: "./php/getCart.php",
        data: { user_id },
        dataType: "json"
    }).done(data => {
    
        let html = data.map(item => {
            return `<div class="cart-body">
            <div class="cart-list">
            <ul class="goods-list yui3-g">
                <li class="cdi_pic">
                    <input type="checkbox" class="good-checkbox">
                    <div class="good-item">
                        <div class="item-img">
                            <img src=${item.src}>
                        </div>
                        <div class="item-msg" style="letter-spacing: .21em;">${item.title}</div>               
                </li>
                <li class="yui3-u-1-8">
                    <span class="price">￥${item.price}</span>
                </li>
                <li class="yui3-u-1-8">
                    <div class="clearfix">
                        <a href="#" class="increment mins">-</a>
                        <input autocomplete="off" type="text" value="${item.num}" minnum="1" class="itxt">
                        <a href="#" class="increment plus">+</a>
                    </div>
                    <div class="youhuo">有货</div>
                </li>
                <li class="yui3-u-1-8">
                    <span class="sum">￥${item.price*item.num*1}</span>
                </li>
                <li class="yui3-u-1-8">
                    <div><a href="#none">删除</a></div>
                    <div>移到我的关注</div>
                </li>           
            </ul>
            </div>
            </div>`
        }).join("");
        oUl.innerHTML = html;
    })


})