import React, { Component } from 'react';
import classes from './App.css';
import Header from './layout/Header';
import Infodisplay from './layout/Infodisplay';
import Footer from './layout/Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { chosenLocation: "" };
    this.changeLocation = this.changeLocation.bind(this);
  }

  changeLocation(locationFromHeader) {
    this.setState({
      chosenLocation: locationFromHeader
    });
  }

  render() {
    return (
      <div className={classes.App}>
        <Header locationCallbackFromAppJS={this.changeLocation}/>
        <Infodisplay chosenLocationFromAppJS={this.state.chosenLocation}/>
        <Footer />
      </div>
    );
  }
}

export default App;
