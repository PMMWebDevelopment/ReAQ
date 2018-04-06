import React, { Component } from "react";
import { Tooltip } from "reactstrap";

class AboutTooltip extends Component {

    constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false
    };
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

    render() {
        return <div>
            <p>
              <a href="#" id="AboutTooltip">
                <i className="far fa-question-circle fa-lg" />
              </a>
            </p>
            <Tooltip placement="left" isOpen={this.state.tooltipOpen} target="AboutTooltip" toggle={this.toggle}>
              Hover with the mouse over each pollutant&apos;s panel to find out more about them, and how they are measured.
            </Tooltip>
          </div>
    };
};

export default AboutTooltip;
