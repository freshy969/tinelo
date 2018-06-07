<?php
function getSearchUserInfo($uid) {
	global $mysqli,$sm;
	$uid = secureEncode($uid);
	$user = $mysqli->query("SELECT id,name,city,country,online_day,age,fake,gender FROM users WHERE id = '".$uid."'");
	$u = $user->fetch_object();	
	$first_name = explode(' ',trim($u->name));	
	$first_name = explode('_',trim($first_name[0]));
	//CURENT USER
	$current_user['id'] = $u->id;
	$current_user['first_name'] = $first_name[0];
	$current_user['name'] = $u->name;	
	$current_user['profile_photo'] = profilePhoto($u->id);
	$current_user['city'] = $u->city;
	$current_user['country'] = $u->country;	
	$current_user['age'] = $u->age;
	$current_user['gender'] = $u->gender;	
	$current_user['link'] = clean($first_name[0]);		
	$current_user['fake'] = $u->fake;
	$current_user['online_day'] = $u->online_day;			
	$sm['search'] = $current_user;	
}

function meetFilterTwoo($uid,$lang,$looking,$age,$radius,$status=0,$l=0){

	global $mysqli,$sm;

	$search = '';
	$i = 0;
	$time_now = time()-300;
	$lat = $sm['user']['lat'];
	$lng = $sm['user']['lng'];
	$today = date('w');
	$limit = $l * 24;
	$ages = $age;
	$e_age = explode( ',', $age );
	$age2 = $e_age[1];
	$age1 = $e_age[0];
	if($status == 0){
		$status_filter = "";	
	} else {
		$time_now = time()-300;
		if($looking == 3) {
		$status_filter = "AND last_access >=".$time_now." OR fake = 1 AND id <> '".$sm['user']['id']."' AND online_day = ".$today." AND age BETWEEN '".$age1."' AND '".$age2."'";			
		} else {
		$status_filter = "AND last_access >=".$time_now." OR fake = 1 AND id <> '".$sm['user']['id']."' AND  online_day = ".$today." AND age BETWEEN '".$age1."' AND '".$age2."' AND gender = '".$looking."'";			
		}

	}	


	$country_filter = '';

	if($radius == 1000){

		$country_filter = "AND country = '".$sm['user']['country']."'";			

	}

	if($radius == 100){

		$country_filter = "AND city = '".$sm['user']['city']."' AND country = '".$sm['user']['country']."'";			

	}	



	if($looking == 3) {

		$query = "SELECT id, ( 6371 * acos( cos( radians($lat) ) * cos( radians( lat ) )
		* cos( radians( lng ) - radians($lng) ) + sin( radians($lat) ) * sin( radians( lat ) ) ) ) AS distance 
		FROM users
		WHERE age BETWEEN '".$age1."' AND '".$age2."'	
		$status_filter	
		HAVING distance < $radius
		ORDER BY distance ASC ,last_access desc
		LIMIT ".$limit.", 24";	

		$query2 = "SELECT id, ( 6371 * acos( cos( radians($lat) ) * cos( radians( lat ) )
		* cos( radians( lng ) - radians($lng) ) + sin( radians($lat) ) * sin( radians( lat ) ) ) ) AS distance 
		FROM users
		WHERE age BETWEEN '".$age1."' AND '".$age2."'	
		$status_filter	
		HAVING distance < $radius
		ORDER BY last_access";			

	} else {
		$query = "SELECT id, ( 6371 * acos( cos( radians($lat) ) * cos( radians( lat ) )
		* cos( radians( lng ) - radians($lng) ) + sin( radians($lat) ) * sin( radians( lat ) ) ) ) AS distance 
		FROM users
		WHERE gender = '".$looking."'
		AND age BETWEEN '".$age1."' AND '".$age2."'
		$status_filter	
		HAVING distance < $radius
		ORDER BY distance ASC ,last_access desc
		LIMIT ".$limit.", 24";	

		$query2 = "SELECT id, ( 6371 * acos( cos( radians($lat) ) * cos( radians( lat ) )
		* cos( radians( lng ) - radians($lng) ) + sin( radians($lat) ) * sin( radians( lat ) ) ) ) AS distance 
		FROM users
		WHERE gender = '".$looking."'
		AND age BETWEEN '".$age1."' AND '".$age2."'
		$status_filter	
		HAVING distance < $radius
		ORDER BY last_access";			
	}

	$result = $mysqli->query($query);

	$result2 = $mysqli->query($query2);

	$sm['meet_result'] = $result2->num_rows;
	if ($result->num_rows > 0) {

		while($row = $result->fetch_object()){

			getSearchUserInfo($row->id);

			$i++;		
			if($i == 13){
				if($sm['user']['premium'] == 0 && siteConfig('ads') != ''){
					$search.= '<div data-ad="1" style="position:relative;width:100%;height:180px;top:100px;">'. siteConfig('ads') .'</div>';
				}
			}
			if ($i % 2 == 0) {

				$search.='<div class="search search-margin" data-search-show="'.$i.'">';

			} else {

				$search.='<div class="search" data-search-show="'.$i.'">';

			}	

			if(empty($sm['search']['city'])){

				$city = $sm['search']['country'];

			} else {
				$city = $sm['search']['city'];
			}

			$search.='
                        <div class="like-top-left"><span class="tooltip-toggle" aria-label="'.$city.'" tabindex="0"><i class="material-icons">location_on</i></span></div>

                        <a href="'.$sm['config']['site_url'].'profile/'.$sm['search']['id'].'/'.$sm['search']['link'].'" onClick="event.preventDefault();goToProfile('.$sm['search']['id'].')">

                            <div class="profile-photo" data-back-photo="1" data-src="'.$sm['search']['profile_photo'].'" ></div>

                        </a>

						<div class="name">';

						if($sm['search']['last_access'] >= $time_now || $sm['search']['fake'] == 1 && $sm['search']['online_day'] == $today){

							$search.='<h1>

								<a href="'.$sm['config']['site_url'].'profile/'.$sm['search']['id'].'/'.$sm['search']['link'].'"  onClick="event.preventDefault();goToProfile('.$sm['search']['id'].')">

								<b>'.$sm['search']['first_name'].'</b> , '.$sm['search']['age'].'

								</a><div class="online" style="width:8px;height:8px"></div>

							</h1>';

						} else {	

							$search.='<h1>

								<a href="#" onClick="goToProfile('.$sm['search']['id'].')">

								<b>'.$sm['search']['first_name'].'</b> , '.$sm['search']['age'].'

								</a>

							</h1>';							

						}

						$search.='

						</div>

					</div>';

		}

	} else {

		$search.= '<center style="padding-top:65px;" id="end-of-result"><h2 style="color:#666666;font-size:17px"><i class="material-icons" style="font-size:22px;">search</i> '.$sm['twoo_lang'][158]['text'].' <a href="javascript:;" onClick="openMeetFilter(); return false;">'.$sm['twoo_lang'][159]['text'].'</a></h2></center>';

	}
	updateUserFilter($looking,$ages,$radius,$uid);	

	$sm['meet_result'] = $sm['meet_result'] - $limit;

	//$search.= 'total: '.$sm['meet_result'].'<br>';

	if($sm['meet_result'] >= 1){

		$totalPages = 1;

	} else {

		$totalPages = 0;

	}

	$totalp = $totalPages-1;

	$limitp = $l+1;

	if($totalp >=0 ){

		$search.= '<script>meet_pages = '.$totalp.';meet_limit = '.$limitp.'</script>';

	} else {

		$search.= '<script>meet_pages = '.$totalp.';</script>';

	}

	//$search.='<center><nav><ul class="pagination pagination-lg"">';

	for ($i=$l; $i<=$totalp; $i++) { 

		$d = $i-$l;

		$x = $i-1;

		if($d >10){

			break;	

		}

		if($l == $i){

			if($l >= 1){

				//$search.= '<li><a href="#" data-meet="'.$x.'" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';		

			}				

		} else {

			//$search.= '<li><a href="#" data-meet="'.$i.'">'.$i.'</a></li> ';		

		}



	};	



	//$search.= '</ul></nav></center>';	

	return $search;

	

}



