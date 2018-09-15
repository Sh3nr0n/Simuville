<?php 

error_reporting(E_ALL);
ini_set('display_errors', 1);

use Classes\Autoloader;
use Classes\Database;
use Classes\Party;
use Classes\City;
use Classes\Disaster;

require 'Classes/Autoloader.php';
Autoloader::register();

// $_POST['case'] = "getDisasters";
// $_POST['param'] = 10;

switch($_POST['case']){

    case 'saveParty':
    $party = new Party($_POST['param']);
    $party->partySave();
    break;

    case 'saveCity':
    $params = $_POST['param'];
    $cityPop = $params[0];
    $cityBirth = $params[1];
    $cityDeath = $params[2];

    echo "params received by switch case are : $params[0], $params[1], $params[2]";

    $city = new City($cityPop,$cityBirth,$cityDeath); 
    $city->citySave();
    break;

    case 'getDisasters':
    $disasters = new Disaster($_POST['param']);
    // $debug = $_POST['param'];
    // echo " Received disaster request from switch case with $debug param";
    $disasterList = $disasters->disasterRandom();
    // var_dump($disasterList);
    // echo json_encode($disasterList);
    break;
}