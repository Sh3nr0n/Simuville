<?php
namespace Classes;
use Classes\Database;

class Party {

    private $_partyEndYear;

    public function __construct($partyEndYear){

        $this->_partyEndYear = $partyEndYear;

    }

    public function partySave(){
        $pdo = new Database();

        $connect = $pdo->connect();

        $reqGetIdParty = $connect->prepare('SELECT MAX (id_par) AS "partyId" FROM t_partie');
        $reqGetIdParty->execute();
        $fetchedIdParty = $reqGetIdParty->fetch();
        $idParty = $fetchedIdParty[0]+1;
        $partyStartTime = date("Y-m-d H:i:s");
        
        // Debug
        echo "id parte : $idParty ;";
        $debug = $this->_partyEndYear;
        echo "party end year : $debug ; ";
        echo "party Time : $partyStartTime ; ";
        


        $reqInsertTimestamp = $connect->prepare("INSERT INTO t_partie (id_par,ann_par,dat_par) VALUES (".$idParty.",".$this->_partyEndYear.",'".$partyStartTime."')");
        $reqInsertTimestamp->execute();
        $reqInsertTimestamp->fetch();
        $result = $reqInsertTimestamp;


        echo "Party saved ! ; ";
        var_dump($result );
    }

    public function partyStats(){
        
    }

    public function setPartyStartTime(){
        
    }

    public function getPartyStartTime(){
        
    }

    public function setPartyEndYear(){
        
    }

    public function getPartyEndYear(){
        
    }

    // Example function
    public function example(){
        // Connect to database
        $pdo = new Database();
        // Use connect method
        $connect = $pdo->connect();
        // Create request variable
        $reqSexRatio = $connect->prepare('WITH
        Request1 AS (select count(*) as result1 from personnage where men =           FALSE),
        Request2 AS (select count(*) as result2 from personnage)
        SELECT CAST(Request1.result1 AS FLOAT) / CAST(Request2.result2 AS             FLOAT) * 100 as SexRatio
        FROM Request1, Request2');
        // Execute request
        $reqSexRatio -> execute();
        // Store request result (fetch) in a new variable 
        $row = $reqSexRatio -> fetch();
        // Push the result of the first column in an array
        $ratio = $row[0];
        // Round result with 2 decimals
        $roundedResult = round($ratio,2);

        // Or initiate an empty array
        $tableau = [];
        // Give it a key in which to store result and round it with 2 decimals
        $tableau['lifespan'] = round ($row['lifespan'], 2);

        return $roundedResult;
    }

}