function getAdminLangEditTinder($id){	

	global $mysqli,$sm;

	$lang = '';

	$query = $mysqli->query("SELECT * FROM twoo_lang where lang_id = '$id' and id <= 341 ORDER BY id ASC");

	if ($query->num_rows > 0) { 

		while($result = $query->fetch_object()){

			$lang.= '<div class="col-md-2" style="height:50px;"><input class="form-control" value="'.$result->text.'"  data-langid-t="'.$result->lang_id.'" data-lid="'.$result->id.'" /></div>';

		}	

	}

	return $lang;

}





function getAdminLangEditTwoo($id){	

	global $mysqli,$sm;

	$lang = '';

	$query = $mysqli->query("SELECT * FROM twoo_lang where lang_id = '$id' ORDER BY id ASC");

	if ($query->num_rows > 0) { 

		while($result = $query->fetch_object()){

			$lang.= '<div class="col-md-2" style="height:50px;"><input class="form-control" data-twoo="1" value="'.$result->text.'"  data-langid="'.$result->lang_id.'" data-lid="'.$result->id.'" /></div>';

		}	

	}

	return $lang;

}





function meetFilterTextTwoo($uid,$lang,$looking,$age,$radius,$status=0,$l=0){

	global $mysqli,$sm;

	

	$search = '';

	$time_now = time()-300;

	$lat = $sm['user']['lat'];

	$lng = $sm['user']['lng'];

	$today = date('w');

	$limit = $l * 16;

	$ages = "18,30";

	$gender ='';

	$e_age = explode( ',', $age );
	$age2 = $e_age[1];
	$age1 = $e_age[0];
	if($status == 0){

		$status_filter = "";

		$online_now = $sm['twoo_lang'][9]['text'];

	} else {

		$online_now = $sm['twoo_lang'][10]['text'];

		$time_now = time()-300;

		if($looking == 3) {

		$status_filter = "AND last_access >=".$time_now." OR fake = 1 AND online_day = ".$today." AND age BETWEEN '".$age1."' AND '".$age2."'";			

		} else {

		$status_filter = "AND last_access >=".$time_now." OR fake = 1 AND online_day = ".$today." AND age BETWEEN '".$age1."' AND '".$age2."' AND gender = '".$looking."'";			

		}



	}	

	

	if($looking == 3) {
		$query2 = "SELECT id
		FROM users
		WHERE age BETWEEN '".$age1."' AND '".$age2."'
		$status_filter	
		ORDER BY last_access";			

	} else {
		$query2 = "SELECT id
		FROM users
		WHERE gender = '".$looking."'
		AND age BETWEEN '".$age1."' AND '".$age2."'
		$status_filter	
		ORDER BY last_access";			
	}
	$result2 = $mysqli->query($query2);
	$sm['meet_result'] = $result2->num_rows;
	getUserInfo($uid,6);
	if($looking == 1){
		$gender = $sm['twoo_lang'][8]['text'];	
	}
	if($looking == 2){
		$gender = $sm['twoo_lang'][7]['text'];	
	}
	if($looking == 3){
		$gender = $sm['twoo_lang'][5]['text'];;	
	}	
	if($radius == 1000){
		$radio = $sm['twoo_lang'][6]['text'];	
	} else {
		$radio = $radius.' KM';	
	}

	$city = $sm['search']['city'];
	if ($city == ''){
		$city = $sm['search']['country'];	
	}

	

	if($radius > 999){
		$search = $sm['twoo_lang'][0]['text']." <span  data-filter-search>".$gender."</span> ".$sm['twoo_lang'][1]['text']." 
					<span  data-filter-search >".$sm['twoo_lang'][2]['text']."</span> ".$sm['twoo_lang'][3]['text']." <span data-filter-search >".$age1." ".$sm['twoo_lang'][4]['text']." ".$age2."</span> ".$sm['twoo_lang'][5]['text']." <span data-filter-search > ".$online_now." </span><div class='search-button'>
						<i class='material-icons' data-filter-search  style='font-size:32px;'>filter_list</i>
					</div>";
	} else {

		$search = $sm['twoo_lang'][0]['text']." <span  data-filter-search>".$gender."</span> ".$sm['twoo_lang'][1]['text']."  

					<span  data-filter-search >".$city."</span> ".$sm['twoo_lang'][11]['text']." <span  data-filter-search>".$radio."</span> ".$sm['twoo_lang'][3]['text']." <span data-filter-search >".$age1." ".$sm['twoo_lang'][4]['text']." ".$age2."</span> ".$sm['twoo_lang'][5]['text']." <span data-filter-search> ".$online_now." </span><div class='search-button'>

						<i class='material-icons' data-filter-search style='font-size:32px;'>filter_list</i>

					</div>";

	}

	return $search;

	

}



