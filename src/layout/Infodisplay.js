import React, { Component } from 'react';
import PropTypes from "prop-types"
import { Container, Row, Col } from 'reactstrap';
import classes from './Infodisplay.css';
import axios from "../axios/axios";
import moment from 'moment';
import Spinner from './UI/Spinner';
import Gauge from "react-svg-gauge";

class Infodisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pollutantData: [],
      coData: [],
      no2Data: [],
      o3Data: [],
      pm25Data: [],
      pm10Data: [],
      so2Data: [],
      chosenLocation: "",
      loading: false,
    };
  }

  static get propTypes() {
    return {
      chosenLocationFromAppJS: PropTypes.string,
    };
  }

  componentDidUpdate() {
    if (this.props.chosenLocationFromAppJS && this.props.chosenLocationFromAppJS !== this.state.chosenLocation) {
      console.log(this.props.chosenLocationFromAppJS);
      this.setState({chosenLocation: this.props.chosenLocationFromAppJS});
      console.log(this.state.chosenLocation);
      this.getMeasurements();
    }
  }
  
  getMeasurements() {
      this.setState({
      pollutantData: [],
      coData: [],
      no2Data: [],
      o3Data: [],
      pm25Data: [],
      pm10Data: [],
      so2Data: [],
      loading: true
    });
      axios
      .get("/latest?location=" + this.props.chosenLocationFromAppJS)
      // .get("/latest?location=Hobart")
      .then(response => {
        this.setState({loading: false});
        console.log(response);
        for (let i = 0; i < response.data.results[0].measurements.length; i++) {
          this.state.pollutantData.push(
            response.data.results[0].measurements[i]
          );
        }
        this.filterDataByPollutant();
      })
      .catch(error => {
        console.log(
          "There was an error getting a list of available measurements:" + error
        );
      });
  }

  filterDataByPollutant() {
    for (let i = 0; i < this.state.pollutantData.length; i++) {
      // console.log(this.pollutantData[i].parameter);
      switch (this.state.pollutantData[i].parameter) {
        case "co":
          this.setState({ coData: this.state.pollutantData[i] });
          break;
        case "no2":
          this.setState({ no2Data: this.state.pollutantData[i] });
          break;
        case "o3":
          this.setState({ o3Data: this.state.pollutantData[i] });
          break;
        case "pm25":
          this.setState({ pm25Data: this.state.pollutantData[i] });
          break;
        case "pm10":
          this.setState({ pm10Data: this.state.pollutantData[i] });
          break;
        case "so2":
          this.setState({ so2Data: this.state.pollutantData[i] });
          break;
      }
    }
  }

  render() {

    const gaugeTopLabelStyle = {
      fill: "white",
      fontWeight: "bold",
      fontSize: "14px"
    };

    const gaugeValueLabelStyle = {
      fill: "white",
      fontWeight: "bold",
      fontSize: "24px"
    };

    const gaugeWidth = 250;
    return this.props.chosenLocationFromAppJS ? <Container className={classes.Infodisplay}>
        {!this.state.loading ? <Row>
            <Col md={{ offset: 1, size: 10 }} lg={{ offset: 0, size: 4 }}>
              {this.state.coData.value > 0 ? <div className={classes.Pollutant}>
                  <div>
                    <Gauge label="CARBON MONOXIDE (CO): µg/m³" topLabelStyle={gaugeTopLabelStyle} valueLabelStyle={gaugeValueLabelStyle} minMaxLabelStyle={gaugeTopLabelStyle} value={this.state.coData.unit === "ppm" ? (this.state.coData.value * 1145).toFixed(2) : this.state.coData.value.toFixed(2)} width={gaugeWidth} height={200} max={10000} color="#ff0000" />
                  </div>
                  <div className={classes.PollutantData}>
                    {moment(this.state.coData.lastUpdated).format("D MMM YYYY HHmm")}. Source: {this.state.coData.sourceName}
                  </div>
                </div> : <div className={classes.DataNotAvailable}>
                  CARBON MONOXIDE (CO) - No data available
                </div>}
            </Col>
            <Col md={{ offset: 1, size: 10 }} lg={{ offset: 0, size: 4 }}>
              {this.state.so2Data.value > 0 ? <div className={classes.Pollutant}>
                  <div>
                    <Gauge label="SULFUR DIOXIDE (SO₂): µg/m³" topLabelStyle={gaugeTopLabelStyle} valueLabelStyle={gaugeValueLabelStyle} minMaxLabelStyle={gaugeTopLabelStyle} value={this.state.so2Data.unit === "ppm" ? (this.state.so2Data.value * 2620).toFixed(2) : this.state.so2Data.value.toFixed(2)} width={gaugeWidth} height={200} max={125} color="#ff0000" />
                  </div>
                  <div className={classes.PollutantData}>
                    {moment(this.state.so2Data.lastUpdated).format("D MMM YYYY HHmm")}. Source: {this.state.so2Data.sourceName}
                  </div>
                </div> : <div className={classes.DataNotAvailable}>
                  SULFUR DIOXIDE (SO₂) - No data available
                </div>}
            </Col>
            <Col md={{ offset: 1, size: 10 }} lg={{ offset: 0, size: 4 }}>
              {this.state.no2Data.value > 0 ? <div className={classes.Pollutant}>
                  <div>
                    <Gauge label="NITROGEN DIOXIDE (NO₂): µg/m³" topLabelStyle={gaugeTopLabelStyle} valueLabelStyle={gaugeValueLabelStyle} minMaxLabelStyle={gaugeTopLabelStyle} value={this.state.no2Data.unit === "ppm" ? (this.state.no2Data.value * 1880).toFixed(2) : this.state.no2Data.value.toFixed(2)} width={gaugeWidth} height={200} max={40} color="#ff0000" />
                  </div>
                  <div className={classes.PollutantData}>
                    {moment(this.state.no2Data.lastUpdated).format("D MMM YYYY HHmm")}. Source: {this.state.no2Data.sourceName}
                  </div>
                </div> : <div className={classes.DataNotAvailable}>
                  NITROGEN DIOXIDE (NO₂) - No data available
                </div>}
            </Col>
          </Row> : <Row>
            <Spinner />
          </Row>}
        {!this.state.loading ? <Row>
            <Col md={{ offset: 1, size: 10 }} lg={{ offset: 0, size: 4 }}>
              {this.state.o3Data.value > 0 ? <div className={classes.Pollutant}>
                  <div>
                    <Gauge label="OZONE/TRIOXYGEN (O₃): µg/m³" topLabelStyle={gaugeTopLabelStyle} valueLabelStyle={gaugeValueLabelStyle} minMaxLabelStyle={gaugeTopLabelStyle} value={this.state.o3Data.unit === "ppm" ? (this.state.o3Data.value * 2000).toFixed(2) : this.state.o3Data.value.toFixed(2)} width={gaugeWidth} height={200} max={120} color="#ff0000" />
                  </div>
                  <div className={classes.PollutantData}>
                    {moment(this.state.o3Data.lastUpdated).format("D MMM YYYY HHmm")}. Source: {this.state.o3Data.sourceName}
                  </div>
                </div> : <div className={classes.DataNotAvailable}>
                  OZONE/TRIOXYGEN (O₃) - No data available
                </div>}
            </Col>
            <Col md={{ offset: 1, size: 10 }} lg={{ offset: 0, size: 4 }}>
              {this.state.pm25Data.value > 0 ? <div className={classes.Pollutant}>
                  <div>
                    <Gauge label="PARTICULATES &le;2.5µm (PM₂.₅): µg/m³" topLabelStyle={gaugeTopLabelStyle} valueLabelStyle={gaugeValueLabelStyle} minMaxLabelStyle={gaugeTopLabelStyle} value={this.state.pm25Data.value.toFixed(2)} width={gaugeWidth} height={200} max={30} color="#ff0000" />
                  </div>
                  <div className={classes.PollutantData}>
                    {moment(this.state.pm25Data.lastUpdated).format("D MMM YYYY HHmm")}. Source: {this.state.pm25Data.sourceName}
                  </div>
                </div> : <div className={classes.DataNotAvailable}>
                  VERY FINE PARTICULATES - No data available
                </div>}
            </Col>
            <Col md={{ offset: 1, size: 10 }} lg={{ offset: 0, size: 4 }}>
              {this.state.pm10Data.value > 0 ? <div className={classes.Pollutant}>
                  <div>
                    <Gauge label="PARTICULATES &lt;10µm (PM₁₀): µg/m³" topLabelStyle={gaugeTopLabelStyle} valueLabelStyle={gaugeValueLabelStyle} minMaxLabelStyle={gaugeTopLabelStyle} value={this.state.pm10Data.value.toFixed(2)} width={gaugeWidth} height={200} max={40} color="#ff0000" />
                  </div>
                  <div className={classes.PollutantData}>
                    {moment(this.state.pm10Data.lastUpdated).format("D MMM YYYY HHmm")}. Source: {this.state.pm10Data.sourceName}
                  </div>
                </div> : <div className={classes.DataNotAvailable}>
                  FINE PARTICULATES - No data available
                </div>}
            </Col>
          </Row> : (<Row><Spinner /></Row>)}
      </Container> : <div className={classes.BlankCanvas}>
        Please choose a country, a city and a location from the dropdown
        lists above.
      </div>;
  }
}

export default Infodisplay; 