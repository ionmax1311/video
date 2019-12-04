<?php
define( 'ALLOW_PHP', 1 );
	if($_POST){
$a = implode(",", $_POST);
// file_put_contents('1.txt',$a);
file_put_contents("js/res.php",PHP_EOL.  $a , FILE_APPEND);

}
?>