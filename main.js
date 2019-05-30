
//grabs elements from html doc.
const cityInput = document.getElementById('cityInput');
const cityInputBtn = document.getElementById('cityInputBtn');
const result = document.getElementById('result');

const api = 'f24f40b1c24505685fce3b8acd0fcffc'; //api code used from openweather


// listens for specific event.
cityInput.addEventListener('keypress', enterKeyPress);
cityInputBtn.addEventListener('click', weather);

function enterKeyPress(e){ //function called in listener.
    if(e.key == 'Enter'){ //sees if event key is the 'Enter' key
        weather(); //executes function
    }
}

// "central" fucntion
function weather(){
    if(cityInput.value == ''){ // called if input has nothing inside.
        result.textContent = 'Please, enter a valid city.';//sets text of result.
    }

    let search = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityInput.value + '&appid=' + api;
    httpRequest(search, jsonResponse); //calls httpRequest function with the inputted params of variable search and function jsonResponse
}

//fucntion that comunicates with the API server.
function httpRequest(url, callback){
    var httpRequest = new XMLHttpRequest(); //creates new object from XMLHttpRequest

    httpRequest.onreadystatechange = () =>{ //arrow function which works as anonymouse function.
        if(httpRequest.readyState == 4){ //checks to see if ready state is "done".
            callback(httpRequest.responseText); //callback which is set to jsonResponse when called. Gives back responseText into jsonRespones func.
        }
        if (httpRequest.status == 404) { //checks to see if there is a 404 error from wrong input.
            result.textContent = 'Please, enter a valid city.';
        }
    }

    httpRequest.open('GET', url, true); //sets method, url and well as if it is async
    httpRequest.send(); //sends the request to the server.
}



//function in charge of output from httpRequest function.
function jsonResponse(response){
    let jsonObj = JSON.parse(response); //sets jsonObj to be JSON.
    result.textContent = Math.floor(jsonObj.main.temp - 273) + '°C'; //replaces text with the text given from API.
}

