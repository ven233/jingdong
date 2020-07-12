<?php

/* 1、连接数据库 */
$db = mysqli_connect("127.0.0.1", "root", "", "jindong");
mysqli_query($db,"SET NAMES utf8");

/* 2、查询获取数据库中的所有商品 */
$sql = "SELECT * FROM goods";

$result = mysqli_query($db,$sql);
$data = mysqli_fetch_all($result,MYSQLI_ASSOC);

/* 3、把数据转换为JSON数据返回 */
echo json_encode($data,true);
?>