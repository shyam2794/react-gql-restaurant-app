import React from "react";
import { Modal, ModalBody } from "reactstrap";
import { connect } from "react-redux";

import warning from "../../../Images/warning.png";
import success from "../../../Images/checked.png";
import * as actions from "../../../actions";

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ modal: false });
    this.props.toggleError();
  }

  render() {
    // console.log("state in modal", this.state.modal);
    return (
      <div>
        <Modal
          centered={true}
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalBody>
            {" "}
            {this.props.success ? (
              <p className="text-center">
                {" "}
                <img src={success} alt="success" /> {this.props.content}{" "}
              </p>
            ) : (
              <p className="text-center">
                {" "}
                <img src={warning} alt="warning" /> {this.props.content}{" "}
              </p>
            )}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(ModalExample);
