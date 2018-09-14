<?php 

error_reporting(E_ALL);
ini_set('display_errors', 1);

use Classes\Autoloader;
use Classes\Database;
use Classes\Party;
use Classes\City;

require 'Classes/Autoloader.php';
Autoloader::register();

// Vérifier connexion bdd
$db = new Database;
$pdo = $db->connect();

if ($db) {
    echo "connecté ; ";
} else {
    echo "non connecté ; ";
}

$party = new Party(50);

if ($party){
    echo "party created !";
    var_dump($party);
    $party->partySave();
}

// $city = new City(110,0.05,00.5);
// $city-> setCityPop(90);
// $city-> setCityBirth(0.05);
// $city-> setCityDeath(0.005);
// $pop = $city-> getCityPop();
// $birth = $city-> getCityBirth();
// $death = $city-> getCityDeath();
// echo "pop $pop; birth $birth ; death $death ";
// $city-> citySave();

$param = [324,0.123,0.001];

$cityPop = $param[0];
$cityBirth = $param[1];
$cityDeath = $param[2];
$city = new City($cityPop,$cityBirth,$cityDeath);
$city->citySave();
