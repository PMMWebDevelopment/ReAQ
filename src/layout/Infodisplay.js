import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import classes from './Infodisplay.css';
import axios from "../axios/axios";
import moment from 'moment';
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
      so2Data: []
    }
  }

  componentDidMount() {
    this.getMeasurements();
  }

  getMeasurements() {
    axios
      // NB: Hard coded for now - country needs to be obtained from selection made in countries dropdown
      .get("/latest?location=100 ail")
      .then(response => {
        for (let i = 0; i < response.data.results[0].measurements.length; i++) {
          this.state.pollutantData.push(response.data.results[0].measurements[i]);
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
          this.setState({coData: this.state.pollutantData[i]}); 
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
      fill: 'white',
      fontWeight: 'bold',
      fontSize: '15px'
    }

    const gaugeValueLabelStyle = {
      fill: 'white',
      fontWeight: 'bold',
      fontSize: '24px'
    }

    return <Container className={classes.Infodisplay}>
        <Row>
          <Col sm={{ offset: 1, size: 10 }} md={{ offset: 0, size: 4 }}>
            <div className={classes.Pollutant}>
              <div>
                <Gauge label="CARBON MONOXIDE (CO) - µg/m³" topLabelStyle={gaugeTopLabelStyle} valueLabelStyle={gaugeValueLabelStyle} minMaxLabelStyle={gaugeTopLabelStyle} value={this.state.coData.value} width={300} height={200} max={4000} color='#ff0000'/>
              </div>
              <div className={classes.PollutantData}>
                {moment(this.state.coData.lastUpdated).format("dddd, Do MMMM YYYY h:mm a")}. Source: {this.state.coData.sourceName}
              </div>
            </div>
          </Col>
          <Col sm={{ offset: 1, size: 10 }} md={{ offset: 0, size: 4 }}>
            <div className={classes.Pollutant}>
              <div className={classes.PollutantTitle}>
                <Gauge label="SULFUR DIOXIDE (SO₂) - µg/m³" topLabelStyle={gaugeTopLabelStyle} valueLabelStyle={gaugeValueLabelStyle} minMaxLabelStyle={gaugeTopLabelStyle} value={this.state.so2Data.value} width={300} height={200} max={3000} color='#ff0000'/>
              </div>
              <div className={classes.PollutantData}>
                {moment(this.state.so2Data.lastUpdated).format("dddd, Do MMMM YYYY h:mm a")}. Source: {this.state.so2Data.sourceName}
              </div>
            </div>
          </Col>
          <Col sm={{ offset: 1, size: 10 }} md={{ offset: 0, size: 4 }}>
            <div className={classes.Pollutant}>
              <div className={classes.PollutantTitle}>
                <Gauge label="NITROGEN DIOXIDE (NO₂) - µg/m³" topLabelStyle={gaugeTopLabelStyle} valueLabelStyle={gaugeValueLabelStyle} minMaxLabelStyle={gaugeTopLabelStyle} value={this.state.no2Data.value} width={300} height={200} max={4000} color='#ff0000'/>
              </div>
              <div className={classes.PollutantData}>
                {moment(this.state.no2Data.lastUpdated).format("dddd, Do MMMM YYYY h:mm a")}. Source: {this.state.no2Data.sourceName}
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={{ offset: 1, size: 10 }} md={{ offset: 0, size: 4 }}>
            <div className={classes.Pollutant}>
              <div className={classes.PollutantTitle}>
                <Gauge label="OZONE/TRIOXYGEN (O₃) - µg/m³" topLabelStyle={gaugeTopLabelStyle} valueLabelStyle={gaugeValueLabelStyle} minMaxLabelStyle={gaugeTopLabelStyle} value={this.state.o3Data.value} width={300} height={200} max={4000} color='#ff0000'/>
              </div>
              <div className={classes.PollutantData}>
                {moment(this.state.o3Data.lastUpdated).format("dddd, Do MMMM YYYY h:mm a")}. Source: {this.state.o3Data.sourceName}
              </div>
            </div>
          </Col>
          <Col sm={{ offset: 1, size: 10 }} md={{ offset: 0, size: 4 }}>
            <div className={classes.Pollutant}>
              <div className={classes.PollutantTitle}>
                <Gauge label="PARTICULATES &le;2.5µm (PM₂.₅) - µg/m³" topLabelStyle={gaugeTopLabelStyle} valueLabelStyle={gaugeValueLabelStyle} minMaxLabelStyle={gaugeTopLabelStyle} value={this.state.pm25Data.value} width={300} height={200} max={600} color='#ff0000'/>
              </div>
              <div className={classes.PollutantData}>
                {moment(this.state.pm25Data.lastUpdated).format("dddd, Do MMMM YYYY h:mm a")}. Source: {this.state.pm25Data.sourceName}
              </div>
            </div>
          </Col>
          <Col sm={{ offset: 1, size: 10 }} md={{ offset: 0, size: 4 }}>
            <div className={classes.Pollutant}>
              <div className={classes.PollutantTitle}>
                <Gauge label="PARTICULATES &gt;2.5&le;10µm (PM₁₀) - µg/m³" topLabelStyle={gaugeTopLabelStyle} valueLabelStyle={gaugeValueLabelStyle} minMaxLabelStyle={gaugeTopLabelStyle} value={this.state.pm10Data.value} width={300} height={200} max={700} color='#ff0000'/>
              </div>
              <div className={classes.PollutantData}>
                {moment(this.state.pm10Data.lastUpdated).format("dddd, Do MMMM YYYY h:mm a")}. Source: {this.state.pm10Data.sourceName}
              </div>
            </div>
          </Col>
        </Row>
      </Container>;
  }
};

export default Infodisplay; 