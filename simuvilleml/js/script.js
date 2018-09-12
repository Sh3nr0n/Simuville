$(document).ready(function () {
    console.log("script ok")

$('#cityCells').hide()
$("#cityNumber1").hide()
$("#cityNumber2").hide()
$("#cityNumber3").hide()


    //Get the number of cities

$('#setUpParty').click(
    function setUpParty(){
        let party = {}         
        console.log("received setUpParty button click")

        party.cityCount = $('#cityCount').val()
        party.partyEndYear = $('#partyEndYear').val()

        console.log("party = %s, cityCount = %s, partyEndYear = %s",JSON.stringify(party), party.cityCount,party.partyEndYear)
        // sessionStorage.setItem("party",JSON.stringify(party))

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





    
});