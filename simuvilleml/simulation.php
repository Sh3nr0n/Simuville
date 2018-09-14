<?php 

error_reporting(E_ALL);
ini_set('display_errors', 1);

use Classes\Autoloader;
use Classes\Database;
use Classes\Party;

require 'Classes/Autoloader.php';
Autoloader::register();


switch($_POST['case']){
    case 'saveParty':
    $party = new Party($_POST['param']);
    $party->partySave();
    break;
}