import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import axios from "../../axios/axios";

class CityDropdown extends Component {
  componentDidUpdate() {
    this.getCities();
  }

  static get propTypes() {
    return { chosenCountryCodeFromHeader: PropTypes.string, onSetCity: PropTypes.func };
  }

  getCities() {
    this.cities = [];
    axios
      .get("/cities?country=" + this.props.chosenCountryCodeFromHeader)
      .then(response => {
        for (let i = 0; i < response.data.results.length; i++) {
          this.cities.push(response.data.results[i].city);
        }
      })
      .catch(error => {
        alert("There was an error getting a list of available cities:" + error);
      });
  }

  constructor(props) {
    super(props);
    this.cities = [];

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

  handleCitySelection(selectedCity) {
    this.props.onSetCity(selectedCity);
  }

  render() {
    let cityNames = this.cities.map((city, index) => {
        return <DropdownItem key={index} onClick={() => {
            this.handleCitySelection(city);
          }}>
          {city}
        </DropdownItem>;
    });
    return (
      <Dropdown size="sm" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>City</DropdownToggle>
        <DropdownMenu
          modifiers={{
            setMaxHeight: {
              enabled: true,
              order: 890,
              fn: (data) => {
                return {
                  ...data,
                  styles: {
                    ...data.styles,
                    overflow: 'auto',
                    maxHeight: 200,
                  },
                };
              },
            },
          }}
        >
          {cityNames.length !== 0 ? cityNames : "Pick a country"}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default CityDropdown;