function spotLightTwoo($lat,$lng,$r=0){

	global $mysqli,$sm;	

	$time = time()-86400;

	$time_now = time()-300;

	$i = 0;

		$spotlight = $mysqli->query("SELECT u_id,photo,time, ( 6371 * acos( cos( radians($lat) ) * cos( radians( lat ) ) 

		* cos( radians( lng ) - radians($lng) ) + sin( radians($lat) ) * sin(radians(lat)) ) ) AS distance 

		FROM spotlight

		where country = '".$sm['user']['country']."'		

		ORDER BY time desc

		LIMIT 25

		");	

	if ($spotlight->num_rows < 3) {

		$spotlight = $mysqli->query("SELECT u_id,photo,time, ( 6371 * acos( cos( radians($lat) ) * cos( radians( lat ) ) 

		* cos( radians( lng ) - radians($lng) ) + sin( radians($lat) ) * sin(radians(lat)) ) ) AS distance 

		FROM spotlight



		ORDER BY distance ASC

		LIMIT 25

		");				

	}

	$today = date('w');

	if ($spotlight->num_rows > 0) { 

		while($spotl = $spotlight->fetch_object()){

			getUserInfo($spotl->u_id,1);

			$i++;

			if($r == 1){

				echo'<div class="spotlight-profile-photo" data-back-photo="1" onClick="goToProfile('.$spotl->u_id.')"

					 data-src="'.$spotl->photo.'" data-width="70" data-show="'.$i.'" style="display:none">';

					 if($sm['profile']['last_access'] >= $time_now || $sm['profile']['fake'] == 1 && $sm['profile']['online_day'] == $today){
						echo '<div class="online"></div>';
					 }

				echo'<div class="name" data-main-background="1"><b>'.$sm['profile']['first_name'].'</b>, '.$sm['profile']['age'].'</div></div>';			

			} else {

				echo'<div class="spotlight-profile-photo" data-back-photo="1" onClick="goToProfile('.$spotl->u_id.')"

					 data-src="'.$spotl->photo.'" data-show="'.$i.'" data-width="70">';

					 if($sm['profile']['last_access'] >= $time_now || $sm['profile']['fake'] == 1 && $sm['profile']['online_day'] == $today){

						echo '<div class="online"></div>';

					 }

				echo'<div class="name" data-main-background="1"><b>'.$sm['profile']['first_name'].'</b>, '.$sm['profile']['age'].'</div></div>';			

			}



		}	

	}

}





function getCreditsPackagesTwoo() {

	global $mysqli,$sm;

	$return = '';

	$i=0;

	$query = $mysqli->query("SELECT * FROM config_credits order by credits ASC limit 100");



	if ($query->num_rows > 0) { 

		while($cre = $query->fetch_object()){

			$i++;

			if($i==1){

				$return .= '<option data-price="'.$cre->price.'" data-quantity="'.$cre->credits.'" selected>'.$cre->credits.' '.$sm['twoo_lang'][12]['text'].' '.$cre->price.' '.$sm['config']['currency'].'</option>';

			} else {

				$return .= '<option data-price="'.$cre->price.'" data-quantity="'.$cre->credits.'">'.$cre->credits.' '.$sm['twoo_lang'][12]['text'].' '.$cre->price.' '.$sm['config']['currency'].'</option>';				

			}

		}

	}

	return $return;			

}



