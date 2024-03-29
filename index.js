 console.log('suchismita rout');
const apiKey = "7a58bebf615161dab7c2c015b3600ba9";
// const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=goa";

async function fetchWeatherDetails() {

    try{
// let latitude = 15.3333;
    //  let longitude = 74.0833;

    let city = "goa";

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    // var data = await response.json();
    const data = await response.json();
   
    console.log("Weather data:->" , data);
   ///  let newPara = document.createElement('p');
   /// newPara.textContent=`${data?.main?.temp.toFixed(2)} °C`
    /// document.body.appendChild(newPara);
     renderWeatherInfo(data);
    }
    catch(err){
  // handle the error here 
    }
    

}
async function getCustomWeatherDetailts(){
    try{
       let latitude = 17.6333;
       let longitude= 18.3333;
       let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={apiKey}&units=metric`);
        let data = await result.json();
        console.log(data);
    }
    catch(err){
        console.log("Error Found" , err);

    }

}

function switchTab(clickedTab){
    apiErrorContainer.classList.remove("active");
    if (clickedTab !== currentTab){
        currentTab.classList.remove("current-tab");
        currentTab=clickedTab;
        currentTab.classList.add("current-tab");

        if (!searchForm.classList.contains("active")){
        userInfoContaier.classList.remove("active");
        grantAccessContainer.classList.remove("active");
        searchForm.classList.add("active");
    }
    else{
        searchForm.classList.remove("active");
        userInfoContaier.classList.remove("active");
        getFromSessionStorage();
    }

// console.log("current tab" , current tab );

    }
}

//allow your location 

function getLocation(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);

    }
    else{
        console.log("No geo Location Support");
    }
}

function showPosition(position){
    let lat =position.coords.latitude;
    let longi = position.coords.longitude;


    console.log(lat);
    console.log(longi);
}