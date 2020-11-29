import React from 'react';
import { Route, Link, Switch} from 'react-router-dom';

import Restaurants from '../Restaurants/Restaurants'
import NASA from '../NASA/NASA';
import WeatherComponent from '../Weather/Weather';

const Sitebar = () => {

    return(
        <div className="sitebar">
            <div className="sitebar-list-styling">
                <ul className="sitebar-list-unstyled">
                    <li><Link to="/nasa">NASA</Link></li>
                    <li><Link to="/weather">Weather</Link></li>
                    <li><Link to="/restaurants">Restaurants</Link></li>
                    
                </ul>
            </div>
            <div className="sitebar-route">
                <Switch>
                    <Route exact path="/nasa"><NASA /></Route>
                    <Route exact path="/weather"><WeatherComponent /></Route>
                    <Route exact path="/restaurants"><Restaurants /></Route>
                </Switch>
            </div>
        </div>
    )
}

export default Sitebar;