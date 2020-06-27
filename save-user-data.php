<?php

if (!empty($_POST['name']) && !empty($_POST['email']) && !empty($_POST['phone']) && !empty($_POST['type'])) {

    $name = trim(filter_var($_POST['name'], FILTER_SANITIZE_STRING));
    $email = trim(filter_var($_POST['email'], FILTER_VALIDATE_EMAIL));
    $phone = trim(filter_var($_POST['phone'], FILTER_SANITIZE_STRING));
    $type = trim(filter_var($_POST['type'], FILTER_SANITIZE_STRING));
    $phoneRegExp = "/^(?:0(?!(5|7))(?:2|3|4|8|9))(?:-?\d){7}$|^(0(?=5|7)(?:-?\d){9})$/";
    $type_kinds = ['500', '+500', '+1000', 'another'];

    if (mb_strlen($name) > 1 && mb_strlen($name) < 70) {

        if ($email) {

            if (preg_match($phoneRegExp, $phone)) {

                if (in_array($type, $type_kinds)) {

                    $dbcon = 'mysql:host=localhost;dbname=landing_page_ajax;charset=utf8';
                    $db = new PDO($dbcon, 'root', '');
                    $sql = "INSERT INTO contact_log VALUES (null, ? , ? , ? , ?, NOW())";
                    $query = $db->prepare($sql);
                    if ($query->execute([$name, $email, $phone, $type])) {
                        echo true;
                    }
                }
            }
        }
    }
}