<?php

session_cache_limiter('none');

session_start();



require('config.php');
require 'mail/PHPMailerAutoload.php';



// Connect to SQL Server

$mysqli = new mysqli($db_host, $db_username, $db_password,$db_name);



// Check connection

if (mysqli_connect_errno($mysqli)) {

    exit(mysqli_connect_error());

}

// change character set to utf8

if (!$mysqli->set_charset("utf8")) {

	$mysqli->error;

} else {
	
	$mysqli->character_set_name();

}
  



$protocol = (@$_SERVER["HTTPS"] == "on") ? "https://" : "http://";

$ssl = substr($site_url, 0, 5);

$check_ssl = substr($ssl, -1);



if($protocol == 'http://' && $check_ssl == 's'){

    header('Location: '.$site_url);

    exit;	

}



if (substr($_SERVER['HTTP_HOST'], 0, 4) !== 'www.') {

    header('Location: '.$protocol.'www.'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']);

    exit;

}



function appLang($lang) {

	global $mysqli,$sm;

	$result=array();

	$lang = secureEncode($lang);	

	$query = $mysqli->query("SELECT * FROM app_lang where lang_id = '".$lang."' ORDER BY id ASC");

	while($row = $query->fetch_assoc()){
		$result[] = array(
			"id" => $row['id'], 
			"text" => $row['text']
		);

	}	
	return $result;

}


$sm = array();

$options = array(
'encrypted' => true,
'cluster' => 'us2'
);


$sm['price'] = sitePrices();

$sm['basic'] = siteAccountsBasic();

$sm['premium'] = siteAccountsPremium();

$sm['config_email'] = configEmail();



$mobile = false;



$sm['mobile']=0;

$sm['config']['videocall'] = siteConfig('videocall');

$sm['config']['name'] = siteConfig('name');

$check_bar = substr($site_url, -1);

if($check_bar == '/'){

	$sm['config']['site_url'] = $site_url;	

} else {

	$sm['config']['site_url'] = $site_url.'/';	

}

$sm['version'] = siteConfig('version');

$sm['config']['facebook'] = $site_facebook;

$sm['config']['twitter'] = $site_twitter;

$sm['config']['google'] = $site_google;

$sm['config']['android'] = $app_android;

$sm['config']['ios'] = $app_ios;

$sm['config']['theme'] = siteConfig('theme');

$sm['config']['logo_landing'] = siteConfig('logo_landing');

$sm['config']['fb_app_ok'] = 1;

$sm['config']['theme_mobile'] = siteConfig('theme_mobile');

$sm['config']['theme_email'] = siteConfig('theme_email');

$sm['config']['theme_landing'] = siteConfig('theme_landing');

$sm['config']['logo'] = siteConfig('logo');

$sm['config']['main_color'] = siteConfig('main_color');

$sm['config']['title'] = siteConfig('title');

$sm['config']['description'] = siteConfig('description');

$sm['config']['keywords'] = siteConfig('keywords');

$sm['config']['lang'] = siteConfig('lang');

$sm['config']['photo_review'] = siteConfig('photo_review');

$sm['config']['paypal'] = siteConfig('paypal');

$sm['config']['paygol'] = siteConfig('paygol');

$sm['config']['paygol'] = siteConfig('paygol');

$sm['config']['stripe'] = siteConfig('stripe_pub');

$sm['config']['fortumo'] = siteConfig('fortumo_service');

$sm['config']['currency'] = siteConfig('currency');

$sm['config']['free_credits'] = siteConfig('free_credits');

$sm['config']['free_premium'] = siteConfig('free_premium');

$sm['config']['email'] = siteConfig('email');

$sm['config']['email_verification'] = siteConfig('email_verification');

$sm['config']['theme_url'] = $site_url . '/themes/' . $sm['config']['theme'];

$sm['config']['theme_url_landing'] = $site_url . '/themes/' . $sm['config']['theme_landing'];

$sm['config']['theme_url_mobile'] = $site_url . '/themes/' . $sm['config']['theme_mobile'];

$sm['config']['theme_url_email'] = $site_url . '/themes/' . $sm['config']['theme_email'];

$sm['config']['ajax_path'] = $site_url . '/requests';

$sm['lang'] = siteLang($sm['config']['lang']);

$sm['alang'] = appLang($sm['config']['lang']);

$sm['twoo_lang'] = siteTwooLang($sm['config']['lang']);





if (!isset($_SESSION['lang'])) {

    $_SESSION['lang'] = $sm['config']['lang'];

}




$logged = false;

$user = array();

$available_languages = availableLanguages();

$langs = prefered_language($available_languages, $_SERVER["HTTP_ACCEPT_LANGUAGE"]);	

$lang = key($langs);

if($lang != ''){

	$_SESSION['lang'] = checkUserLang($lang);

	$sm['lang'] = siteLang(checkUserLang($lang));

	$sm['alang'] = appLang(checkUserLang($lang));
	
} else{

	$sm['lang'] = siteLang($sm['config']['lang']);

	$sm['alang'] = appLang($sm['config']['lang']);

}

if (!empty($_SESSION['user']) && is_numeric($_SESSION['user']) && $_SESSION['user'] > 0) {

	$user_id = secureEncode($_SESSION['user']);

	$logged = true;

	getUserInfo($user_id,0);

	checkUserPremium($user_id);

	$sm['user_notifications'] = userNotifications($user_id);

	$sm['lang'] = siteLang($sm['user']['lang']);

	$sm['alang'] = appLang($sm['user']['lang']);	

	$sm['twoo_lang'] = siteTwooLang($sm['user']['lang']);
	

	$time = time();
	if($sm['user']['last_access'] < $time || $sm['user']['last_access'] == 0){	
		$mysqli->query("UPDATE users set last_access = '".$time."' where id = '".$sm['user']['id']."'");		
	}	

}



$sm['logged'] = $logged;



if (!empty($_GET['lang'])) {

	$slang = secureEncode($_GET['lang']);

	$_SESSION['lang'] = $slang;

	$sm['lang'] = siteLang($_SESSION['lang']);

	$sm['alang'] = appLang($_SESSION['lang']);

	$sm['twoo_lang'] = siteTwooLang($_SESSION['lang']);
	$sm['elang'] = emailLang($_SESSION['lang']);
	if ($logged == true) {

	   $mysqli->query("UPDATE users SET lang = '".$slang."' WHERE id = '".$user_id."'"); 

	}

}


// Removes session and unnecessary variables if user verification fails

if ($logged == false) {

    unset($_SESSION['user']);

    unset($user);

}



getPlugins('core_file');



