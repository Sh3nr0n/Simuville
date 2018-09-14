<?php

namespace Classes;

use Classes\Database;

class City {

    
    // private $_cityId;
    // private $_cityPop;
    // private $_cityBirth;
    // private $_cityDeath;

    public $cityId;
    public $cityPop;
    public $cityBirth;
    public $cityDeath;


    // public function __construct($cityPop,$cityBirth,$cityDeath){

    //     $this->_cityPop = $cityPop ;
    //     $this->_cityBirth = $cityBirth;
    //     $this->_cityDeath = $cityDeath;
        
    //     // is a construct needed for this class?
    // }

    public function getCityId(){
        
        return $this->cityId;

    }

    public function setCityId($cityId){

        $this->cityId = $cityId;
        
    }

    public function getCityPop(){

        return $this->cityPop;
       
    }

    public function setCityPop($cityPop){

        $this->cityPop = $cityPop;

    }

    public function getCityBirth(){

        return $this->cityBirth;
       
    }

    public function setCityBirth($cityBirth){

        $this->cityBirth = $cityBirth;

    }

    public function getCityDeath(){

        return $this->cityDeath;
        
    }

    public function setCityDeath($cityDeath){

        $this->cityDeath = $cityDeath;
        
    }

    public function citySave(){

        // Check if city exists first : use param attributes to get a cityId

        $pdo = new Database();
        $connect = $pdo->connect();
        $reqGetIdCity = $connect->prepare('SELECT id_vil AS "city_Id" FROM t_ville WHERE pi_vil=? AND nat_vil=? AND mor_vil=?') ;

        $reqGetIdCity->bindParam(1, $this->cityPop);
        $reqGetIdCity->bindParam(2, $this->cityBirth);
        $reqGetIdCity->bindParam(3, $this->cityDeath);

        $reqGetIdCity->execute();
        $fetchedIdCity = $reqGetIdCity->fetch();
        $idCity = $fetchedIdCity['city_Id'];
        
        if(!$idCity){

        echo "no id found, city will be saved!";

        // Request last cityId from database

        $reqGetLastIdCity = $connect->prepare('SELECT MAX (id_vil) AS "city_id" FROM t_ville');

        $reqGetLastIdCity->execute();
        $fetchedLastIdCity = $reqGetLastIdCity->fetch();
        $lastIdCity = $fetchedLastIdCity['city_id'];
        // Increment new id
        $newIdCity = $lastIdCity+1;

        echo "newIdCity : $newIdCity";
        echo " cityPop : $this->cityPop";
        echo " cityBirth : $this->cityBirth";
        echo " cityDeath :$this->cityDeath";

        // Insert new city in database
        if ($newIdCity && $this->cityPop && $this->cityBirth && $this->cityDeath){
            echo " newIdCity : $newIdCity";
            echo " cityPop : $this->cityPop";
            echo " cityBirth : $this->cityBirth";
            echo " cityDeath :$this->cityDeath";

            $reqSaveIdCity = $connect->prepare('INSERT INTO t_ville (id_vil,pi_vil, nat_vil,mor_vil) VALUES (?,?,?,?)');
            $reqSaveIdCity->bindParam(1, $newIdCity);
            $reqSaveIdCity->bindParam(2, $this->cityPop);
            $reqSaveIdCity->bindParam(3, $this->cityBirth);
            $reqSaveIdCity->bindParam(4, $this->cityDeath);
            $reqSaveIdCity->execute();            
            
            echo "\nPDOStatement::errorCode(): ";
            print $reqSaveIdCity->errorCode();
        }
        

        }
    }
}