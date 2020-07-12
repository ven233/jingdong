<?php
$db = mysqli_connect("127.0.0.1", "root", "", "jindong");

$username = $_REQUEST["username"];
$password = $_REQUEST["password"];
$phone    = $_REQUEST["phone"];
$sql = "SELECT * FROM user WHERE username='$username'";
$result = mysqli_query($db,$sql);

if(mysqli_num_rows($result) == 0)
{
  $sql = "INSERT INTO `user` (`user_id`, `username`, `password`, `phone`, `user_date`) VALUES (NULL, '$username', '$password', '$phone', '2020-06-24')";
  $result = mysqli_query($db, $sql);
  $arr = array("status"=>"success","msg"=> "恭喜你，注册成功！");
  echo json_encode($arr);
}else{
  echo '{"status":"error","msg":"抱歉，该用户名已经被注册，请重新选择一个更优秀的名字！！"}';
}

?>