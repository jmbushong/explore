import React from 'react';
import {Button} from "reactstrap";

import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

const RestaurantInfo = (props) => {
    const {
        toggle,
        modal,
        restaurant
    } = props;
  
    return (
      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
          <ModalBody>
            <dl className='text-center'>
                <dt>Cuisines: </dt>
                <dd>{restaurant?.cuisines}</dd>
                <dt>Average cost for two:</dt>
                <dd>${restaurant?.average_cost_for_two}</dd>
                <dt>Delivery: </dt>
                <dd>{(restaurant?.R?.has_menu_status.delivery === 1 ) ? "Yes" : "No" }</dd>
                <dt>Takeaway: </dt>
                <dd>{(restaurant?.R?.has_menu_status.takeaway === 1 ) ? "Yes" : "No" }</dd>
            </dl>
          </ModalBody>
          <ModalFooter>
            
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

  export default RestaurantInfo;