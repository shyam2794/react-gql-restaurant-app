import React, { Component } from "react";
import ReactToPrint from "react-to-print";
import { Button, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import PrintToKitchenContent from "./ToKitchen";

const styles = {
  header: {
    marginTop: "120px"
  }
};

class PrintToKitchenContainer extends Component {
  render() {
    // console.log('props of print to kitchen container' , this.props)
    return (
      <div>
        <Row>
          <Col style={styles.sidebar} sm="2" xs="2" md="2" lg="2">
            <div style={styles.header}>
              <Row>
                <Col className="text-center" sm="12" xs="12" md="12" lg="12">
                  <ReactToPrint
                    trigger={() => (
                      <Button outline color="primary">
                        {" "}
                        Print{" "}
                      </Button>
                    )}
                    content={() => this.componentRef}
                  />
                </Col>
              </Row>
              <p> </p>
              <Row>
                <Col className="text-center" sm="12" lg="12" md="12">
                  <Link to="/Booking">
                    <Button outline color="primary">
                      {" "}
                      View Booking{" "}
                    </Button>{" "}
                  </Link>
                </Col>
              </Row>
            </div>
          </Col>
          <Col sm="4" xs="4" md="4" lg="4">
            <PrintToKitchenContent
              ref={el => (this.componentRef = el)}
              orderDetails={this.props.location.state}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default PrintToKitchenContainer;
