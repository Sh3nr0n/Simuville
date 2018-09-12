$(document).ready(function () {
    console.log("script ok")

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
            $("#cityCells").append(
                "<div class='col'>\
                <h3>Ville "+cityNumber," </h3>\
                    <div class='form-group'>\
                        <label for='cityPop'>population initiale</label>\
                        <input type='number' class='form-control' id='cityPop' value='2' min='2' max='5000'>\
                    <div class='form-group'>\
                        <label for='cityBirth'>Taux de natalité</label>\
                        <input type='number' class='form-control' id='cityBirth' value='0.024' min='0' max='1'\
                            step='0.001'>\
                    </div>\
                    <div class='form-group'>\
                        <label for='cityDeath'>Taux de natalité</label>\
                        <input type='number' class='form-control' id='cityDeath' value='0.005' min='0' max='1'\
                            step='0.001'>\
                    </div>\
                </div>"
                
                )
        }

    }


        
        // if (party){
        // party.map((city) => {
        //     console.log("party",JSON.stringify(party))


        // })
    // }
        
    }

)




    
});