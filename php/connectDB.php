<?php
header("Content-Type: text/html;charset=utf-8");
$db = mysqli_connect("127.0.0.1", "root", "", "jindong");
mysqli_query($db,"SET NAMES utf8");

if (!$db) {
  die('连接错误: ' . mysqli_error($db));
}
?>