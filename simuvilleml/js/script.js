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

    let imgList=city.imgList
    console.log("imageList",imgList)

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

    }
    if(pop < 1000 && imgList.length>1 ){
        imgList.splice(1)
    }

    if(pop > 1000 && pop < 10000){
        let maxBuildings = Math.trunc(1+ pop*0.001)
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
        }

        if (maxBuildings<imgList.length){
            console.log("maxBuildings = %s imgList.length= %s",maxBuildings,imgList.length)

            // How many buildings to remove?
            console.log("there is %s building(s) to remove",imgList.length-maxBuildings)
            // remove images from array begining at poisition
            imgList.splice(maxBuildings)
            console.log("imgList:",imgList)


        }
    }

    if(pop > 10000){
        let maxBuildings = Math.trunc(9+pop*0.0001)
        console.log("maxBuildings = %s imgList.length= %s",maxBuildings,imgList.length)
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
        }

        if (maxBuildings<imgList.length){
            console.log("maxBuildings = %s imgList.length= %s",maxBuildings,imgList.length)

            // How many buildings to remove?
            console.log("there is %s building(s) to remove",imgList.length-maxBuildings)
            // remove images from array begining at poisition
            imgList.splice(maxBuildings)
            console.log("imgList:",imgList)


        }
    }

    // Display cities in HTML
    $("#cityIcons"+city.cityId).empty()
    console.log("city icons cleaned")
    imgList.map((img)=>{
        $("#cityIcons"+img.cityId).append("<img id="+img.id+" src='"+img.src+"' height='32' width='32'/>") 
        })
    console.log("city icons updated")

    year++

    //Reset Timer
    if(year > maxYear) {
    clearInterval(timer);
    $('#cityCells').hide()
    $('#partyCells').hide()
    $('#year').hide()
    $('#tabResult').show()
    //Display stats in this block
    //Get number of year from session storage
    let party ={}
    party = JSON.parse(sessionStorage.getItem('party'))
    console.log("party",party)
    $("#tabYear"+city.cityId).text(party.partyEndYear)
    $("#tabPop"+city.cityId).text(city.popInit)
    $("#tabBirth"+city.cityId).text(city.birthRate)
    $("#tabDeath"+city.cityId).text(city.deathRate)
    $("#tabFinalPop"+city.cityId).text(pop.toFixed())
    // $("#tabDisaster"+city.cityId).text(
        // city.map((value)=>{
        //     console.log("value",JSON.stringify(value))
        //     "<p>"+value.disasters.disasterYear+" : "+value.disasters.disasterName+"</p>"
        // }))
    console.log("city",city)
    // $("#tabDisaster"+city.cityId).text(
    //     city.disasters.disasterYear.map((disasterYear)=>{
    //         console.log("disasterYear",JSON.stringify(disasterYear))
    //         "<p>"+disasterYear+"</p>"
    //     }))


    $.each(city.disasters.disasterYear, function( index, disasterYear ) {
        $("#tabDisaster"+city.cityId).append(
            "<p>"+disasterYear+"</p>"
        )
      });

      //TO DO : Use .each to map city.disasters.disasterName values


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
            disasterYear:[2,5,100],
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


