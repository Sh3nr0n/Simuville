$(document).ready(function () {
    console.log("script ok")

// Hide elements onload
$('#cityCells').hide()

hideElements()
function hideElements(){
$("#cityNumber1").hide()
$("#cityNumber2").hide()
$("#cityNumber3").hide()
}

$('#setUpParty').click(
    function setUpParty(){

        // Prevent display bug due to second click on setup button
        hideElements()

        let party = {}         
        console.log("received setUpParty button click")
        //Get the number of cities and years
        party.cityCount = $('#cityCount').val()
        party.partyEndYear = $('#partyEndYear').val()
        console.log("party = %s, cityCount = %s, partyEndYear = %s",JSON.stringify(party), party.cityCount,party.partyEndYear)

        //Save party object in the session storage
        sessionStorage.setItem("party",JSON.stringify(party))
        
        //Generate Html elements to display 

        if (party){
            for (let i=0;i<party.cityCount;i++){
                let cityNumber = i+1
                console.log("count",i);
                console.log("cityNumber",cityNumber);
                $("#cityName"+cityNumber).text("Ville "+cityNumber)
                $("#cityNumber"+cityNumber).show()
            }

        }

        $('#cityCells').show()
    }

    
);

function timeGrowth(maxYear,city){

    // Init function variables
    let year = 0
    let pop = city.popInit
    let disasterRate
    let disasterYears = city.disasters.disasterYear
    let timer = setInterval(function(){

    // To Do : Update HTML with JS values
    console.log("year",year)
    console.log("city name",city.cityName )
    console.log("pop",pop.toFixed())
    $('#year').text("Année : "+year)

    //Check if disaster exists for current year
    for (i=0;i<disasterYears.length;i++){
        if(year===disasterYears[i]){

            //To Do : Append disaster name and year to HTML
            console.log("disaster name : ",city.disasters.disasterName[i])
            console.log("year : %s same as disaster year : %s ",year,disasterYears[i])

            //Set up disaster rate to process population value
            disasterRate = city.disasters.disasterRate[i]
            break; // Patch : Stop iteration if value found (to be refactored)

            } 
            else {
                disasterRate = 0   
            }
    }
    console.log("disaster rate : ",disasterRate)

    // Process population value

    pop += pop*city.birthRate-pop*city.deathRate-pop*disasterRate*0.01

    //To Do : Update HTML with icon image when population reaches predefined intervals

    year++

    //Reset Timer
    if(year > maxYear) {
        clearInterval(timer);
    }
}, 200);

}

// TO DO List

//Pour afficher la population et l'année en cours:
//Cacher tout sauf le nom de la ville
//Append une div année au dessus de la div des villes (pour le déflement de l'année)
//Faire un append de <h2>Population</h2> pour afficher la pop en cours
//Afficher les images dans un append a chaque fois qu'un seuil de population est atteint

// Evolution d’affichage :
// Au fur et à mesure de l’évolution de la population, des images de bâtiment au
// format svg apparaissent ou disparaissent. Le nombre de bâtiments est un nombre
// arrondi à l'entier le plus proche.
// Si la population est inférieure à 1000, il y a 1 bâtiment.
// Si la population ≤ 10 000, alors il y a 1 bâtiment pour 1000.
// Lorsque la population > 10 000 alors, il y a 1 bâtiment pour 10 000.
// Chaque bâtiment affiché sera un bâtiment pris de manière aléatoire parmi les
// images proposées dans le fchier ico.zip
// La taille d’une image doit faire 32*32px.


$('#simStart').click(
    function simStart(){
    console.log("received simStart button click")

    // Create a party object and populates it from the session storage
    let party ={}
    party = JSON.parse(sessionStorage.getItem('party'))
    console.log("obj party = ",party)
    console.log("maxYear = ",party.partyEndYear)

    let cities = []

    //Get each city data

    for (i=0;i<party.cityCount;i++){
        let cityNumber = i+1
        let city = {}
        // Assign properties to the city object with values from HTML
        city.cityName = $("#cityName"+cityNumber).text()
        city.popInit =  parseFloat($("#cityPop"+cityNumber).val())
        city.birthRate = parseFloat($("#cityBirth"+cityNumber).val())
        city.deathRate = parseFloat($("#cityDeath"+cityNumber).val())

        // Disasters values fixed for test purpose
        city.disasters = {
            disasterYear:[2,5,8],
            disasterName:["Eau","Feu","Terre"],
            disasterRate:[5,8,10]

        }

        cities.push(city)

        
    }
    console.log("cities=",cities)

    //Launch simulation for each city
    cities.map((city)=> {
        console.log(city);
        timeGrowth(party.partyEndYear,city)

    })

    }
)
    
});


