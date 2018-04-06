import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import axios from "../../axios/axios";

class CityDropdown extends Component {
  // componentDidMount() {
  //   this.getCities();
  // }

  getCities() {
    axios
      // NB: Hard coded for now - country needs to be obtained from selection made in countries dropdown
      .get("/cities?country=AU")
      .then(response => {
        for (let i = 0; i < response.data.results.length; i++) {
          this.cities.push(response.data.results[i].city);
        }
      })
      .catch(error => {
        console.log(
          "There was an error getting a list of available cities:" + error
        );
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

  render() {
    let cityNames = this.cities.map((city, index) => {
      return <DropdownItem key={index}>{city}</DropdownItem>;
    });
    return (
      <Dropdown size="sm" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>Cities</DropdownToggle>
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
          {cityNames}
        </DropdownMenu>
      </Dropdown>
    );
  }
};

export default CityDropdown;
