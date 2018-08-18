import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { css } from "react-emotion";
import { ClimbingBoxLoader } from "react-spinners";

import * as actions from "../../../actions";
import Header from "../../Header";
import WeeklyBillDisplayContainer from "./WeeklyBillDisplayContainer";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const styles = {
  header: {
    fontFamily: "Raleway,Dosis",
    fontSize: "24px",
    backgroundColor: "#B3E5FC",
    padding: "5px 0px",
    borderRadius: "5px",
    fontWeight: "bold",
    marginTop: "10px"
  },
  tabs: {
    marginTop: "100px"
  },
  spinnerContainer: {
    marginTop: "75px",
    padding: "30px",
    WebkitBoxShadow: " 1px 0px 27px 5px rgba(0,0,0,0.75)",
    MozBoxShadow: " 1px 0px 27px 5px rgba(0,0,0,0.75)",
    boxShadow: " 1px 0px 27px 5px rgba(0,0,0,0.75)"
  }
};

class WeeklyBillsContainer extends Component {
  componentDidMount() {
    this.props.getWeeklyOrders();
  }

  render() {
    // console.log(this.props.weeklyOrders);
    const { weeklyOrders } = this.props;

    return (
      <div>
        <Header />
        <Container>
          <Row style={styles.tabs}>
            <Col className="text-right" sm="6" md="6" xs="6" lg="6">
              <Link to="/bills">
                {" "}
                <button className="btn btn-primary"> History </button>{" "}
              </Link>
            </Col>
            <Col className="text-left" sm="6" md="6" xs="6" lg="6">
              <Link to="/weeklybills">
                {" "}
                <button className="btn btn-primary"> Weekly Bills </button>{" "}
              </Link>
            </Col>
          </Row>
          <Row>
            <Col
              className="text-center"
              style={styles.header}
              sm="12"
              md="12"
              xs="12"
              lg="12"
            >
              Weekly Bills
            </Col>
          </Row>
          {!weeklyOrders.processing && !weeklyOrders.loading ? (
            <Row>
              <Col className="text-center" sm="12" md="12" lg="12" xs="12">
                <WeeklyBillDisplayContainer
                  weeklyOrders={weeklyOrders.orders}
                />
              </Col>
            </Row>
          ) : (
            <Row>
              <Col sm="4" md="4" lg="4" xs="4" />
              <Col className="text-center" sm="4" md="4" lg="4" xs="4">
                <div style={styles.spinnerContainer}>
                  <ClimbingBoxLoader
                    className={override}
                    sizeUnit={"px"}
                    size={20}
                    color={"#123abc"}
                    loading={true}
                  />
                  <br />
                  <h3 className="text-center"> Loading </h3>
                </div>
              </Col>
              <Col sm="4" md="4" lg="4" xs="4" />
            </Row>
          )}
        </Container>
      </div>
    );
  }
}

export default connect(
  state => ({ weeklyOrders: state.weeklyOrders.weeklyOrders }),
  actions
)(WeeklyBillsContainer);
