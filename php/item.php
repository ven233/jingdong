<?php
$db = mysqli_connect("127.0.0.1", "root", "", "jindong");

$good_id = $_REQUEST["good_id"];
mysqli_query($db,"SET NAMES utf8");
/* 多表查询 */
$sql = "SELECT * FROM goods WHERE good_id=$good_id";

$result = mysqli_query($db,$sql);

$data = mysqli_fetch_all($result,MYSQLI_ASSOC);

echo json_encode($data,true);
?>
