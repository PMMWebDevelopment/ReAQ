import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import axios from "../../axios/axios";

class LocationDropdown extends Component {
  // componentDidMount() {
  //   this.getLocations();
  // }

  getLocations() {
    axios
      // NB: Hard coded for now - country needs to be obtained from selection made in countries dropdown
      .get("/locations?city=Tasmania Region")
      .then(response => {
        for (let i = 0; i < response.data.results.length; i++) {
          this.locations.push(response.data.results[i].location);
        }
      })
      .catch(error => {
        console.log(
          "There was an error getting a list of available locations:" + error
        );
      });
  }

  constructor(props) {
    super(props);
    this.locations = [];

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    let locationNames = this.locations.map((location, index) => {
      return <DropdownItem key={index}>{location}</DropdownItem>;
    });
    return (
      <Dropdown size="sm" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>Locations</DropdownToggle>
        <DropdownMenu
          modifiers={{
            setMaxHeight: {
              enabled: true,
              order: 890,
              fn: data => {
                return {
                  ...data,
                  styles: { ...data.styles, overflow: "auto", maxHeight: 100 }
                };
              }
            }
          }}
        >
          {locationNames}
        </DropdownMenu>
      </Dropdown>
    );
  }
};

export default LocationDropdown;
