<?php

function write($file_name, $user, $content):string{
    $file_dir = 'files';
    $fil = $file_dir."/".$file_name;
    
    $file = fopen($fil, 'a');

    if(fwrite($file, $content)){
        return "file written";
        
    }
    else{
        return "error writinfg to file";
    }
    fclose($file);
    


}

function read($file_name, $user):string{
    $file_dir = 'files';
    $fil = $file_dir."/".$file_name;
    
    $file = fopen($fil, 'r');

    if(file_get_contents($file)){
        return file_get_contents($file);
        
    }
    else{
        return "file does not exist";
    }
    fclose($file);
    


}
?>