<?php
session_start();
$_SESSION['view'] = 'shabi';
 ?>

<?php
include './public/include.php';
include './router/js_router.php';
?>


<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>
        <?php _include('./tpl/header.tpl', array('name'=>'周恩来') ); ?>
         <?php
             // 需要获取指定模板
             function getTplName($path){
                 switch ( $path ) {
                     case '/home':
                         _include('./tpl/home.tpl', array('name'=>'周恩来') );
                         break;
                     case '/about':
                         _include('./tpl/about.tpl', array('name'=>'周恩来') );
                         break;

                     default:
                         # code...
                         break;
                 }
             }
             getTplName($path);
          ?>
         <?php _include('./tpl/footer.tpl', array('name'=>'胡锦涛') ); ?>

         <script src="<?php echo $js_file[$path] ?>"></script>
    </body>
</html>
