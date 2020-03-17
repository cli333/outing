import React from "react";
import "./Itinerary.css";
import RLDD from "react-list-drag-and-drop/lib/RLDD";

class Itinerary extends React.PureComponent {
  state = {
    destinations: this.props.destinations
  };

  destinationRenderer = (item, index) => {
    return (
      <div>
        {item.name}, {index}
      </div>
    );
  };

  handleRLDDChange = reorderedDestinations => {
    this.setState({ destinations: reorderedDestinations });
  };

  render() {
    const destinations = this.state.destinations;
    return (
      <div>
        <RLDD
          cssClasses="example"
          items={destinations}
          itemRenderer={this.destinationRenderer}
          onChange={this.handleRLDDChange}
        />
      </div>
    );
  }
}

export default Itinerary;
