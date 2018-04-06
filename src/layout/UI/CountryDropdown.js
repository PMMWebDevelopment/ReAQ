import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import axios from "../../axios/axios";

class CountryDropdown extends Component {
  // componentDidMount() {
  //   this.getCountries();
  // }

  getCountries() {
    axios
      .get("/countries")
      .then(response => {
        for (let i = 0; i < response.data.results.length; i++) {
          let country = [response.data.results[i].name, response.data.results[i].code];
          this.countries.push(country);
        }
      })
      .catch(error => {
        console.log("There was an error getting a list of available countries:" + error);
      });
  }

  constructor(props) {
    super(props);
    this.countries = [];

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
    let countryNames = this.countries.map((country, index) => {
        return <DropdownItem key={index}>{country[0]}</DropdownItem>;
    })
    return <Dropdown size="sm" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>Countries</DropdownToggle>
        <DropdownMenu modifiers={{ setMaxHeight: { enabled: true, order: 890, fn: data => {
                return { ...data, styles: { ...data.styles, overflow: "auto", maxHeight: 100 } };
              } } }}>
          {countryNames}
        </DropdownMenu>
      </Dropdown>;
  }
};

export default CountryDropdown;
