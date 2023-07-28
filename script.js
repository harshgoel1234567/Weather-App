const userTab=document.querySelector("[data-userWeather]");
const searchTab=document.querySelector("[data-SearchWeather]");
const userContainer=document.querySelector(".weather-container");

const grantAccessContainer=document.querySelector(".grant-location-container");

const  searchForm=document.querySelector("[data-searchForm");

const loadingScreen=document.querySelector(".loading-container");

const userInfoContainer=document.querySelector(".user-info-container");
 
let currentTab=userTab;
const API_KEY="1b958fc9b2e66b55dd62fc2c0e13f68c";

currentTab.classList.add("current-tab");

function switchTab(clickedTab)
{
    if(clickedTab!=currentTab)
    {
        currentTab.classList.remove("current-tab");
       currentTab=clickedTab; 
       currentTab.classList.add("current-tab");

       if(!searchForm.classList.contains("active"))
       {
        userInfoContainer.classList.remove("active");
        grantAccessContainer.classList.remove("active");
        searchForm.classList.add("active");
       }
       else 
       {
        userInfoContainer.classList.add("active");
    
        searchForm.classList.remove("active");
        getfromSessionStorage();
       }
       //check  if cordinates are present in session storage
    async function getfromSessionStorage()
    {
        const localCoordinates=sessionStorage.getItem("user-coordinates");
        if(!localCoordinates)
        {
            //agar local cordinates nahi mile

            grantAccessContainer.classList.add("active");

        }
        else{
            const coordinates=JSON.parse(localCoordinates);
            fetchUserWeatherInfo(coordinates);

            const data=await response.JSON();
        }
    }
    
    }
}
async function fetchUserWeatherInfo(coordinates)
{
    const {lat,log}=coordinates;
    grantAccessContainer.classList.remove("active");
    loadingScreen.classList.add("active");

    try
    {
        const res=await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        const data=await response.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);

    }
    catch(e)
    {
        loadingScreen.remove("active");
    }

}

function renderWeatherInfo(weatherInfo)
{
    //firstly we have to fetch element

    const cityName=document.querySelector("[data-cityName]");
    const countryIcon=document.querySelector("[data-countryIcon]");
    const desc=document.querySelector("[data-weatherDesc]");

    const weatherIcon=document.querySelector("[data-weatherIcon]");
    const temp=document.querySelector("[data-temp]");
    const windspeed=document.querySelector("[data-windspeed]");
    const humidity=document.querySelector("[data-humidity]");

    const cloudiness=document.querySelector("[data-cloudiness]");

    //fetch and put value in UI
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = weatherInfo?.main?.temp;
    windspeed.innertext = weatherInfo?.wind?.speed;
    humidity.innertext = weatherInfo?.main?.humidity;
    cloudiness.innerText = weatherInfo?.clouds?.all;
    


}
userTab.addEventListener('click',()=>
{
    
    switchTab(userTab)
}
)
searchTab.addEventListener('click',()=>
{
    
    switchTab(searchTab)
}
)