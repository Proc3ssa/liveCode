<?php

function write($file_name, $user, $content):string{
    $file_dir = 'files';
    $fil = $file_dir."/".$file_name;
    
    $file = fopen($fil, 'w');

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
    
    

    if(file_get_contents($fil)){
        return file_get_contents($fil);
        
    }
    else{
        return "file does not exist";
    }
    fclose($file);
    


}
?>