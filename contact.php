<?php
if($_POST)
{
    $to_email       = "rslee1247@gmail.com";
    
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
        
        $output = json_encode(array( 
            'type'=>'error', 
            'text' => 'Sorry Request must be Ajax POST'
        ));
        die($output);
    } 
    
    $firstname      = filter_var($_POST["firstname"], FILTER_SANITIZE_STRING);
    $lastname     = filter_var($_POST["lastname"], FILTER_SANITIZE_STRING);
    $email   = filter_var($_POST["user_email"], FILTER_SANITIZE_EMAIL);
    $subject        = filter_var($_POST["subject"], FILTER_SANITIZE_STRING);
    $message        = filter_var($_POST["msg"], FILTER_SANITIZE_STRING);
    
    if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
        $output = json_encode(array('type'=>'error', 'text' => 'Please enter a valid email!' + $email));
        die($output);
    }
    if(strlen($subject)<3){
        $output = json_encode(array('type'=>'error', 'text' => 'Subject is required'));
        die($output);
    }
    if(strlen($message)<3){
        $output = json_encode(array('type'=>'error', 'text' => 'Too short message! Please enter something.'));
        die($output);
    }
    
    $message_body = $message . "\r\n\r\n-" . $firstname . ' ' . $lastname . "\r\nEmail : " . $email;
    
    $headers = 'From: ' . $firstname . ' ' . $lastname . "\r\n" .
    'Reply-To: ' . $email . '' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
    $headers .= "\r\n";
    
    $send_mail = mail($to_email, $subject, $message_body, $headers);
    
    if(!$send_mail)
    {
        //If mail couldn't be sent output error. Check your PHP email configuration (if it ever happens)
        $output = json_encode(array('type'=>'error', 'text' => 'Could not send mail! Please check your PHP mail configuration.'));
        die($output);
    }else{
        $output = json_encode(array('type'=>'message', 'text' => 'Hi '.$user_name .' Thank you for your email'));
        die($output);
    }
}
?>