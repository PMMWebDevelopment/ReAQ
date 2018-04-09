import React, { Component } from 'react';
import PropTypes from "prop-types";
import classes from './Header.css';
import { Container, Row, Col } from 'reactstrap';
import AboutModal from './UI/AboutModal';
import CountryDropdown from './UI/CountryDropdown';
import CityDropdown from './UI/CityDropdown';
import LocationDropdown from './UI/LocationDropdown';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenCountry: "",
      chosenCountryCode: "",
      chosenCity: "",
      chosenLocation: "",
    };
    this.setCountry = this.setCountry.bind(this);
    this.setCity = this.setCity.bind(this);
    this.setLocation = this.setLocation.bind(this);
  }

  static get propTypes() {
    return { locationCallbackFromAppJS: PropTypes.func };
  }

  setCountry(clickedCountry, clickedCountryCode) {
    this.setState({
      chosenCountry: clickedCountry,
      chosenCountryCode: clickedCountryCode
    });
  }

  setCity(clickedCity) {
    this.setState({
      chosenCity: clickedCity
    });
  }

  setLocation(clickedLocation) {
    this.setState({
      chosenLocation: clickedLocation
    });
    this.props.locationCallbackFromAppJS(clickedLocation);
  }

  render() {
    return <div className={classes.Header}>
        <Container>
          <Row>
            <Col xs="2">
              <h1>ReAQ</h1>
            </Col>
            <Col className={classes.Dropdown} xs="3">
              <CountryDropdown onSetCountry={this.setCountry} />
              {this.state.chosenCountry}
            </Col>
            <Col className={classes.Dropdown} xs="3">
              <CityDropdown chosenCountryCodeFromHeader={this.state.chosenCountryCode} onSetCity={this.setCity} />
              {this.state.chosenCity}
            </Col>
            <Col className={classes.Dropdown} xs="3">
              <LocationDropdown chosenCityFromHeader={this.state.chosenCity} onSetLocation={this.setLocation} />
              <div>{this.state.chosenLocation}</div>
            </Col>
            <Col className={classes.About} xs="1">
              <AboutModal />
            </Col>
          </Row>
        </Container>
      </div>;
  }
}

export default Header;