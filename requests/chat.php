<?php
header('Content-Type: application/json');
require_once('../assets/includes/core.php');

function getFakeUsersChat() {

	global $mysqli,$sm;

	$return = '';

	$time_now = time()-300;

	$timestamp = time();

	$dw = date( "w", $timestamp);

	$query = $mysqli->query("SELECT DISTINCT s_id,r_id FROM chat where fake = 1 and seen = 0 and online_day = '".$dw."' order by id DESC LIMIT 50");

	if ($query->num_rows > 0) { 

		$return .='   <tr>					

                      <th>Fake User</th>				  

                      <th>Real User</th>

                      <th>Last message</th>

                      <th>Time ago</th>					  

                      <th>Email</th>

                      <th>Credits</th>							  

                    </tr>';

		while($cre = $query->fetch_object()){

				getUserInfo($cre->s_id,6);

				getUserInfo($cre->r_id,1);				

				$onclick = $cre->r_id.",".$sm['search']['id'].",'".$sm['search']['name']."','".profilePhoto($cre->r_id)."'";

				$return .= ' <tr class="tr-fake" onclick="chat_user('.$onclick.');">

							  <td style="width:200px;padding:5px;"><a href="'.$sm['config']['site_url'].'profile/'.$cre->r_id.'/user"><div class="profile-photo" data-src="'.profilePhoto($cre->r_id).'" /></a> '.$sm['profile']['name'].','.$sm['profile']['age'].' ('.$sm['profile']['city'].','.$sm['profile']['country'].')</td>				  

							  <td style="width:200px"><div class="profile-photo" data-src="'.profilePhoto($cre->s_id).'"></div>'.$sm['search']['name'].','.$sm['search']['age'].' ('.$sm['search']['city'].', '.$sm['search']['country'].')

							  '; if($sm['search']['last_access'] >= $time_now) {

							  	$return .= ' <i class="fa fa-circle text-success" style="font-size:8px;"></i>';

							  }

							  $return .= '

							  </td>						  

							  <td>'.getLastMessageMobile($sm['search']['id'],$cre->r_id).'</td>

							  <td style="width:100px;padding:5px;">'.time_elapsed_string(getLastMessageMobileTime($sm['search']['id'],$cre->r_id)).'</td>

							  <td style="width:150px;padding:5px;">'.$sm['search']['email'].'</td>					  

							  <td style="width:50px;padding:5px;">'.$sm['search']['credits'].'</td>

							</tr>

							';				

		}

	} else {

		$return = '<h3>No new messages for any of your <b>ONLINE</b> fake users</h3>';	

	}

	return $return;			

}



