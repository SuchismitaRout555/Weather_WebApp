 console.log('suchismita rout');
const API_KEY = "7a58bebf615161dab7c2c015b3600ba9";
// const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=goa";

async function showWeather() {
    // let latitude = 15.3333;
    //  let longitude = 74.0833;

    let city = "goa";

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={API_KEY}&units=metric`);
    // var data = await response.json();
    const data = await response.json();
   
    console.log("Weather data:->" , data);
    let newPara = document.createElement('p');
    newPara.textContent=`${data?.main?.temp.toFixed(2)} °C`
    document.body.appendChild(newPara);

}
