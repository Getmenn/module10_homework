const btn = document.querySelector('#btn');
const geo = document.querySelector('#geo');
const text = document.querySelector('.text-area');
const input = document.querySelector('.input-area');

const wsUri = "wss://echo-ws-service.herokuapp.com";

let websocket;



function writeToScreen(message, type) {
    if (type != 'responce'){
        text.innerHTML += `<p class="text-box">${message}</p>`;
    }
    else{
        text.innerHTML += `<p class="text-box" style=" margin-left: 13px;">${message}</p>`;

    }
}

btn.addEventListener('click', () => {
    websocket = new WebSocket(wsUri);
    
    websocket.onmessage = function(evt,type) {
        writeToScreen(evt.data,'responce');
    };
    
    websocket.onclose = function(evt) {
        writeToScreen("DISCONNECTED",'responce');
      };

    websocket.onerror = function(evt) {
        writeToScreen(
          'ERROR:' + evt.data
        );
    };
    writeToScreen(input.value, 'request');
    setTimeout(() =>{websocket.send(input.value,'responce')}, 1000)
})

geo.addEventListener ('click', () => {
    if (!navigator.geolocation) {
        writeToScreen('Geolocation не поддерживается вашим браузером');
      } else {
        writeToScreen('Определение местоположения…');
        navigator.geolocation.getCurrentPosition(success, error);
      }
})

const error = () => {
    writeToScreen('Невозможно получить ваше местоположение');
  }
  
  
const success = (position) => {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
  
    writeToScreen(`<a href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}">Ссылка на карту</a>`);
}