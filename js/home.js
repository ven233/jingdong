/* 1、监听页面加载，等页面加载就发网络请求获取商品数据 */
$(() => {

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
    
        $.getJSON("./banna.json", (data) => {
        (new Banner(data)).init()
    })
    
    
        let oUl = document.querySelector(".chaoshi_category_ul");
        /* 2、根据商品数据来创建li标签渲染页面 */
        $.ajax({
            url: "./php/home.php",
            dataType: "json",
        }).done(data => {
        
            let html = data.map(item => {
                return `<li class="J_goods_item chaoshi_discount_item cdi" data-id=${item.good_id}>
                    <div class="cdi_pic">
                        <a class="cdi_pic_lk" href="./item.html"><img class="J_goods_img cdi_img" src=${item.src}></a>
                        <p class="cdi_name">${item.title}</p>
                    </div>
                    <p class="class="cdi_price clearfix"><span class="J_goods_price cdi_price_new">￥${item.price}</span></p> 
                    <a class="J_goods_add cdi_add" ><i class="cdi_add_icon"></i></a>  
                  </li>`
            }).join("");
            oUl.innerHTML = html;
        })
    
        $(".chaoshi_category_ul").on("click", ".J_goods_item", function () {
            let nidType = $(this).data().id;
            localStorage.setItem("good_nid", nidType);
        })
    
        // 加入购物车的点击事件
    $(".chaoshi_category_ul").on("click", ".J_goods_add", function() {
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
            // location.href = "./login.html"
        }
    })
    
        /* 3、点击按钮的时候进入购物车 */
        $(".toolbar-tab").click(function() {
            location.href = "./cart.html"
        })
        
        
    
    
    })