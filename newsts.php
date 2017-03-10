<?php
	header();
	//跨域
	$data = file_get_contents("http://qt.qq.com/php_cgi/news/php/varcache_getnews.php?id=12&page=0&plat=ios&version=33");
	echo $_GET['callback'].'('.$data.')';
?>