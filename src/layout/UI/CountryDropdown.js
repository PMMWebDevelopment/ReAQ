import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import PropTypes from 'prop-types';
import axios from "../../axios/axios";

class CountryDropdown extends Component {
  constructor(props) {
    super(props);
    this.countries = [];

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  static get propTypes() {
    return { onSetCountry: PropTypes.func };
  }

  componentDidMount() {
    this.getCountries();
  }

  getCountries() {
    this.countries = [];
    axios
      .get("/countries")
      .then(response => {
        for (let i = 0; i < response.data.results.length; i++) {
          let country = [
            response.data.results[i].name,
            response.data.results[i].code
          ];
          this.countries.push(country);
        }
      })
      .catch(error => {
        alert(
          "There was an error getting a list of available countries:" + error
        );
      });
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  handleCountrySelection(selectedCountry, selectedCountryCode) {
    this.props.onSetCountry(selectedCountry, selectedCountryCode);
  }

  render() {
    let countryNames = this.countries.map((country, index) => {
      return (
        <DropdownItem
          key={index}
          onClick={() => {this.handleCountrySelection(country[0], country[1])}}
        >
          {country[0]}
        </DropdownItem>
      );
    });
    return (
      <Dropdown size="sm" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>Country</DropdownToggle>
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
          {countryNames}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default CountryDropdown;
