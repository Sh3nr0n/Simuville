<?php

namespace Classes;

use Classes\Database;

class City {

    
    private $_cityId;
    private $_cityPop;
    private $_cityBirth;
    private $_cityDeath;


    public function __construct($cityPop,$cityBirth,$cityDeath){

        $this->_cityPop = $cityPop ;
        $this->_cityBirth = $cityBirth;
        $this->_cityDeath = $cityDeath;
        
        // is a construct needed for this class?
    }

    public function getCityId(){
        
        return $this->_cityId;

    }

    public function setCityId($cityId){

        $this->_cityId = $cityId;
        
    }

    public function getCityPop(){

        return $this->_cityPop;
       
    }

    public function setCityPop($cityPop){

        $this->_cityPop = $cityPop;

    }

    public function getCityBirth(){

        return $this->_cityBirth;
       
    }

    public function setCityBirth($cityBirth){

        $this->_cityBirth = $cityBirth;

    }

    public function getCityDeath(){

        return $this->_cityDeath;
        
    }

    public function setCityDeath($cityDeath){

        $this->_cityDeath = $cityDeath;
        
    }

    public function citySave(){

        // Check if city exists first : use param attributes to get a cityId

        $pdo = new Database();
        $connect = $pdo->connect();
        $reqGetIdCity = $connect->prepare('SELECT id_vil AS "city_Id" FROM t_ville WHERE pi_vil=? AND nat_vil=? AND mor_vil=?') ;

        $reqGetIdCity->bindParam(1, $this->_cityPop);
        $reqGetIdCity->bindParam(2, $this->_cityBirth);
        $reqGetIdCity->bindParam(3, $this->_cityDeath);

        $reqGetIdCity->execute();
        $fetchedIdCity = $reqGetIdCity->fetch();
        $idCity = $fetchedIdCity['city_Id'];
        
        if(!$idCity){

        echo "no id found, city saved!";

        // Request last cityId from database

        $reqGetLastIdCity = $connect->prepare('SELECT MAX (id_vil) AS "city_id" FROM t_ville');

        $reqGetLastIdCity->execute();
        $fetchedLastIdCity = $reqGetLastIdCity->fetch();
        $lastIdCity = $fetchedLastIdCity['city_id'];
        // Increment new id
        $newIdCity = $lastIdCity+1;

        echo "lastIdCity : $lastIdCity";

        // Insert new city in database

        $reqSaveIdCity = $connect->prepare('INSERT INTO t_ville (id_vil,pi_vil,nat_vil,mor_vil) VALUES (?,?,?,?)');
        $reqSaveIdCity->bindParam(1, $newIdCity);
        $reqSaveIdCity->bindParam(2, $this->_cityPop);
        $reqSaveIdCity->bindParam(3, $this->_cityBirth);
        $reqSaveIdCity->bindParam(4, $this->_cityDeath);
        $reqSaveIdCity->execute();

        $savedCity = $reqSaveIdCity->fetch();

        }
    }
}