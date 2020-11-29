import React, { useEffect } from 'react'
import {Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button, Row, Col} from 'reactstrap';


const baseURL = 'http://api.openweathermap.org/data/2.5/weather';
const key = '39f3730b34fe49d842602e2754374ec2';
const units = 'imperial';

const Climate = (props) => {
    const [temperature, setTemperature] = React.useState({});
    const[button, setButton]= React.useState(false);

    useEffect(() => {
        const fetchWeatherImage = () => {
        let url = `${baseURL}?lat=${props.lat}&lon=${props.long}&appid=${key}&units=${units}`;
    
        fetch(url)
            .then(data => data.json())
            .then(jsonified => setTemperature(jsonified))
            .catch(err => console.log(err));
        }
        
        fetchWeatherImage();
    },[props] );

        console.log(temperature);

        let showMe = true;

    // const FahrenheitToCelsius = () => {
    //     let fahrenheitTemp = temperature.main.temp;
    //     let celsiusTemp = (Math.floor(fahrenheitTemp -32) * 95/9);
    //     return celsiusTemp;
    // }

    const placeHolderImage = () => {
        let clouds;
        let clear;
        let rain;

        let cloudyImage = "../../src/assets/cloudy.png";
        let clearImage = "../../src/assets/clear";
        let rainImage = "../../src/assets/rain";
        let snowImage = "../../src/assets/snow";
        let condition = temperature.weather[0].main;
    
        return (condition === clouds) ? cloudyImage 
        : (condition === clear) ? clearImage
        : (condition === rain) ? rainImage
        :snowImage; 
    }

    const fahrenheitTemp = temperature.main === undefined ? '' : temperature.main.temp;
        const celsiusTemp = (Math.floor(fahrenheitTemp -32) * 95/9);



    return(
        <div>

    <Card>
        <CardImg top width="100%" src={placeHolderImage} alt="Card image cap" />
        <CardBody>
          <CardTitle>Weather</CardTitle>

          <Button onClick={(e)=> {button === true ? setButton(false): setButton(true)}}>Toggle for Celsius/Fahrenheit</Button>
        </CardBody>
      </Card>
           { showMe && (<Card></Card>)}
        </div>
        
    )
}

export default Climate;

