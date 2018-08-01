import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { withRouter } from "react-router-dom";

import Header from "../Header";
import TableForm from "./TableCountForm";

const styles = {
  header: {
    fontFamily: "Raleway , Dosis",
    fontSize: "24px",
    backgroundColor: "beige",
    padding: "5px 0px",
    borderRadius: "5px",
    fontWeight: "bold",
    marginTop: "120px"
  }
};

class MenuForm extends Component {
  handleToggleScreen = () => this.props.history.push("/Booking");

  render() {
    // console.log('Menu form' , this.props);

    var renderForm = (
      <div className="container-fluid">
        <Row style={styles.header}>
          <Col sm="12" md="4" />
          <Col sm="12" md="4">
            <div className="text-center">Enter Table Type and Count</div>
          </Col>
          <Col sm="12" md="4" />
        </Row>
        <p />
        <Row>
          <Col sm="12" md="3" />
          <Col sm="12" md="6">
            <TableForm toggleScreen={this.handleToggleScreen} />
          </Col>
          <Col sm="12" md="3" />
        </Row>
      </div>
    );

    return (
      <Container fluid={true}>
        <Header />
        {renderForm}
      </Container>
    );
  }
}

export default withRouter(MenuForm);
