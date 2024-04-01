/* console.log('suchismita rout');
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
*/

const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");
const grantAccessContainer = document.querySelector(".grant-loction-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");


let oldTab = userTab;
const apikey = "7a58bebf615161dab7c2c015b3600ba9";
oldTab.classList.add("current-tab");
getfromSessionStorage();

function switchTab(newTab) {
    if (newTab != oldTab) {
        oldTab.classList.remove("current-tab");
        oldTab = newTab;
        oldTab.classList.add("current-tab");

        if (!searchForm.classList.contains("active")) {
            // search form wala contain is invisible if yes the  make it visiblee
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else {
            // main pehle search wale tab par tha ab your weather tab visiable karna hai 
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            // ab mai your wather tab me hu toh weather bhi display karo  
            getfromSessionStorage();
        }
    }
}

userTab.addEventListener("click", () => {
    //pass clicked tab as input parameter
    switchTab(userTab);
});

searchTab.addEventListener("click", () => {
    //pass clicked tab as input parameter
    switchTab(searchTab);
});

// check codinates are alredy present in session storage 
function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if (!localCoordinates) {
        //agar local coordinates nahi hai to 
        grantAccessContainer.classList.add("active");

    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);

    }

}

async function fetchUserWeatherInfo(coordinates) {
    const { lat, lon } = coordinates;
    // makr grant container inviable 
    grantAccessContainer.classList.remove("active");
    // make loader visible

    loadingScreen.classList.add("active");

    // api call
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`);
        const data = await response.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch (err) {
        loadingScreen.classList.remove("active");

    }


}

function renderWeatherInfo(weatherInfo) {
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[ data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudness = document.querySelector("[data-cloudiness]");
    console.log(weatherInfo);

    //fetch valiues from weatherinfo onjecy and put it ui elements
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `https://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity} %`;
    cloudness.innerText = `${weatherInfo?.clouds?.all} %`;



}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        function showAlert() {
            alert(" no Geolocation support available");
        }

    }
}

function showPosition(position) {
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,


    }
    sessionStorage.setItem("userCoordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

//grant Access buttom ke litener lagana padega like jab click ho tab live loaction acess kare andstore kare 

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);

const searchInput = document.querySelector("[data-searchInput]");
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if (cityName === "")
        return;
    else
        fetchSearchWeatherInfo(cityName);


})
async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try {
        const response =  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch (err) {

    }

}