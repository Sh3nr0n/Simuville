<?php 

error_reporting(E_ALL);
ini_set('display_errors', 1);

use Classes\Autoloader;
use Classes\Database;
use Classes\Party;

require 'Classes/Autoloader.php';
Autoloader::register();

// Vérifier connexion bdd
// $db = new Database;
// $pdo = $db->connect();

// if ($db) {
//     echo "connecté";
// } else {
//     echo "non connecté";
// }

// $party = new Party(50);

// if ($party){
//     echo "party created";
//     var_dump($party);
// }



switch($_POST['case']){
    case 'saveParty':
    $party = new Party($_POST['param']);
    $party->partySave();
    break;
}