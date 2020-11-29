import React, {useState, useEffect} from 'react';
import {Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button} from 'reactstrap';
// import WeatherButton from '../WeatherButton';



// baseURL = api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={ee6006ca611107ec92d5d3cfd766f153
// }
// ee6006ca611107ec92d5d3cfd766f153



const Weather = (props) => {


  const [currentWeather, setCurrentWeather]= useState('');
  const[button, setButton]= useState(false);

//   const [ fahrenheit, setFahrenheit] = useState('')
//   const [ celsius, setCelsius] = useState('')


    const key = '39f3730b34fe49d842602e2754374ec2'

    const latitude= props.lat;
    const longitude= props.long;

  const getWeather = (props) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`)
    .then((res)=> res.json())                                
    .then((json) => setCurrentWeather(json.main.temp))    
    .catch((err) => {
        console.log(err)
    })

}

console.log(currentWeather);


        let fahrenheit = Math.round((currentWeather - 273.15) * 1.8 + 32);
  
        let celsius = Math.round(currentWeather-273.15);


getWeather();



          return (
      <div className="main">
      <Card>
      <CardImg top  className="imageweather" width="100%" src="https://openweather.co.uk/storage/app/media/we-are-pleased-announce-our-new-statistical-weather-data-api-now-available.png" alt="Card image cap" />
      <CardBody>
        <CardTitle>TEMPERATURE</CardTitle>
        
        <CardText className="number">
          {button === true ? fahrenheit + '°F'
          : celsius + '°C'} 
         
        </CardText>
        <br></br>
        <Button className="cardButton" onClick={(e)=> {button === true ? setButton(false): setButton(true)}}>{button ===true? 'Click for Celsius': 'Click for Fahrenheit' }</Button>

      </CardBody>
    </Card>
      </div>
    )

 }  
    


export default Weather;