<?php

namespace Classes;

use Classes\Database;

class Disaster {

    private $_disasterId;
    private $_disasterYear;

    public function __construct($disasterYear){

        $this->_disasterYear = $disasterYear;
        
    }

    public function getDisasterId(){
        
        return $this->_disasterId;

    }

    public function setDisasterId($disasterId){

        $this->_disasterId = $disasterId;
        
    }
    
    public function getDisasterYear(){
        
        return $this->_disasterYear;

    }

    public function setDisasterYear($disasterYear){

        $this->_disasterYear = $disasterYear;
        
    }

    public function generateDisaster($maxYear,$minDisaster,$maxDisaster){

            // Reference arrays with disaster name and damage rate
            $disasterNames = ['Eau','Feu','Terre','Vent','Epidemie','Guerre'];  
            $disasterRates =[5,8,10,4,36,47];

            // Arrays to store iteration result

            $disasterName = [];
            $disasterRate = [];
            $disasterYear = [];

            // Randomize the number of disaster 
            $rand = rand($minDisaster ,$maxDisaster);

            for ($i = 0; $i < $rand+1; $i++){

                //Randomize disaster name and year
                $randomDisaster = rand (0 ,5);
                $randomYear = rand (0 ,$maxYear);

                // For each iteration key, store disaster Name and Rate according to reference arrays
                $disasterName[$i] = $disasterNames[$randomDisaster];
                $disasterRate[$i] = $disasterRates[$randomDisaster];
                $disasterYear[$i] = $randomYear;

                // TO DO : Check if disaster exists

                // TO DO : If not create an id ($idDisaster) with sql max function
                // SQL : SELECT MAX (id_cat) AS "disaster_id" FROM t_catastrophe

                //$idDisaster = result of query +1

                // $this->setDisasterId($idDisaster);

                // Save disaster into database
                // $this->disasterSave($idDisaster,$randomYear,$disasterNames[$randomDisaster],$disasterRates[$randomDisaster]);
             }

            //  Prepare result array with the expected frontend structure 
             $result=array(
                'disasterYear' => $disasterYear,
                'disasterName' => $disasterName,
                'disasterRate' => $disasterRate
             );

             echo json_encode($result);
             
            //  $result=[$disasterYear,$disasterName,$disasterRate];

            //  echo json_encode($result);

            //  echo json_encode($disasterYear);
            //  echo json_encode($disasterName);
            //  echo json_encode($disasterRate);


    }

    public function disasterRandom(){

        $year = $this->_disasterYear;

         // year < 50

        if ($year < 50){
            $this->generateDisaster($year,0,1);                 
        }

        if (50 <= $year && $year < 500){
            $this->generateDisaster($year,1,10);                 
        }

        if (500 <= $year && $year < 10000){
            $this->generateDisaster($year,2,31);                 
        }

        if ($year >= 10000){
            $this->generateDisaster($year,4,54);                 
        }       
    }

    public function disasterSave($id,$year,$name,$dmg){

        //SQL : INSERT INTO t_catastrophe (id_cat,typ_cat,dmg_cat) VALUES (1,'Feu',8)

                
    }
}