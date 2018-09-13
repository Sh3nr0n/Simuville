$(document).ready(function () {
    console.log("script ok")

// Hide elements onload
$('#cityCells').hide()

hideElements()
function hideElements(){
$("#cityNumber1").hide()
$("#cityNumber2").hide()
$("#cityNumber3").hide()
$('#tabResult').hide()
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
                console.log("city count",i);
                console.log("cityNumber",cityNumber);
                $("#cityName"+cityNumber).text("Ville "+cityNumber)
                $("#cityNumber"+cityNumber).show()
            }
        }

        $('#cityCells').show()
    }
);

function randomizeCity(){
    random = Math.floor((Math.random() * 36) + 1)
    return random
}

function timeGrowth(maxYear,city){

    // Init function variables
    let year = 0
    let pop = city.popInit
    let disasterRate
    let disasterYears = city.disasters.disasterYear
    let timer = setInterval(function(){

    // To Do : Update HTML with JS values
    console.log("year",year)
    console.log("city name",city.cityName)
    console.log("pop",pop.toFixed())
    $('#cityParameters'+city.cityId).hide()
    $('#year').text("Année : "+year)
    $('#cityPopUpdate'+city.cityId).text("Population : "+pop.toFixed())

    //Check if disaster exists for current year
    for (i=0;i<disasterYears.length;i++){
        if(year===disasterYears[i]){

            //To Do : Append disaster name and year to HTML
            console.log("disaster name : ",city.disasters.disasterName[i])
            console.log("year : %s same as disaster year : %s ",year,disasterYears[i])
            $("#cityDisasters"+city.cityId).append("<p>"+disasterYears[i]+' : '+city.disasters.disasterName[i]+"</p>")

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

    //Count number of img elements in cityIcons div
    let countCityImg = document.getElementById("cityIcons"+city.cityId).childElementCount
    console.log("countCityImg : ",countCityImg)

    //Randomize a number between 1 to 36

    // let randomImg = randomizeCity() // Fixed for test purpose

    //A tester

    // let imgList =[
    //     {cityId: 1, id: "img11", src: "img/31.svg"},
    //     {cityId: 1, id: "img12", src: "img/36.svg"}
    // ]
    // $("#cityIcons"+city.cityId).empty()
    // imgList.map((img)=>{

    //     //Remove images first
    //     //html() method does not add new elements in the DOM
    //     $("#cityIcons"+img.cityId).append("<img id="+img.id+" src='"+img.src+"' height='32' width='32'/>") 
    //     })
    

    let imgList=city.imgList
    // console.log("imgList",imgList)
    // console.log("imgList length",imgList.length)


    
    //Prevent population to receive negative values
    if(pop <= 0){ 
        pop = 0
    }

    if(pop < 1000 && imgList.length===0 ){
        let image = {}
        image.cityId = city.cityId
        image.id = "img"+city.cityId+0
        image.src = "img/"+randomizeCity()+".svg"
        imgList.push(image)
        console.log("imgList:",imgList)

        // Display cities in HTML
        $("#cityIcons"+city.cityId).empty()
        console.log("cleaned cities")
        imgList.map((img)=>{
        $("#cityIcons"+img.cityId).append("<img id="+img.id+" src='"+img.src+"' height='32' width='32'/>") 
        })

    }

    if(pop > 1000 && pop < 10000){
        let maxBuildings = Math.trunc(pop*0.001)
        if (maxBuildings>imgList.length){
            console.log("maxBuildings = %s imgList.length= %s",maxBuildings,imgList.length)

            // How many buildings to add?
            console.log("there is %s building(s) to add",maxBuildings - imgList.length)
            // create  as much images as buildings
            // push new image into array
            for (i= imgList.length;i<maxBuildings;i++){
                console.log("i = %s , maxBuildings = %s ",i,maxBuildings)
                let image = {}
                image.cityId = city.cityId
                let newId = imgList.length+1
                image.id = "img"+city.cityId+newId
                image.src = "img/"+randomizeCity()+".svg"
                imgList.push(image)
                console.log("imgList:",imgList)
                }
        
            // for (i= imgList.length;i<maxBuildings;i++){
            // console.log("i = %s , maxBuildings = %s ",i,maxBuildings)
            // let image = {}
            // image.cityId = city.cityId
            // image.id = "img"+city.cityId+i
            // image.src = "img/"+randomizeCity()+".svg"
            // imgList.push(image)
        
            // console.log("imgList:",imgList)
            // }
            // Display cities in HTML
            $("#cityIcons"+city.cityId).empty()
            console.log("cleaned cities")
            imgList.map((img)=>{
                $("#cityIcons"+img.cityId).append("<img id="+img.id+" src='"+img.src+"' height='32' width='32'/>") 
                })
            console.log("Added new random image")
        }
    }


            
            //Old If (pop > 1000 && pop < 10000){}
            //Append a new building
            // $("#cityIcons"+city.cityId).append("<img id='img"+city.cityId+countCityImg+"'src='img/"+randomizeCity()+".svg' height='32' width='32'/>")
           

            // for (i=countCityImg;i=buildingNumber;i++){
            //     let newId = i+1
            //     $("#cityIcons"+city.cityId+newId).append("<img id='img"+city.cityId+newId+"'src='img/"+randomizeCity()+".svg' height='32' width='32'/>")
            //     console.log("Added new random city")
            // }

         
        
    //     if(buildingNumber < countCityImg){
    //         //How many buildings to remove?
    //         console.log("there is %s buildings to remove",countCityImg - buildingNumber)
    //         $("#img"+city.cityId+countCityImg).remove();
    //         console.log("Removed city")
    //         // removeCount = countCityImg - buildingNumber
    //         // remove the latest buildings
    //         // for (i=buildingNumber;i=countCityImg;i--){      
    //         //     $("#img"+city.cityId+buildingNumber).remove();
    //         // }
            
    //     } 
    //     // $("#cityIcons"+city.cityId).html("<img src='img/"+randomImg+".svg' height='32' width='32'/>")
    // }




    //To Do : Update HTML with icon image when population reaches predefined intervals
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

    year++

    //Reset Timer
    if(year > maxYear) {
        clearInterval(timer);
        $('#tabResult').show()
        $('#cityCells').hide()
        $('#partyCells').hide()


    }
}, 200);

}

$('#simStart').click(
    function simStart(){
    console.log("received simStart button click")
    $('#startCell').hide()

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
        city.cityId = cityNumber
        // Create array to store image references
        city.imgList =[]
        // Assign properties to the city object with values from HTML
        city.cityName = $("#cityName"+cityNumber).text()
        city.popInit =  parseFloat($("#cityPop"+cityNumber).val())
        city.birthRate = parseFloat($("#cityBirth"+cityNumber).val())
        city.deathRate = parseFloat($("#cityDeath"+cityNumber).val())

        // Disasters values fixed for test purpose
        city.disasters = {
            disasterYear:[2,5,150],
            disasterName:["Eau","Feu","Terre"],
            disasterRate:[5,8,100]

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

$('#resetParty').click(
    function (){
        window.location.reload(false); // False force reload form cache instead of from server
    })
    
});


