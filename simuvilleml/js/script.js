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

//function to simulate population growth

// function cityGrowth(city){

//     let pop = Math.floor(city.popInit+(city.popInit*city.birthRate)-(city.popInit*city.deathRate)-(city.popInit*city.disasterRate/100))
//     console.log("pop is : ",pop)

// }

// // function to iterate years

// function timeCourse(maxYear){
//     let year = 0
//     let timer = setInterval(function(){
//     console.log(year)
//     $('#year').text("Année : "+year)

//     year++
//     if(year > maxYear) {
//         clearInterval(timer);
//     }
// }, 200);

// }

function timeGrowth(maxYear,city){
    let year = 0
    let pop = city.popInit
    let disasterRate
    console.log("init disaster rate",disasterRate)
    let disasterYears = city.disasters.disasterYear
    let timer = setInterval(function(){

    console.log("year",year)
    console.log("city name",city.cityName )
    console.log("pop",pop.toFixed())
    $('#year').text("Année : "+year)

    for (i=0;i<disasterYears.length;i++){
        // console.log("i = %s / city.disasters.disasterRate = %s",i,city.disasters.disasterRate[i])
        if(year===disasterYears[i]){
            console.log("year : %s same as disaster year : %s ",year,disasterYears[i])
            console.log("disaster name : ",city.disasters.disasterName[i])

            disasterRate = city.disasters.disasterRate[i]
            break;

            } 
            else {
                disasterRate = 0   
            }
    }
    console.log("disaster rate : ",disasterRate)

    pop += pop*city.birthRate-pop*city.deathRate-pop*disasterRate*0.01
    
    year++
    if(year > maxYear) {
        clearInterval(timer);
    }
}, 200);

}





$('#simStart').click(
    function simStart(){
    console.log("received simStart button click")
    let party ={}
    party = JSON.parse(sessionStorage.getItem('party'))
    console.log("obj party = ",party)
    console.log("maxYear = ",party.partyEndYear)

    //Get each city data
    let cities = []
    let next = false
    for (i=0;i<party.cityCount;i++){
        let cityNumber = i+1
        let city = {}
        city.cityName = $("#cityName"+cityNumber).text()
        city.popInit =  parseFloat($("#cityPop"+cityNumber).val())
        city.birthRate = parseFloat($("#cityBirth"+cityNumber).val())
        city.deathRate = parseFloat($("#cityDeath"+cityNumber).val())
        // city.disasterRate = 0 // Value fixed for test purpose
        city.disasters = {
            disasterYear:[2,5,8],
            disasterName:["Eau","Feu","Terre"],
            disasterRate:[5,8,10]

        }
        cities.push(city)

        
    }
    console.log("cities=",cities)
    console.log("next=",next)
    //Loop through cities objects
    //For each city play the timeCourse function
///!\cities object seems to be empty when launching timeGrowth
    //For each city play the cityGrowth function
    cities.map((city)=> {
        console.log(city);
        timeGrowth(party.partyEndYear,city)

    })

    }
)





// Chaque année, la population évolue selon la formule suivante :
// population = population +(population x taux de natalité) – (population x taux de
// mortalité) – (population* % population décédée par catastrophe/100).
// Le résultat est arrondi à l’entier inférieur.

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



    
});


//Pour afficher la population et l'année en cours:
//Cacher tout sauf le nom de la ville
//Append une div année au dessus de la div des villes (pour le déflement de l'année)
//Faire un append de <h2>Population</h2> pour afficher la pop en cours
//Afficher les images dans un append a chaque fois qu'un seuil de population est atteint