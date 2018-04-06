import React, { Component } from 'react';
import classes from './Header.css';
import { Container, Row, Col } from 'reactstrap';
import AboutTooltip from './UI/AboutTooltip';
import CountryDropdown from './UI/CountryDropdown';
import CityDropdown from './UI/CityDropdown';
import LocationDropdown from './UI/LocationDropdown';

class Header extends Component {
  render() {
    return <div className={classes.Header}>
        <Container>
          <Row>
            <Col xs="1">
              <h1>ReAQ</h1>
            </Col>
            <Col className={classes.Dropdown} xs="3">
              <CountryDropdown />
              Mongolia(HC)
            </Col>
            <Col className={classes.Dropdown} xs="3">
              <CityDropdown />
              Ulaanbataar(HC)
            </Col>
            <Col className={classes.Dropdown} xs="4">
              <LocationDropdown />
              100ail(HC)
            </Col>
            <Col className={classes.About} xs="1">
              <AboutTooltip />
            </Col>
          </Row>
        </Container>
      </div>;
  }
};

export default Header;