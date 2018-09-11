#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------


#------------------------------------------------------------
# Table: t_ville
#------------------------------------------------------------

CREATE TABLE t_ville(
        id_vil  Int NOT NULL ,
        pi_vil  Int NOT NULL ,
        nat_vil Float NOT NULL ,
        mor_vil Float NOT NULL
	,CONSTRAINT t_ville_Idx INDEX (pi_vil,nat_vil,mor_vil)
	,CONSTRAINT t_ville_PK PRIMARY KEY (id_vil)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: t_partie
#------------------------------------------------------------

CREATE TABLE t_partie(
        id_par  Int NOT NULL ,
        ann_par Int NOT NULL ,
        dat_par TimeStamp NOT NULL
	,CONSTRAINT t_partie_PK PRIMARY KEY (id_par)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: t_catastrophe
#------------------------------------------------------------

CREATE TABLE t_catastrophe(
        id_cat  Int NOT NULL ,
        typ_cat Varchar (8) NOT NULL ,
        dmg_cat Float NOT NULL
	,CONSTRAINT t_catastrophe_PK PRIMARY KEY (id_cat)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: correspondre
#------------------------------------------------------------

CREATE TABLE correspondre(
        id_vil Int NOT NULL ,
        id_par Int NOT NULL ,
        id_cat Int NOT NULL ,
        annee  Int NOT NULL
	,CONSTRAINT correspondre_PK PRIMARY KEY (id_vil,id_par,id_cat)

	,CONSTRAINT correspondre_t_ville_FK FOREIGN KEY (id_vil) REFERENCES t_ville(id_vil)
	,CONSTRAINT correspondre_t_partie0_FK FOREIGN KEY (id_par) REFERENCES t_partie(id_par)
	,CONSTRAINT correspondre_t_catastrophe1_FK FOREIGN KEY (id_cat) REFERENCES t_catastrophe(id_cat)
)ENGINE=InnoDB;

