import React, { Component } from 'react';
import classes from './App.css';
import Header from './layout/Header';
import Infodisplay from './layout/Infodisplay';
import Footer from './layout/Footer';

class App extends Component {
  render() {
    return (
        <div className={classes.App}>
          <Header></Header>
          <Infodisplay></Infodisplay>
          <Footer></Footer>
        </div>
      );
  };  
}

export default App;
