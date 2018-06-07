<?php
require_once('../assets/includes/core.php');
require_once('../assets/includes/custom/tinelo_core.php');

//$url = "https://wwww.lemoncat/tinelo/clients/ai.php";
$time_now = time()-300;
$timestamp = time();
$dw = date( "w", $timestamp);

$query = $mysqli->query("SELECT DISTINCT s_id,r_id FROM chat where fake = 1 and seen = 0 and online_day = '".$dw."' order by id DESC");
if ($query->num_rows > 0) { 
	while($cre = $query->fetch_object()){
			getUserInfo($cre->s_id,1);
			$m = getLastMessageMobile($cre->s_id,$cre->r_id);
			$r_id = secureEncode($cre->s_id);
			$s_id = secureEncode($cre->r_id);		
			$time = time();
			$fake = $sm['profile']['fake'];
			$mysqli->query("UPDATE chat set seen = 1 where s_id = '".$r_id."' and r_id = '".$s_id."'");
			$input = rawurlencode ($m);
			$message = file_get_contents("$url?id=".siteConfig('client')."&input=$input");		
			$mysqli->query("INSERT INTO chat (s_id,r_id,time,message,fake) VALUES ('".$s_id."','".$r_id."','".$time."','".$message."','".$fake."')");
			$arr = array();
			if($fake == 0){
				$sm['profile_notifications'] = userNotifications($sm['profile']['id']);
				if($sm['profile']['last_access']+300 >= time() && $sm['profile_notifications']['message'] == 1){
					chatMailNotification($r_id,$message);
				} 
			}						
	}
}
