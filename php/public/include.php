<?php
function _include($filename, Array $data){
    extract($data);
    include $filename;
}
 ?>
