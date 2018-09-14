<?php 

namespace Classes;

class Database {

    protected $_dbUser;
    protected $_dbPwd;
    protected $_dbHost;
    protected $_dbName;

    private $_dbConnect;
    
    public function __construct(){
        $this->_dbUser = "simuvilleml";
        $this->_dbPwd = "S1muv1ll3*";
        $this->_dbHost = "postgresql-simuvilleml.alwaysdata.net";
        $this->_dbName="simuvilleml_db"; 
    }

    public function connect(){

        if($this->_dbConnect === null){
                    //Be careful when specifying the DSN prefix : e.g. "pgsql:host=..." or "mysql:host=..."

            $_dbConnect = new \PDO('pgsql:host='.$this->_dbHost.';dbname='.$this->_dbName,$this->_dbUser, $this->_dbPwd);

            $this->_dbConnect = $_dbConnect;
        }
        
        return $this->_dbConnect;
    }
}