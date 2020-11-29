import React, {useEffect, useState} from 'react';
import {Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button, Row, Col} from 'reactstrap';
import RestaurantInfo from "./RestaurantInfo.js";


// const baseURL = 'https://developers.zomato.com/api/v2.1/geocode/';
// const key = 'b8dcedfb7841301a3a9cdf35f1feef2f';
const key= 'a55eb505f4034d2062efda3dae74a1d4'


const Restaurants = (props) => {
    const [results, setResults] = useState([]);
    
    useEffect(() => {
        const fetchRestuarantImage = () => {

            const url = `https://developers.zomato.com/api/v2.1/geocode?lat=${props.lat}&lon=${props.long}`;

            // key goes in the header detail
            fetch(url, {
                method:'GET',
                headers: new Headers(
                    {'user-key': key
                }
                    
            )})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setResults(data.nearby_restaurants)
            })
            .catch(err => console.log(err));
        };

        fetchRestuarantImage();
    },[props]);
    
    // placeholder for restaurants with no thumbs/images
    let staticImgUrl = 'https://images.unsplash.com/photo-1544461772-722f499fa2a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80';

    // function that takes a string, checks if it's empty. If empty, return some static string, else return the input string
    const placeHolderImg = (thumbUrl) => {
        return (thumbUrl === '') ? staticImgUrl : thumbUrl;
    };

    console.log(results);

    const [modal, setModal] = React.useState(false);

    const [modalData, setModalData] = React.useState([]);
  
    const toggle = () => setModal(!modal);

    const openModal = (restaurant) => {
        setModalData(restaurant);
        setModal(true);  
    }

    return (

        <div className="container" id="results">
        <h3 className="titleForSearchResults">See Restaurant Search Results</h3>

            <Row>
            {
                
                    results?.map( (r) => (
                    <Col sm="6" md="4" lg="3" className="m-2" id={r.restaurant.res_id}>
                        <Card style={{ width: '18rem' }}>
                            <CardImg src={placeHolderImg(r.restaurant.thumb)} alt="restaurant-image" className="thumbSize" />
                            <CardBody>
                                <CardTitle className="restaurantName">{r.restaurant.name}</CardTitle>
                                <CardSubtitle className="text-muted restaurantPiecesSubtitle">Consumer Rating: {r.restaurant.user_rating.aggregate_rating} [<strong>{r.restaurant.user_rating.rating_text}</strong>]</CardSubtitle>
                                <CardText className="restaurantPiecesCardText">Location:  {r.restaurant.location.address}</CardText>
                                <Button onClick={()=>{openModal(r.restaurant);}}>More Information</Button>
                            </CardBody>
                           
                        </Card>
                    </Col>
                    )
                )
            }

            </Row>   
            <RestaurantInfo toggle ={toggle} modal ={modal} restaurant ={modalData} />
        </div>

    );
   
}



  


export default Restaurants;