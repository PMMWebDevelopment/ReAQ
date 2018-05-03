# Explanation of project

This is a single-page app using the OpenAQ API for air quality data, built in ReactJS version 16. This is my first independently designed React website.

## Steps taken to build this project

* Upgraded Node.js to version 9.10.1 (inc. npm 5.8.0)

* Installed radium version 0.24.0

* Ejected project in order use CSS modules: npm run eject

* Edited webpack.config.dev.js at line 167 to insert new lines:
    modules: true,
    locaIdentName: '[name]__[local]__[hash:base64:5]'

* Copy both lines to line 179 in webpack.config.prod.js

* Installed Bootstrap 4.0.0, JQuery 3.3.1, popper.js 1.14.2, then reactstrap 5.0.0, via npm

* Installed react-fontawesome 1.6.1 to access question-circle symbol

* Upgraded popper.js to 1.14.3 to resolve issue of tooltip appearing off-page

* Installed axios 0.18.0 to handle HTTP requests to OpenAQ API: <https://docs.openaq.org/>

* Consult <https://github.com/reactjs/react-autocomplete> to set up autocomplete facility

* Installed moment.js 2.22.0 to convert data timestamps into human-readable format

* Installed react-svg-gauge 1.0.7 for graphical representation of pollutant data

* Installed spinner from <https://projects.lukehaas.me/css-loaders/>

* Inserted "Pick a city" and "Pick a country" on City and Location Dropdowns as defaults before country is chosen.

* Solved the issue of the overflowing dropdowns by upgrading reactstrap to 6.0.1 and upgrading other dependencies.

## To do

* Outsource the Gauge components so that only certain properties are changed (i.e. for each pollutant type when used in the Infodisplay component)

* Condense the Dropdowns to one file where they are only altered when used in the Header component to reflect the different Axios calls which need to be made (for country, city and location respectively).