function getPremiumPackagesTwoo() {

	global $mysqli,$sm;

	$return = '';

	$i=0;

	$query = $mysqli->query("SELECT * FROM config_premium order by price ASC limit 100");



	if ($query->num_rows > 0) { 

		while($cre = $query->fetch_object()){

			$i++;

			if($i==1){

				$return .= '<option data-price="'.$cre->price.'" data-quantity="'.$cre->days.'" selected>'.$sm['lang'][170]['text'].' '.$cre->days.' '.$sm['lang'][171]['text'].' '.$cre->price.' '.$sm['config']['currency'].'</option>';

			} else {

				$return .= '<option data-price="'.$cre->price.'" data-quantity="'.$cre->days.'">

				'.$sm['lang'][170]['text'].' '.$cre->days.' '.$sm['lang'][171]['text'].' '.$cre->price.' '.$sm['config']['currency'].'</option>';				

			}						

		}

	}

	return $return;			

}



function getUserPhotosSpotlightTwoo($uid){	

	global $mysqli,$sm;	

	$photo = "";

	$photos = $mysqli->query("SELECT photo FROM users_photos WHERE approved = 1 and blocked = 0 and u_id = '".$uid."' order by id desc LIMIT 200");

	if ($photos->num_rows > 0) { 

		while($up = $photos->fetch_object()){

			

			$photo .= '<div class="spotlight-profile-photo" data-back-photo="1" data-select-spotlight="1" data-src="'.$up->photo.'" data-width="70"></div>';

		}	

	}

	

	return $photo;

}



function getUserPhotosHeaderTwoo($uid){	

	global $mysqli,$sm;	

	$photo = "";

	$photos = $mysqli->query("SELECT photo FROM users_photos WHERE approved = 1 and blocked = 0 and u_id = '".$uid."' order by id desc LIMIT 200");

	if ($photos->num_rows > 0) { 

		while($up = $photos->fetch_object()){

			

			$photo .= '<div class="photo" data-back-photo="1" data-src="'.$up->photo.'" data-profile-photo="3"></div>';

		}	

	}

	

	return $photo;

}



function getUserPhotosTwoo($uid,$i=0,$x=0,$y=0,$b=0){	

	global $mysqli,$sm;	

	$photo = "";

	$me = 0;

	if($uid == $sm['user']['id']){

		$me = 1;	

	}

	if($i == 1){

		$photos = $mysqli->query("SELECT * FROM users_photos WHERE u_id = '".$uid."' and approved = 1 order by id desc LIMIT 200");

	} else if($b == 1){

		$photos = $mysqli->query("SELECT * FROM users_photos WHERE approved = 1 and u_id = '".$uid."' and blocked = 1 order by id desc LIMIT 200");		

	} else {

		$photos = $mysqli->query("SELECT * FROM users_photos WHERE approved = 1 and u_id = '".$uid."' order by id desc LIMIT 200");

	}	

	if ($photos->num_rows > 0) { 

		while($up = $photos->fetch_object()){

			getUserInfo($uid,1);

			$photoData['id'] = $up->id;

			$photoData['src'] = $up->photo;

			$photoData['desc'] = $up->desc;

			$photoData['me'] = $me;	

			$photoData['uid'] = $uid;	

			$photoData['user'] = $sm['profile']['name'];

			$photoData['photo'] = $sm['profile']['profile_photo'];

			$photoData['blocked'] = $up->blocked;	

			$photoData['private'] = $up->private;				

			$photoData['like'] = checkPhotoLike($sm['user']['id'],$up->id);

			$photoData['likes'] = getPhotoLikes($up->id);			

			$photoData['comments'] = getPhotoComments($up->id);

			$sm['photo'] = $photoData;

			if($i == 1 && $x == 0){

				$photo .= getPage('profile/mphoto');

			} else if($x == 1){

				$photo .= requestPage('profile/mphoto');		

			} else {

				$photo .= requestPage('profile/photo');

			}

		}	

	}

	return $photo;

}



