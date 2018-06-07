<?php
require_once("../includes/core.php");
header("Access-Control-Allow-Origin: *");
require_once 'S3.php';

function sendPhoto($base64img,$uid,$rid){
    $base64img = str_replace('data:image/jpeg;base64,', '', $base64img);
    $data = base64_decode($base64img);
	$time = time();
    $file = 'uploads/'.$uid.$time.'.jpg';
    $photo = $sm['config']['site_url'].'/assets/sources/'.$file;
    file_put_contents($file, $data);
	$mysqli->query("INSERT INTO chat (s_id,r_id,time,message,photo) VALUES ('".$uid."','".$rid."','".$time."','".$photo."' , 1)");	
}
function regImage($base64img,$uid){
    $base64img = str_replace('data:image/jpeg;base64,', '', $base64img);
    $data = base64_decode($base64img);
	$time = time();
    $file = 'uploads/'.$uid.'.jpg';
    file_put_contents($file, $data);
}
function uploadImage($base64img,$uid){
	global $mysqli,$sm;
	$arr = array();
    $base64img = str_replace('data:image/jpeg;base64,', '', $base64img);
    $data = base64_decode($base64img);
	$time = time();
	$file = 'uploads/'.$time.'.jpg';
	$iurl = $sm['config']['site_url'].'/assets/sources/'.$file;
    file_put_contents($file, $data);
	$mysqli->query("INSERT INTO users_photos(u_id,photo,thumb,approved,private)
														   VALUES ('$uid','$iurl', '$iurl','".$sm['config']['photo_review']."','$iurl')");													   
	$arr['user']['photos'] = userAppPhotos($uid);
	echo json_encode($arr);
}

switch ($_POST['action']) {
	case 'register':
		regImage($_POST['base64'],$_POST['uid']);
	break;
	case 'upload':
		uploadImage($_POST['base64'],$_POST['uid']);
	break;
	case 'sendChat':
		sendPhoto($_POST['base64'],$_POST['uid'],$_POST['rid']);
	break;	
}

