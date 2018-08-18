import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import { withRouter } from "react-router-dom";

import MenuItemFromDB from "./MenuItemFromDB";

const styles = {
  header: {
    fontFamily: "Raleway , Dosis",
    fontSize: "24px",
    backgroundColor: "#B3E5FC",
    padding: "5px 0px",
    borderRadius: "5px",
    fontWeight: "bold",
    marginTop: "100px"
  },
  buttonStyles: {
    marginTop: 10
  }
};

class MenusFromDBRenderer extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col
            className="text-center"
            style={styles.header}
            sm="12"
            md="12"
            xs="12"
            lg="12"
          >
            Menu - {this.props.category}
          </Col>
        </Row>
        <Row style={styles.buttonStyles}>
          <Col sm="4" md="4" lg="4" xs="4" />
          <Col className="text-center" sm="4" md="4" lg="4" xs="4">
            <Button
              outline
              onClick={() => this.props.history.push("/Menu")}
              color="primary"
            >
              {" "}
              Add Menu Item{" "}
            </Button>
          </Col>
          <Col sm="4" md="4" lg="4" xs="4" />
        </Row>
        <Row>
          <Col sm="12" md="12" xs="12" lg="12">
            <MenuItemFromDB {...this.props} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(MenusFromDBRenderer);