function getChatTwoo($uid1,$uid2){	

	global $mysqli,$sm;

	$chat = '';

	$text = "";

	$next = 0;

	$last = 0;

	$mysqli->query("UPDATE chat set seen = 1 where s_id = '".$uid2."' and r_id = '".$uid1."' and seen = 0");	

	$spotlight = $mysqli->query("SELECT * FROM chat WHERE s_id = '".$uid1."' and r_id = '".$uid2."'

								OR r_id = '".$uid1."' and s_id = '".$uid2."' ORDER BY id ASC");

	if ($spotlight->num_rows > 0) { 



		while($spotl = $spotlight->fetch_object()){

				

			$message = $spotl->message;

			$continue = true;

			if($spotl->photo == 1){

				$continue = true;

			}

			if($spotl->access == 1){

				$continue = true;

			}			

			if($spotl->seen == 1){

				$seen = '<i class="mdi-navigation-check" title="Seen"></i>';

			} else {

				$seen = '<i class="mdi-device-access-time" title="Unseen"></i>';

			}

			if($continue == true){

				if($uid1 == $spotl->s_id) {

					if($spotl->notification != 2){

						$chat.='<p class="me" data-message="1" id="me">';

						if($spotl->photo == 1){

							$chat.='<img src="'.$message.'" data-src="'.$message.'" style="max-width:400px;border-radius:5px"/></p>';

						}else if($spotl->access == 1){

							$chat.=$text.' '.$sm['lang'][174]['text'].' </p>';					

						} else if($spotl->access == 2){

							$chat.=$text.' '.$sm['lang'][174]['text'].' </p>';					

						}  else {

							$chat.=$text.$message.' </p>';

						}

					}

					$text = "";

				}else {

					if($spotl->seen != 2){

						$chat.='<p class="them" data-message="1" id="you">';

						if($spotl->photo == 1){

							$chat.='<img src="'.$message.'" data-src="'.$message.'" style="max-width:400px;border-radius:5px"/></p>';

						}else if($spotl->access == 1){

							$chat.= $text.' '.$sm['lang'][174]['text'].' <a href="javascript:;" style="color:#FF7102; margin-left:10px;top:5px;" data-tooltip="'.$sm['lang'][175]['text'].'" data-access="yes"><i class="material-icons">check</i></a><a data-tooltip="'.$sm['lang'][176]['text'].'" href="javascript:;" data-access="no" style="color:#FF7102; margin-left:10px"> <i class="material-icons">close</i></a></p>';					

						} else if($spotl->access == 2){

							$chat.=$text.' '.$sm['lang'][174]['text'].'</p>';					

						} else {

							$chat.=$text.$message.' </p>';

						}

					}

					$text = "";

				}

			}

		}	

	}

	

	return $chat;

}









function getLastChatTwoo($uid1,$uid2){	

	global $mysqli,$sm;

	$chat = '';

	$spotlight = $mysqli->query("SELECT * FROM chat WHERE s_id = '".$uid1."' and r_id = '".$uid2."' ORDER BY id DESC LIMIT 1");

	if ($spotlight->num_rows > 0) { 



		while($spotl = $spotlight->fetch_object()){

			$message = $spotl->message;

			if (preg_match_all('/(?<!\w)*(\w+)/', $message, $matches))

			{

				$icons = $matches[1];

				foreach ($icons as $icon)

				{

					$message = str_replace( '*'.$icon, '<i class="emoticon '.$icon.' title="cool"></i>', $message );

				}

			}		

			if($uid1 == $spotl->s_id) {

				$chat.='<div class="post"><div class="left" id="me"><div class="profile-photo" data-src="'.$sm['user']['profile_photo'].'"></div>

				<h1>'.$sm['user']['name'].'</h1> <p class="me">'.$message.' </p></div></div></div>';

			}else {

				$chat.='<div class="post"><div class="left" id="you"><div class="profile-photo" data-src="'.$sm['chat']['profile_photo'].'"></div>

				<h1>'.$sm['chat']['name'].'</h1> <p class="you">'.$message.'</p></div></div></div>';	

			}



		}	

	}

	

	return $chat;

}



function getGiftsTwoo() {

	global $mysqli,$sm;

	$gifts = '';

	$gift = $mysqli->query("SELECT * FROM gifts order by price ASC limit 100");



	if ($gift->num_rows > 0) { 

		while($gi = $gift->fetch_object()){

		 $gifts .= '<img class="send-gift" data-tooltip="'.$sm['twoo_lang'][13]['text'].' '.$gi->price.'" data-gprice="'.$gi->price.'" data-src="'.$sm['config']['site_url'].'/'.$gi->icon.'" src="'.$sm['config']['site_url'].'/'.$gi->icon.'" />';	

		}

	}

	return $gifts;			

}



function getUserFriendsTwoo($uid){	

	global $mysqli,$sm;

	$friends = '';

	$arr = array();

	$arr[] = $uid;

	$query2 = $mysqli->query("SELECT s_id,r_id,seen,notification FROM chat WHERE r_id = '".$uid."' || s_id = '".$uid."' order by id desc");

	if ($query2->num_rows > 0) { 

		while($result2 = $query2->fetch_object()){

			if (!in_array($result2->s_id, $arr)){

				$arr[] = $result2->s_id;			  

				getUserInfo($result2->s_id,4);

				$status = userFilterStatus($sm['friend']['id']);

				$show_status = '';

				if($status == 1){

					$show_status = '<div class="online"></div>';

				}

				if($result2->r_id == $uid && $result2->seen == 2){				



				} else {

					$friends.='<li  data-name="'.$sm['friend']['name'].'" data-uid="'.$sm['friend']['id'].'" data-chat="'.$sm['friend']['id'].'"

					data-all="1" data-fan="1" data-conv="'.checkConv($uid,$sm['friend']['id']).'" data-message="'.getNewMessages($uid,$sm['friend']['id']).'" data-status="'.userFilterStatus($sm['friend']['id']).'">

							<div class="photo" data-back-photo="1" data-src="'.$sm['friend']['profile_photo'].'"></div>

							<h3><b>'.$sm['friend']['first_name'].',</b> '.$sm['friend']['age'].' '.$show_status.'</h3>

							<h5>'.time_elapsed_string(getLastMessageMobileTime($sm['user']['id'],$sm['friend']['id'])).'</h5>

							<span class="last-message-left">'.getLastMessageTwoo($sm['user']['id'],$sm['friend']['id']).'</span>

						</li>';

				}				

			}

			

			if (!in_array($result2->r_id, $arr)){

				$arr[] = $result2->r_id;			  

				getUserInfo($result2->r_id,4);

				$status = userFilterStatus($sm['friend']['id']);

				$show_status = '';

				if($status == 1){

					$show_status = '<div class="online"></div>';

				}

				

				if($result2->s_id == $uid && $result2->notification == 2){				



				} else {

					$friends.='<li  data-name="'.$sm['friend']['name'].'" data-uid="'.$sm['friend']['id'].'" data-chat="'.$sm['friend']['id'].'"

					data-all="1" data-fan="1" data-conv="'.checkConv($uid,$sm['friend']['id']).'" data-message="'.getNewMessages($uid,$sm['friend']['id']).'" data-status="'.userFilterStatus($sm['friend']['id']).'">

							<div class="photo" data-back-photo="1" data-src="'.$sm['friend']['profile_photo'].'"></div>

							<h3><b>'.$sm['friend']['first_name'].',</b> '.$sm['friend']['age'].' '.$show_status.'</h3>

							<h5>'.time_elapsed_string(getLastMessageMobileTime($sm['user']['id'],$sm['friend']['id'])).'</h5>

							<span class="last-message-left">'.getLastMessageTwoo($sm['user']['id'],$sm['friend']['id']).'</span>

						</li>';

				}

			}

		}	

	}

	

	return $friends;

}







function onlineFriendsTwoo($uid){	

	global $mysqli,$sm;

	$friends = '';

	

	$query2 = $mysqli->query("SELECT DISTINCT s_id FROM chat WHERE r_id = '".$uid."'  order by id DESC");

	if ($query2->num_rows > 0) { 

		while($result2 = $query2->fetch_object()){

			getUserInfo($result2->s_id,4);

			$status = userFilterStatus($sm['friend']['id']);

			$show_status = '';

			if($status == 1){

				$show_status = '<div class="online"></div>';

			}			

			if(isFan($sm['friend']['id'],$uid) == 0 && $status == 1){

				$friends.='<li  data-name="'.$sm['friend']['name'].'" data-uid="'.$sm['friend']['id'].'" data-chat="'.$sm['friend']['id'].'"

				data-all="1" data-fan="1" data-conv="'.checkConv($uid,$sm['friend']['id']).'" data-message="'.getNewMessages($uid,$sm['friend']['id']).'" data-status="'.userFilterStatus($sm['friend']['id']).'">

						<div class="photo" data-back-photo="1" data-src="'.$sm['friend']['profile_photo'].'"></div>

						<h3><b>'.$sm['friend']['first_name'].',</b> '.$sm['friend']['age'].' '.$show_status.'</h3>

						<h5>'.time_elapsed_string(getLastMessageMobileTime($sm['user']['id'],$sm['friend']['id'])).'</h5>

						<span class="last-message-left">'.getLastMessageTwoo($sm['user']['id'],$sm['friend']['id']).'</span>

					</li>';

			}

		}	

	}

	

	$query = $mysqli->query("SELECT u1 FROM users_likes WHERE u2 = '".$uid."' and love = 1 LIMIT 1500");

	if ($query->num_rows > 0) { 

		while($result = $query->fetch_object()){

			getUserInfo($result->u1,4);

			$status = userFilterStatus($sm['friend']['id']);

			$show_status = '';

			if($status == 1){

				$show_status = '<div class="online"></div>';

			}

			if($status == 1){

			$friends.='<li  data-name="'.$sm['friend']['name'].'" data-uid="'.$sm['friend']['id'].'" data-chat="'.$sm['friend']['id'].'"

			data-all="1" data-fan="1" data-conv="'.checkConv($uid,$sm['friend']['id']).'" data-message="'.getNewMessages($uid,$sm['friend']['id']).'" data-status="'.userFilterStatus($sm['friend']['id']).'">

					<div class="photo" data-back-photo="1" data-src="'.$sm['friend']['profile_photo'].'"></div>

					<h3><b>'.$sm['friend']['first_name'].',</b> '.$sm['friend']['age'].' '.$show_status.'</h3>

					<h5>'.time_elapsed_string(getLastMessageMobileTime($sm['user']['id'],$sm['friend']['id'])).'</h5>

					<span class="last-message-left">'.getLastMessageTwoo($sm['user']['id'],$sm['friend']['id']).'</span>

				</li>';

			}

		}	

	}	

	

	return $friends;

}



function unreadFriendsTwoo($uid){	

	global $mysqli,$sm;

	$friends = '';

	

	$query2 = $mysqli->query("SELECT DISTINCT s_id FROM chat WHERE r_id = '".$uid."' and seen = 0  order by id DESC");

	if ($query2->num_rows > 0) { 

		while($result2 = $query2->fetch_object()){

			getUserInfo($result2->s_id,4);

			$status = userFilterStatus($sm['friend']['id']);

			$show_status = '';

			if($status == 1){

				$show_status = '<div class="online"></div>';

			}			

			$friends.='<li  data-name="'.$sm['friend']['name'].'" data-uid="'.$sm['friend']['id'].'" data-chat="'.$sm['friend']['id'].'"

			data-all="1" data-fan="1" data-conv="'.checkConv($uid,$sm['friend']['id']).'" data-message="'.getNewMessages($uid,$sm['friend']['id']).'" data-status="'.userFilterStatus($sm['friend']['id']).'">

					<div class="photo" data-back-photo="1" data-src="'.$sm['friend']['profile_photo'].'"></div>

					<h3><b>'.$sm['friend']['first_name'].',</b> '.$sm['friend']['age'].' '.$show_status.'</h3>

					<h5>'.time_elapsed_string(getLastMessageMobileTime($sm['user']['id'],$sm['friend']['id'])).'</h5>

					<span class="last-message-left">'.getLastMessageTwoo($sm['user']['id'],$sm['friend']['id']).'</span>

				</li>';

		}	

	}

	return $friends;

}



function getLastMessageTwoo($uid1,$uid2){	

	global $mysqli,$sm;

	$chat = '';

	$spotlight = $mysqli->query("SELECT * FROM chat WHERE r_id = '".$uid1."' and s_id = '".$uid2."' OR s_id = '".$uid1."' and r_id = '".$uid2."' ORDER BY id DESC LIMIT 1");

	if ($spotlight->num_rows > 0) { 

		while($spotl = $spotlight->fetch_object()){

			if($spotl->photo == 1 ){

				$message = '<i class="material-icons">photo_camera</i>';		

			}

			else if($spotl->access == 1 ){

				$message = $sm['lang'][174]['text'];		

			}	else {

				if (strpos($spotl->message, '/gifts/') !== false) {

					$message = 'gift';

				}else {

					$message = $spotl->message;				

				}	

			}

			

		}	

	}

	return $message;

}



function getLastMessageCurrentTwoo($uid1,$uid2){	

	global $mysqli,$sm;

	$chat = '';

	$spotlight = $mysqli->query("SELECT * FROM chat WHERE r_id = '".$uid1."' and s_id = '".$uid2."' and seen = 0 ORDER BY id ASC");

	if ($spotlight->num_rows > 0) { 

		while($spotl = $spotlight->fetch_object()){

			$message = $spotl->message;	

			if($uid1 == $spotl->s_id) {

				$chat.='<p class="me" data-message="1" id="me">';

				if($spotl->photo == 1){

					$chat.='<img src="'.$message.'" data-src="'.$message.'" style="max-width:400px;border-radius:5px"/></p>';

				}else if($spotl->access == 1){

					$chat.=$text.' '.$sm['lang'][174]['text'].' </p>';					

				} else if($spotl->access == 2){

					$chat.=$text.' '.$sm['lang'][174]['text'].' </p>';					

				}  else {

					$chat.=$text.$message.' </p>';

				}

				$text = "";

			}else {

				$chat.='<p class="them" data-message="1" id="you">';

				if($spotl->photo == 1){

					$chat.='<img src="'.$message.'" data-src="'.$message.'" style="max-width:400px;border-radius:5px"/></p>';

				}else if($spotl->access == 1){

					$chat.= $text.' '.$sm['lang'][174]['text'].' <a href="javascript:;" data-tooltip="'.$sm['lang'][175]['text'].'" class="access center-align" data-access="yes"><i class="mdi-action-done"></i></a><a data-tooltip="'.$sm['lang'][176]['text'].'" href="javascript:;" data-access="no" class="access center-align"> <i class="mdi-content-clear"></i></a>';					

				} else if($spotl->access == 2){

					$chat.=$text.' '.$sm['lang'][174]['text'].'</p>';					

				} else {

					$chat.=$text.$message.' </p>';

				}

				$text = "";

			}



		}	

	}

	return $chat;

}


function siteApiConfig($val,$s) {
	global $mysqli,$sm;
	
	$config = $mysqli->query("SELECT * FROM api where pcode = '".$s."'");
	if($config->num_rows > 0){
		$result = $config->fetch_object();
		return $result->$val;
	} else {
		return 'error';
	}
}

function getLastMessageTwooSeen($uid1,$uid2){	

	global $mysqli,$sm;

	$message = 0;

	$spotlight = $mysqli->query("SELECT seen,s_id FROM chat WHERE r_id = '".$uid1."' and s_id = '".$uid2."' OR s_id = '".$uid1."' and r_id = '".$uid2."' ORDER BY id DESC LIMIT 1");

	if ($spotlight->num_rows > 0) { 

		while($spotl = $spotlight->fetch_object()){

			if($spotl->s_id == $uid1 && $spotl->seen == 0){

				$message = 1;

			} else if($spotl->s_id == $uid1 && $spotl->seen == 1){

				$message = 2;

			} else {

				$message = 3;

			}

		}	

	}

	return $message;

}



function checkApiCountry($c) {

	global $mysqli;

	$query = $mysqli->query("SELECT * FROM badoo_cron where country = '".$c."'");
	$result = $query->num_rows;

	return $result;

}

function totalFansTwoo($uid1) {

	global $mysqli;

	

	$result = 0;

	$query = $mysqli->query("SELECT count(*) as total FROM users_likes where u2 = '".$uid1."'  and notification = 0");

	$total = $query->fetch_assoc();

	$result = $total['total'];

	return $result;

}



function totalVisitsTwoo($uid1) {

	global $mysqli;

	

	$result = 0;

	$query = $mysqli->query("SELECT count(*) as total FROM users_visits where u1 = '".$uid1."' and notification = 0");

	$total = $query->fetch_assoc();

	$result = $total['total'];	

	return $result;

}



function getUserFansPeekTwoo($uid){

	global $mysqli,$sm;

	

	$search = '';

	$count = $limit;

	$time_now = time()-300;

	$query2 = $mysqli->query("SELECT u1 FROM users_likes WHERE u2 = '".$sm['user']['id']."' AND love = 1 and notification = 0 limit 6");

	if($query2->num_rows > 0){

		while($result2 = $query2->fetch_object()){

			getUserInfo($result2->u1,6);

			$search.='<div class="photo" data-open-premium-modal="1" data-back-photo="1" data-src="'.$sm['search']['profile_photo'].'"></div>';

		}	

	}

	return $search;

}



function getUserVisitorsPeekTwoo($uid){

	global $mysqli,$sm;

	

	$search = '';

	$count = $limit;

	$time_now = time()-300;

	$query2 = $mysqli->query("SELECT u2,timeago FROM users_visits where u1 = '$uid' and u2 <> '$uid' and notification = 0 order by timeago desc limit 6");

	if($query2->num_rows > 0){

		while($result2 = $query2->fetch_object()){

			getUserInfo($result2->u2,6);

			$search.='<div class="photo" data-open-premium-modal="1" data-back-photo="1" data-src="'.$sm['search']['profile_photo'].'"></div>';

		}	

	}

	return $search;

}



function getUserVisitorsTwoo($uid) {

	global $mysqli,$sm;

	

	$search = '';

	$count = $limit;

	$time_now = time()-300;

	$query2 = $mysqli->query("SELECT u2,timeago FROM users_visits where u1 = '$uid' and u2 <> '$uid' order by timeago desc limit 50");

	$mysqli->query("UPDATE users_visits SET notification = 1 where u1 = '$uid'");

	if($query2->num_rows > 0){

		while($result2 = $query2->fetch_object()){

			getUserInfo($result2->u2,6);

			$time = $result2->timeago;

			$search.='<li>

                    	<div class="photo" data-back-photo="1" data-src="'.$sm['search']['profile_photo'].'"></div>

                        <h4><a href="#" onClick="goToProfile('.$sm['search']['id'].')" >'.$sm['search']['name'].','.$sm['search']['age'].'</a></h4>

                        <h5>'.$sm['search']['city'].'</h5>

                        <a href="#" onClick="goToChat('.$sm['search']['id'].')">

                            <span class="list-chat-btn"><i class="material-icons">chat_bubble_outline</i> <b>Chat</b></span>

                        </a>                         

                    </li>';

		}

	}

	

	return $search;

}



function getUserFansTwoo($uid) {

	global $mysqli,$sm;

	

	$search = '';

	$count = $limit;

	$time_now = time()-300;

	$query2 = $mysqli->query("SELECT u1 FROM users_likes WHERE u2 = '".$sm['user']['id']."' AND love = 1");

	$mysqli->query("UPDATE users_likes SET notification = 1 WHERE u2 = '".$sm['user']['id']."'");

	if($query2->num_rows > 0){

		while($result2 = $query2->fetch_object()){

			getUserInfo($result2->u1,6);

			$time = $result2->timeago;

			$search.='<li>

                    	<div class="photo" data-back-photo="1" data-src="'.$sm['search']['profile_photo'].'"></div>

                        <h4><a href="#" onClick="goToProfile('.$sm['search']['id'].')" >'.$sm['search']['name'].','.$sm['search']['age'].'</a></h4>

                        <h5>'.$sm['search']['city'].'</h5>

                        <a href="#" onClick="goToChat('.$sm['search']['id'].')">

                            <span class="list-chat-btn"><i class="material-icons">chat_bubble_outline</i> <b>Chat</b></span>

                        </a>                         

                    </li>';

		}

	}

	

	return $search;

}



function myLikesTwoo(){

	global $mysqli,$sm;

	

	$search = '';

	$time_now = time()-300;



	$query = $mysqli->query("SELECT u2 FROM users_likes WHERE u1 = '".$sm['user']['id']."' AND love = 1 order by time desc");			

	

	if ($query->num_rows > 0) {

		while($row = $query->fetch_object()){

			getUserInfo($row->u2,6);

			$search.='<li>

                    	<div class="photo" data-back-photo="1" data-src="'.$sm['search']['profile_photo'].'"></div>

                        <h4><a href="#" onClick="goToProfile('.$sm['search']['id'].')" >'.$sm['search']['name'].','.$sm['search']['age'].'</a></h4>

                        <h5>'.$sm['search']['city'].'</h5>

                        <a href="#" onClick="goToChat('.$sm['search']['id'].')">

                            <span class="list-chat-btn"><i class="material-icons">chat_bubble_outline</i> <b>Chat</b></span>

                        </a>                         

                    </li>';

		}

	} else {
		echo '<div class="nofriends">
		<h2>You do not have friends</h2>
		</div>';
	}

	

	return $search;

	

}



function userMatchesTwoo(){

	global $mysqli,$sm;

	

	$search = '';

	$time_now = time()-300;

	$i= 0;

	$query = $mysqli->query("SELECT u1 FROM users_likes WHERE u2 = '".$sm['user']['id']."' AND love = 1 order by time DESC");			

	

	if ($query->num_rows > 0) {

		while($row = $query->fetch_object()){

			getUserInfo($row->u1,6);

			if(isFan($sm['user']['id'],$sm['search']['id']) == 1){

				$i++;	

				$mysqli->query("UPDATE users_likes SET notification = 1 WHERE u2 = '".$sm['user']['id']."' and u1 = '".$sm['search']['id']."'");

				$search.='<li>

							<div class="photo" data-back-photo="1" data-src="'.$sm['search']['profile_photo'].'"></div>

							<h4><a href="#" onClick="goToProfile('.$sm['search']['id'].')" >'.$sm['search']['name'].','.$sm['search']['age'].'</a></h4>

							<h5>'.$sm['search']['city'].'</h5>

							<a href="#" onClick="goToChat('.$sm['search']['id'].')">

								<span class="list-chat-btn"><i class="material-icons">chat_bubble_outline</i> <b>Chat</b></span>

							</a>                         

						</li>';					

			}

		}

	}

	if($i == 0){

		$search.= '';

	}

	return $search;

	

}



