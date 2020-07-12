$(() => {
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

// let cartData = JSON.parse(localStorage.getItem("cartData")) || [];
// getTotal();

// function getTotal() {
//     let total = 0;
//     console.log("lll", cartData);
//     cartData.forEach(item => {
//         total += item.num;
//     })
//     $(".shopnum").text(total);
// }
/* 1、根据数据来渲染页面 */

    /* 2、根据商品数据来创建li标签渲染页面 */
    $.ajax({
        url: "./php/getList.php",
        dataType: "json",
    }).done(data => {

        let html = data.map(item => {
            return `<li class="yui3-u-1-5" data-id=${item.good_id}>
                <div class="p-img" style="padding-left: 30px;">
                    <a class="cdi_pic_lk" href="./item.html"><img class="J_goods_img cdi_img" src=${item.src}></a>                                    
                </div>
                <div class="attr">
                    <em class="cdi_name">${item.title}</em>
                </div>
                <div class="price"><strong><i>￥${item.price}</i></strong></div>
                <div class="sold"><span>已售87%</span><img src="./uploads/state_07.png" alt=""></div>
                <div class="operate">
                    加入购物车
                </div>  
              </li>`
        }).join("");
        $(".dbb").html(html);
    })


    /* 点击图片的时候进入商品详情页 */
$(".dbb").on("click", ".yui3-u-1-5", function () {
    let nidType = $(this).data().id;
    localStorage.setItem("good_nid", nidType);
})

// 加入购物车的点击事件
$(".dbb").on("click", ".operate", function() {
console.log("++")
    /* user_id user_name */
let user_id = localStorage.getItem("user_id") || "";
let user_name = localStorage.getItem("username") || "";
let good_id = localStorage.getItem("good_nid");

console.log(user_id, user_name);
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

/* 3、点击按钮的时候加入购物车 */
$("#cart").click(function() {
location.href = "./cart.html"
})




})