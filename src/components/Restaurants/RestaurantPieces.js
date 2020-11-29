import React from "react"
import {Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import { Router, Route, Link, Switch} from 'react-router-dom';

const RestaurantPieces = (props) => {

    const {viewRestaurants} = props;

    return(
        <div>
          
   

        <Card>
        <CardImg top width="100%" src="https://images.unsplash.com/photo-1534824394572-a24ff25bbb5e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1493&q=80/318x180.svg" alt="Card image cap" />
        <CardBody>


          <CardTitle className="restaurantPiecesCardTitle">TOP RESTAURANTS </CardTitle>
          <CardSubtitle className="restaurantPiecesSubtitle">Hungry?</CardSubtitle>
          <CardText className="restaurantPiecesCardText">Having a hard time finding a place to eat? Click the link below to see nearby restaurants. </CardText>
          <br></br>
         <Button className="cardButton" onClick={viewRestaurants}>See Restaurants</Button>

        </CardBody>
        </Card>
        
   

        </div>
    )
}

export default RestaurantPieces;