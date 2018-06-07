<?php
require_once('assets/includes/core.php');
$mobile = true;
$sm['mobile'] = 1;
$ms = siteConfig('mobile_site');
header('Location:'.$ms);
$mysqli->close();