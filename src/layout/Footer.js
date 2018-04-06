import React from 'react';
import classes from './Footer.css';

const footer = () => (
  <div className={classes.Footer}>
    <p>
      World air quality data. Website designed by P M Meddings using{" "}
      <a href="https://reactjs.org/" rel="noopener noreferrer" target="_blank">
        ReactJS
      </a>. Includes data from the{" "}
      <a href="https://openaq.org/" rel="noopener noreferrer" target="_blank">
        OpenAQ
      </a>{" "}
      Application Program Interface.
    </p>
  </div>
);

export default footer;