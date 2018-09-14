<?php 

error_reporting(E_ALL);
ini_set('display_errors', 1);

use Classes\Autoloader;
use Classes\Database;
use Classes\Party;
use Classes\City;


require 'Classes/Autoloader.php';
Autoloader::register();


switch($_POST['case']){

    case 'saveParty':
    $party = new Party($_POST['param']);
    $party->partySave();
    break;

    case 'saveCity':
    $params = $_POST['param'];
    $cityPop = $param[0];
    $cityBirth = $param[1];
    $cityDeath = $param[2];

    echo "params received by switch case are : $params[0], $params[1], $params[2]";

    // $city = new City($cityPop,$cityBirth,$cityDeath);

    $city = new City;
    $city-> setCityPop($cityPop);
    $city-> setCityBirth($cityBirth);
    $city-> setCityDeath($cityDeath);

    $city->citySave();
    break;
}