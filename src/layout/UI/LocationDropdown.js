import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import axios from "../../axios/axios";

class LocationDropdown extends Component {
  constructor(props) {
    super(props);
    this.locations = [];

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }
  componentDidUpdate() {
    this.getLocations();
  }

  static get propTypes() {
    return {
      chosenCityFromHeader: PropTypes.string,
      onSetLocation: PropTypes.func
    };
  }

  getLocations() {
    this.locations = [];
    axios
      // NB: Hard coded for now - country needs to be obtained from selection made in countries dropdown
      .get("/locations?city=" + this.props.chosenCityFromHeader)
      .then(response => {
        for (let i = 0; i < response.data.results.length; i++) {
          this.locations.push(response.data.results[i].location);
        }
      })
      .catch(error => {
        alert(
          "There was an error getting a list of available locations:" + error
        );
      });
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  handleLocationSelection(selectedLocation) {
    this.props.onSetLocation(selectedLocation);
  }

  render() {
    let locationNames = this.locations.map((location, index) => {
      return (
        <DropdownItem
          key={index}
          onClick={() => {
            this.handleLocationSelection(location);
          }}
        >
          {location}
        </DropdownItem>
      );
    });
    return (
      <Dropdown size="sm" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>Location</DropdownToggle>
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
}

export default LocationDropdown;
