import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class AboutModal extends Component {

    constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      modal: false
    };
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

    render() {
        return <div>
        <Button size="sm" color="primary" onClick={this.toggle}>?</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>About the data on this site</ModalHeader>
          <ModalBody>
            <h3>Carbon Monoxide</h3>
            <p>Colourless, odourless gas which is usually the product of burning fossil fuels in poorly ventilated conditions. It can also be produced by some industrial processes, by internal combustion engines and by faulty household heaters. It is toxic even in small doses as it inhibits the blood from carrying oxygen.</p>           
            <h3>Sulphur Dioxide</h3>
            <p>Pungent-smelling gas which is a natural product of the Earth&apos;s volcanic activity but which is also a pollutant derived from the burning of fossil fuels contaminated with sulphur compounds. Used as a sterilisation agent in winemaking and brewing but its excessive presence in the atmosphere can lead to acid rain as it produces sulphurous acid when combined with water.</p>

            <h3>Nitrogen Dioxide</h3>
            <p>Another pungent-smelling gas which is also a product of burning fossil fuels in poorly ventilated conditions, as the Earth&apos;s atmosphere is 76% nitrogen. Another precursor to acid rain as well as photochemical smog when it reacts with strong sunlight.</p>

            <h3>Ozone/Trioxygen</h3>
            <p>Part of the Earth&apos;s natural protection from harmful ultraviolet radiation from the Sun, ozone is however a pollutant at low altitudes as it reacts with other chemicals to produce a variety of environmental problems, including acid rain.</p>

            <h3>Particulates</h3>
            <p>Describes a wide variety of pollutants which are detectable to the naked eye, usually in the form of smoke. Includes common soot, ash, and dust from various industrial processes.</p>

            <h3>Measurements</h3>
            <p>How air pollution is measured varies widely around the world, and it is also expressed using a variety of units, including parts per billion (ppb), parts per million (ppm) and microgrammes per cubic metre (µg/m³). All figures on this site are converted to <b>µg/m³</b>.</p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    }
}

export default AboutModal;