switch ($_POST['action']) {

	case 'load':

		$uid = secureEncode($_POST['user']);

		getUserInfo($uid,3);

		$mysqli->query("UPDATE chat set seen = 1 where s_id = '".$sm['chat']['id']."' and r_id = '".$sm['user']['id']."'");

		$arr =array();

		$arr['id']=$sm['chat']['id'];

		$arr['name']=$sm['chat']['name'];

		$arr['chat'] = getChat($sm['user']['id'],$sm['chat']['id']);

		echo json_encode($arr);		

	break;		

	

	case 'send':

		$message = secureEncode($_POST['message']);

		$r_id = secureEncode($_POST['r_id']);

		$mobile = $_POST['mobile'];		

		$time = time();

		getUserInfo($r_id,1);

		$fake = $sm['profile']['fake'];

		$online_day = $sm['profile']['online_day'];		

		$mysqli->query("INSERT INTO chat (s_id,r_id,time,message,fake,online_day) VALUES ('".$sm['user']['id']."','".$r_id."','".$time."','".$message."','".$fake."','".$online_day."')");

		$arr = array();

		

		if($fake == 0){

			$sm['profile_notifications'] = userNotifications($sm['profile']['id']);

			if($sm['profile']['last_access']+300 >= time() && $sm['profile_notifications']['message'] == 1){

				chatMailNotification($r_id,$message);

			} 

		}

		$arr['message'] = cleanMessage($message);

		if($mobile == 1){

			$arr['chat'] = getLastChatMobile($sm['user']['id'],$r_id);

		} else {

			$arr['chat'] = getLastChat($sm['user']['id'],$r_id);	

		}

		echo json_encode($arr);			

	break;	

	

	case 'send_fake':

		$message = secureEncode($_POST['mensaje']);

		$r_id = secureEncode($_POST['uid2']);

		$s_id = secureEncode($_POST['uid1']);		

		$mobile = $_POST['mobile'];		

		$time = time();

		getUserInfo($r_id,1);

		$fake = $sm['profile']['fake'];

		$mysqli->query("INSERT INTO chat (s_id,r_id,time,message,fake) VALUES ('".$s_id."','".$r_id."','".$time."','".$message."','".$fake."')");

		$arr = array();

		

		if($fake == 0){

			$sm['profile_notifications'] = userNotifications($sm['profile']['id']);

			if($sm['profile']['last_access']+300 >= time() && $sm['profile_notifications']['message'] == 1){

				chatMailNotification($r_id,$message);

			} 

		}



		$arr['message'] = cleanMessage($message);

		if($mobile == 1){

			$arr['chat'] = getLastChatMobile($s_id,$r_id);

		} else {

			$arr['chat'] = getLastChat($s_id,$r_id);	

		}

		echo json_encode($arr);			

	break;

	

	case 'fake_list':

		echo getFakeUsersChat();

	break;	

	

	case 'load_fake':

	$u1 = $_POST['u1'];

	$u2 = $_POST['u2'];

	

	//Secure info

	$u1 = secureEncode($u1);	

	$u2 = secureEncode($u2);

	//Get all chats

	$chatt = $mysqli->query("SELECT * FROM chat where s_id = '".$u1."' and r_id = '".$u2."' OR r_id = '".$u1."' and s_id = '".$u2."' order by id asc");

	

	//Update chat to seen

	$mysqli->query("UPDATE chat set seen = 1 where s_id = '".$u2."' and r_id = '".$u1."'");

	if ($chatt->num_rows > 0) { 

		while($chat= $chatt->fetch_object()){

			//Get profile photo

			$mensaje = $chat->message;	

			//Check if current user is the sender

			if($chat->s_id == $u1){

				

				if($chat->seen == 1){

					echo'

					<li class="me">

						<div class="image">

							<img src="'.profilePhoto($chat->s_id).'"/>

						</div>

						<p> '.$mensaje.' </p>	

					</li> 

					';	

				} else {

					echo'

					<li class="me">

						<div class="image">

							<img src="'.profilePhoto($chat->s_id).'"/>

						</div>

						<p> '.$mensaje.' </p>	

					</li> 

					';							

				}	

			} else {

				echo'									

				<li class="you">

				<div class="image">

				<img src="'.profilePhoto($chat->s_id).'"/>

				</div>

				<p> '.$mensaje.' </p>	

				</li> 

				';					

			}										

		}		

	}	

	

	break;

	

	case 'current_fake':

		//GET POST INFO

		$u1 = secureEncode($_POST['u1']);	

		$u2 = secureEncode($_POST['u2']);

		

		//GET NEW MESSAGES

		$results = $mysqli->query("SELECT * FROM chat WHERE r_id = '".$u1."' AND s_id = '".$u2."' AND seen = 0  order by id asc");

		

		

		//CHECK IF CURRENT USER HAS NEW MESSAGE

		if($results->num_rows > 0){		

			while ($obj = $results->fetch_object()){

				

				//UPDATE MESSAGE AS SEEN

				$mysqli->query("UPDATE chat SET seen = 1 where r_id = '".$u1."' and s_id = '".$u2."'");

				

				//SHOW NEW MESSAGES

				echo'

				<li class="you">

					<div class="image">

						<img src="'.profilePhoto($obj->s_id).'"/>

					</div>

					<p> '.$obj->message.' </p>

				</li> 

				';		

			}

		}	

	break;

	

	case 'access':

		$time = time();		

		$access = secureEncode($_POST['access']);

		$r_id = secureEncode($_POST['r_id']);		

		if($access == 1) {

			$mysqli->query("INSERT INTO chat (s_id,r_id,time,message) VALUES 

											  ('".$sm['user']['id']."','".$r_id."','".$time."','".$sm['lang'][189]['text']."')");	

			$mysqli->query("UPDATE chat SET access = 2 WHERE s_id = '".$r_id."' AND r_id = '".$sm['user']['id']."' AND access = 1");

			$mysqli->query("INSERT INTO blocked_photos (u1,u2) VALUES ('".$r_id."','".$sm['user']['id']."')");	

		} else {

			$mysqli->query("INSERT INTO chat (s_id,r_id,time,message) VALUES

											  ('".$sm['user']['id']."','".$r_id."','".$time."','".$sm['lang'][190]['text']."')");	

			$mysqli->query("UPDATE chat SET access = 2 WHERE s_id = '".$r_id."' AND r_id = '".$sm['user']['id']."' AND access = 1");

		}

	break;		

	

	case 'current':

		$uid = secureEncode($_POST['uid']);

		$mob = secureEncode($_POST['mobile']);

		getUserInfo($uid,3);

		$arr = array();	

		$arr['result'] = 0;	

		$results = $mysqli->query("SELECT s_id,id,photo FROM chat WHERE r_id = '".$sm['user']['id']."' AND s_id = '".$uid."' AND seen = 0  order by id asc");

		if($results->num_rows > 0){

			$re = $results->fetch_object();

			$arr['result'] = 1;

			$arr['photo'] = $re->photo;

			if($mob == 1){

				$arr['chat'] = getLastChatMobile2($sm['user']['id'],$uid);

			} else {

				$arr['chat'] = getLastMessage($sm['user']['id'],$uid);	

			}

			$arr['message'] = cleanMessageById($re->id);			

			$mysqli->query("UPDATE chat set seen = 1 where r_id = '".$sm['user']['id']."' and s_id = '".$uid."'");				

		}

		echo json_encode($arr);			

	break;

	

	case 'notification':

		$user = secureEncode($_POST['user']);

		$time = time();			

		$mysqli->query("UPDATE users set last_access = '".$time."' where id = '".$sm['user']['id']."'");		

		$arr = array();	

		if($user == 0){

			$results = $mysqli->query("SELECT DISTINCT s_id FROM chat WHERE r_id = '".$sm['user']['id']."' AND seen = 0 AND notification = 0 order by id desc");

		} else {

			$results = $mysqli->query("SELECT DISTINCT s_id FROM chat WHERE r_id = '".$sm['user']['id']."' AND s_id <> '".$user."' AND seen = 0 AND notification = 0 order by id desc");			

		}

		if($results->num_rows > 0){		

			while($use = $results->fetch_object()){

				$arr[] = $use->s_id;	

			}		

			$mysqli->query("UPDATE chat set notification = 1 where r_id = '".$sm['user']['id']."'");				

		}

		echo json_encode($arr);			

	break;	

	

	case 'new':

		echo getUserFriends($sm['user']['id']);			

	break;	

	

	case 'today':

		$uid = secureEncode($sm['user']['id']);

		$time = time();

		$date = date('m/d/Y', time());

		$mysqli->query("INSERT INTO users_chat (uid,date,count,last_chat) VALUES ('".$uid."','".$date."',1,'".$time."') 

						ON DUPLICATE KEY UPDATE count=count+1");	

	break;	

	

	case 'chat_limit':

		$uid = secureEncode($sm['user']['id']);

		$date = date('m/d/Y', time());

		$mysqli->query("DELETE FROM users_chat WHERE uid = '".$uid."' AND date = '".$date."'");	

	break;		

}



//CLOSE DB CONNECTION

$mysqli->close();

