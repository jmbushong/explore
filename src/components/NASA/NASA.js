import React, {useState, useEffect} from 'react';
import {Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button} from 'reactstrap';


const NASA= (props) =>{

  //useState variables
  const [picture, setPicture]= useState('');

  //Regular variables
 const key = 'IwdNlEOiyB7TwhRcpPuOdQn80jo3LSB7csAeuY60'
 const latitude= props.lat;
 const longitude= props.long;


//NASA Satelite Image Fetch
  const fetchImage = () => {
    fetch(`https://api.nasa.gov/planetary/earth/assets?lon=${longitude}&lat=${latitude}&date=2020-8-20&dim=0.15&api_key=${key}`)
    .then((res)=> res.json())
    .then((json) => setPicture(json))  //In this line I am storing my json data in the variable named picture (defined above in useState)
    .catch((error) => console.log('error'))
  }
  
  //In this useEffect I am calling my fetch when the component loads, AND every time the value of props.coords gets updated 
    useEffect(() => {
      try{ fetchImage();
        console.log(latitude);
        console.log(longitude);
      }catch(e){
        console.log('error')
      }
      
    }, [props.coord]) //I had to add props here because my fetch was running before long & lat could be pulled in. This solves that issue!
    console.log(picture) //This console.logs json data
    console.log(picture.url)//Here I'm digging into the json data. I'm specifically pulling the url from the json data
    
    //This is the return for NASA.js. This posts the NASA bootstrap card to the DOM
    return(   
         <div>
        <Card className="card NASA">
          <CardImg top width="100%" src={picture.url} alt="Card image cap" />
          <CardBody>
            <CardTitle className="cardTitle">SATELITE IMAGE </CardTitle>
            <CardSubtitle></CardSubtitle>
            <CardText>This is a bird's-eye view of your current location!</CardText>
            
          </CardBody>
        </Card>
      </div>

    )

}

export default NASA;