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
            $disasterNames = ["Eau","Feu","Terre","Vent","Epidemie","Guerre"];  
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
             }

             // Prepare result array with the expected frontend structure 
             $result=[
                "disasterYear" => $disasterYear,
                "disasterName" => $disasterName,
                "disasterRate" => $disasterRate
             ];

             echo json_encode($result);
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

         // year 50 < 500
        // $rand = rand (1,10);

        // year 500 < 10000
        // $rand = rand (2,31);

        // year > 10000  
        // $rand = rand (4,54  );

        //According to number of year loop though random function 1 to n times



        
    }

    public function disasterSave(){

        
    }



}
// Switch case which take the number of year at party set up
// Then randomize a number between known intervals to echo back when receiving request
// echo with json encode with folling structure :

// {
//     disasterYear: [2, 5, 100],
//     disasterName: ["Eau", "Feu", "Terre"],
//     disasterRate: [5, 8, 100]
//   }

// Then 