import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { css } from "react-emotion";
import { ClimbingBoxLoader } from "react-spinners";

import * as actions from "../../actions";
import Header from "../Header";
import BillDetail from "./BillDetail";

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

class HistoryContainer extends Component {
  componentDidMount() {
    this.props.getHistoryData();
  }

  render() {
    // console.log(this.props.history);
    const { history } = this.props;
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
              Bill History
            </Col>
          </Row>
          {!history.loading ? (
            <Row>
              <Col className="text-center" sm="12" md="12" lg="12" xs="12">
                <BillDetail BillList={history.orders} />
              </Col>
            </Row>
          ) : (
            <Row>
              <Col sm="4" md="4" lg="4" xs="4">
                {" "}
              </Col>
              <Col className="text-center" sm="4" md="4" lg="4" xs="4">
                <div style={styles.spinnerContainer}>
                  <ClimbingBoxLoader
                    className={override}
                    sizeUnit={"px"}
                    size={20}
                    color={"#123abc"}
                    loading={history.loading}
                  />{" "}
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

const mapStateToProps = state => ({
  history: state.getHistory.historyOrders
});

export default connect(
  mapStateToProps,
  actions
)(HistoryContainer);
