import React, { useEffect, useState } from "react";
import { Row, Col, Button, Container } from "reactstrap";
import "./App.css";
import NASA from "./components/NASA/NASA";
import Weather from "./components/Weather/Weather";
import { BrowserRouter as Router } from "react-router-dom";
import Restaurants from "./components/Restaurants/Restaurants";
import RestaurantPieces from "./components/Restaurants/RestaurantPieces";


// This is our main component that controls the landing page & main page

function App() {
  //useState Variables
  const [pos, setPos] = useState({ lat: "", long: "" });
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [button, setButton] = useState("");
  const [locationName, setLocationName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [results, setResults] = useState("");

  //This function will grab the user's location (lat & long) when run
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCoords);
    } else {
      alert("GeoLocation not enabled");
    }
  };

  //This function sets the user's location to the variable pos
  const getCoords = (pos) => {
    setPos({ lat: pos.coords.latitude, long: pos.coords.longitude });
  };

  //This useEffect runs the getLocation function once (when the component is loaded)
  useEffect(() => {
    getLocation();
  }, []);

  //This function changes the toggles value of showRestaurants
  const toggle = () => setShowRestaurants(!showRestaurants);

  const rest = () => {
    return (
      <div className="restaurantResults">
        <br />
        {/* if showRestaurant is true and Restaurant component is true, then show restaurant component*/}
        {showRestaurants && (
          <Restaurants coord={pos} lat={pos.lat} long={pos.long} />
        )}
      </div>
    );
  };

  //This fetch grabs the coordinates stored in pos and converts them to a city and state name

  const fetchLocation = () => {
    fetch(
      `https://api.radar.io/v1/geocode/reverse?coordinates=${pos.lat},${pos.long}`,
      {
        method: "GET",
        headers: new Headers({
          Authorization: "prj_live_pk_ee962ff8986f661f6a8037800a4e5e279c6cbac2",
        }),
      }
    )
      .then((res) => res.json())
      .then((json) => setLocationName(json))
      .catch((error) => console.log("error"));
  };

  console.log(`Location Name:' ${locationName}`);

  //This useEffect runs the above fetch when the component loads & when the variable results is updated. In this case you'll see a message in the console saying that our fetch initially failed. This is because the fetch ran before the user's location was logged. The fetch then runs a second time once the variable results has been updated. This is the variable linked to the search bar api results.

  useEffect(() => {
    try {
      fetchLocation();
    } catch (e) {
      console.log("error");
    }
  }, [results]);

  //This is the fetch for the autocomplete search bar
  const fetchSearchBar = () => {
    fetch(`https://api.radar.io/v1/search/autocomplete?query=${postalCode}`, {
      method: "GET",
      headers: new Headers({
        Authorization: "prj_live_pk_ee962ff8986f661f6a8037800a4e5e279c6cbac2",
      }),
    })
      .then((res) => res.json())
      .then((json) => setResults(json))
      .catch((error) => console.log("error"));
  };

  //This useEffect runs the Autocomplete Search Bar API & Stores the lat/long from those results to the POS variable. It runs when the component first loads and when the user types in the search bar
  useEffect(() => {
    try {
      fetchSearchBar();
      getSearchCoords();
    } catch (e) {
      console.log("error");
    }
  }, [postalCode]);

  //This is the function that actually takes the json results frm the Autocomplete Search Bar API & stores it into the pos variable
  const getSearchCoords = () => {
    setPos({
      lat: results.addresses[0].latitude,
      long: results.addresses[0].longitude,
    });
  };

  //This function controls the switch from our landing page to the main page to restaurant listings. This is controlled through logic that utilizes an onClick, useState boolean values and a ternary.

  const showCards = () => {
    console.log(locationName);
    return button === "current" ? (
      <React.Fragment>
      <div className="cards">
        <h1 className="city">
          {locationName.addresses !== undefined
            ? `${locationName.addresses[0].city}, ${locationName.addresses[0].state}`
            : "location not set"}
        </h1>
        <Row className="cardPlacement">
          <Col sm="3">
            {" "}
            <NASA coord={pos} lat={pos.lat} long={pos.long} />{" "}
          </Col>
          <Col sm="3">
            {" "}
            <Weather coord={pos} lat={pos.lat} long={pos.long} />{" "}
          </Col>
          <Col sm="3">
            {" "}
            <RestaurantPieces
              coord={pos}
              lat={pos.lat}
              long={pos.long}
              viewRestaurants={toggle}
            />{" "}
          </Col>
          {rest()}
        </Row>
   
      </div>
      <Container className="themed-container cardFooter" fluid="xs">
      <div className="back"><Button onClick={(e) => setButton("")} className="buttonBack"><i class="fas fa-backward"></i>Back</Button></div>
      </Container></React.Fragment>
    ) : (
      <div className="main">
        <Container className="themed-container landing" >
          <Col xs="6" className=" heading">
            {" "}
            <div className="homeButton">
              <a>
                <i className="fab fa-wpexplorer"></i>
              </a>
            </div>
             <h1 className="title">EXPLORE YOUR SURROUNDINGS </h1>
           
          </Col>
        </Container>
        <Container className="themed-container footerMain" fluid="xs">
          <Col xs="12" className="locationSelection">
            <div>
              {" "}
              <input
                className="citySearch"
                placeholder="CITY, STATE"
                value={postalCode !== "" ? postalCode : ""}
                onChange={(e) => setPostalCode(e.target.value)}
              ></input>
              <button
                className="go"
                onChange={(e) => getSearchCoords()}
                onClick={(e) => setButton("current")}
              >
                GO
              </button>
            </div>

            <h5>OR</h5>
            <button
              className="currentLoc"
              onClick={(e) => setButton("current")}
            >
              {" "}
              USE CURRENT LOCATION
            </button>
          </Col>
        </Container>
      </div>
    );
  };

  console.log(pos);
  //This is the RETURN for APP.JS. This is where the function showCards() is called and printed to the DOM

  return <div> {showCards()} </div>;
}

export default App;
