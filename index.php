<?php
if(!file_exists("assets/includes/config.php")){
	$actual_link = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://".$_SERVER[HTTP_HOST].$_SERVER[REQUEST_URI];	
	header('Location: '.$actual_link.'install');
	return true;
}


require_once('assets/includes/core.php');



if (!isset($_GET['page']) && !isset($_GET['social'])) {
    $_GET['page'] = 'index';
}

if($logged == true && $sm['user']['total_photos'] == 0 && $_GET['page'] != 'profile'){    header('Location:'.$sm['config']['site_url'].'profile/'.$sm['user']['id'].'/'.$sm['user']['link']);}


switch ($_GET['page']) {



	case 'index':

		if ($logged !== true ) {		

			echo getLandingPage('index/content');

			exit;

		} else {

			$folder = 'meet';

			$page = 'content';

			include('assets/sources/pages.php');		

		}



	break;



	

	case 'fb':

		if($_SESSION['new_user'] == 1){

			echo getLandingPage('index/content');

			exit;

		} else {

			echo getLandingPage('index/content');

			exit;				



		}



	break;	



	



	case 'profile':



		if ($logged !== true ) {



			header('Location:'.$sm['config']['site_url']);



			exit;



		}	



		$folder = 'profile';



		$page = 'content';



		include('assets/sources/pages.php');



	break;	



	



	case 'verification':



		if ($logged === true ) {



			unset($_SESSION['user']);



			$ussid = secureEncode($_GET['uid']);



			$_SESSION['user'] = $ussid;



			$mysqli->query('UPDATE users set verified = 1 where id = "'.$ussid.'"');



			header('Location:'.$sm['config']['site_url']);



			exit;			



		}else{	



			$ussid = secureEncode($_GET['uid']);



			$_SESSION['user'] = $ussid;



			$mysqli->query('UPDATE users set verified = 1 where id = "'.$ussid.'"');



			header('Location:'.$sm['config']['site_url']);



			exit;



		}



	break;	







	case 'meet':



		if ($logged !== true ) {



			echo getLandingPage('index/content');



			exit;



		}	



		$folder = 'meet';



		$page = 'content';



		include('assets/sources/pages.php');



	break;



	



	case 'popular':



		if ($logged !== true ) {



			echo getLandingPage('index/content');;



			exit;



		}		



		$folder = 'popular';



		$page = 'content';



		include('assets/sources/pages.php');



	break;	



	



	case 'recover':



		if($_GET['id'] != '' && $_GET['code'] != ''){



		$check = checkRecoverCode($_GET['id'],$_GET['code']);



			if($check > 0){



				$_SESSION['user'] = $_GET['id'];



				header('Location:'.$sm['config']['site_url']);



			} else {



				echo getLandingPage('index/content');



				exit;						



			}



		} else {



			echo getLandingPage('index/content');



			exit;			



		}



	break;		



	



	case 'fans':



		if ($logged !== true ) {



			echo getLandingPage('index/content');



			exit;



		}		



		$folder = 'fans';



		$page = 'content';



		include('assets/sources/pages.php');



	break;	



	



	case 'visits':



		if ($logged !== true ) {



			echo getLandingPage('index/content');



			exit;



		}		



		$folder = 'visits';



		$page = 'content';



		include('assets/sources/pages.php');



	break;		



	



	case 'credits-ok':



		if ($logged !== true ) {



			echo getLandingPage('index/content');



			exit;



		}		



		$folder = 'profile';



		$page = 'credits';



		include('assets/sources/pages.php');



	break;	



	



	case 'credits':



		if ($logged !== true ) {



			echo getLandingPage('index/content');



			exit;



		}		



		$folder = 'credits';



		$page = 'content';



		include('assets/sources/pages.php');



	break;		



	



	case 'matches':



		if ($logged !== true ) {



			echo getLandingPage('index/content');



			exit;



		}		



		$folder = 'matches';



		$page = 'content';



		include('assets/sources/pages.php');



	break;	



	



	case 'mylikes':



		if ($logged !== true ) {



			echo getLandingPage('index/content');



			exit;



		}		



		$folder = 'matches';



		$page = 'mylikes';



		include('assets/sources/pages.php');



	break;	



		



	



	case 'settings':



		if ($logged !== true ) {



			echo getLandingPage('index/content');



			exit;



		}		



		$folder = 'profile';



		$page = 'settings';



		include('assets/sources/pages.php');



	break;



	



	case 'terms':



		if ($logged !== true ) {



			echo getLandingPage('index/content');



			exit;



		}		



		$folder = 'terms';



		$page = 'terms';



		include('assets/sources/pages.php');



	break;



	



	case 'tac':



		echo getLandingPage('index/tac');



		exit;	



	break;



	



	case 'pp':



		echo getLandingPage('index/pp');



		exit;	



	break;	



	



	case 'privacy':



		if ($logged !== true ) {



			echo getLandingPage('index/content');



			exit;



		}		



		$folder = 'terms';



		$page = 'privacy';



		include('assets/sources/pages.php');



	break;	



	



	case 'discover':



		if ($logged !== true ) {



			echo getLandingPage('index/content');



			exit;



		}	



		$folder = 'discover';



		$page = 'content';



		include('assets/sources/pages.php');



	break;	



	



	case 'chat':



		if ($logged !== true ) {



			header('Location:'.$sm['config']['site_url']);



			exit;



		}	



		$folder = 'chat';



		$count = getUserTodayConv($sm['user']['id']);



		$new = getUserTotalConv($sm['user']['id'],$_GET['id']);



		$page = 'content';



		include('assets/sources/pages.php');



	break;



	


//naprawa
	case 'admin':



		if ($logged !== true || $sm['user']['admin'] == 0) {



			echo getAdminPage('login');



			exit;



		}







		$p = secureEncode($_GET['p']);



		if($p == ''){



			$sm['content'] = getAdminPage('statics');



		} else {



			$sm['content'] = getAdminPage($p);	



		}



		



		echo getAdminPage('index');



		exit;			



	break;		



	



	case 'logout':		if ($logged !== true ) {			header('Location:'.$sm['config']['site_url']);			exit;		}		$mysqli->query('UPDATE users set last_access = 0 where fake = 1');



		include('assets/sources/logout.php');



	break;			



}







switch ($_GET['social']) {



				



	case 'fb':



		include('assets/sources/fbconnect.php');



		exit;



	break;







	case 'twitter':



		include('assets/sources/twitterconnect.php');



		exit;



	break;	



	



	case 'instagram':



		include('assets/sources/instaconnect.php');



		exit;



	break;	







	case 'google':



		include('assets/sources/googleconnect.php');



		exit;



	break;		



	



}	







echo getPage('container');



$mysqli->close();