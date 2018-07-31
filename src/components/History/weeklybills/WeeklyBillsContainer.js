import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as actions from "../../../actions";
import Header from "../../Header";
import WeeklyBillDisplayContainer from "./WeeklyBillDisplayContainer";

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
  content: {
    marginTop: "175px"
  }
};

class WeeklyBillsContainer extends Component {
  componentDidMount() {
    this.props.getWeeklyOrders();
  }

  render() {
    // console.log(this.props.weeklyOrders);
    let { weeklyOrders } = this.props;

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
          <Row>
            <Col sm="12" md="12" lg="12" xs="12">
              {this.props.weeklyOrders.length ? (
                <div className="text-center">
                  {" "}
                  <WeeklyBillDisplayContainer
                    weeklyOrders={weeklyOrders}
                  />{" "}
                </div>
              ) : (
                <h3 style={styles.content} className="text-center">
                  {" "}
                  No Bills have been Generated{" "}
                </h3>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    weeklyOrders: state.weeklyOrders.weeklyOrders.orders
  };
}

export default connect(
  mapStateToProps,
  actions
)(WeeklyBillsContainer);
