------------------------------------------------------------
--        Script Postgre 
------------------------------------------------------------



------------------------------------------------------------
-- Table: t_ville
------------------------------------------------------------
CREATE TABLE public.t_ville(
	id_vil    INT  NOT NULL ,
	pi_vil    INT  NOT NULL ,
	nat_vil   FLOAT  NOT NULL ,
	mor_vil   FLOAT  NOT NULL  ,
	CONSTRAINT t_ville_PK PRIMARY KEY (id_vil)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: t_partie
------------------------------------------------------------
CREATE TABLE public.t_partie(
	id_par    INT  NOT NULL ,
	ann_par   INT  NOT NULL ,
	dat_par   TIMESTAMP  NOT NULL  ,
	CONSTRAINT t_partie_PK PRIMARY KEY (id_par)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: t_catastrophe
------------------------------------------------------------
CREATE TABLE public.t_catastrophe(
	id_cat    INT  NOT NULL ,
	typ_cat   VARCHAR (8) NOT NULL ,
	dmg_cat   FLOAT  NOT NULL  ,
	CONSTRAINT t_catastrophe_PK PRIMARY KEY (id_cat)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: correspondre
------------------------------------------------------------
CREATE TABLE public.correspondre(
	id_vil   INT  NOT NULL ,
	id_par   INT  NOT NULL ,
	id_cat   INT  NOT NULL ,
	annee    INT   ,
	CONSTRAINT correspondre_PK PRIMARY KEY (id_vil,id_par,id_cat)

	,CONSTRAINT correspondre_t_ville_FK FOREIGN KEY (id_vil) REFERENCES public.t_ville(id_vil)
	,CONSTRAINT correspondre_t_partie0_FK FOREIGN KEY (id_par) REFERENCES public.t_partie(id_par)
	,CONSTRAINT correspondre_t_catastrophe1_FK FOREIGN KEY (id_cat) REFERENCES public.t_catastrophe(id_cat)
)WITHOUT OIDS;


CREATE INDEX t_ville_Idx ON public.t_ville (pi_vil,nat_vil,mor_vil);

