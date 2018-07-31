import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

import * as actions from "../../actions";
import Header from "../Header";
import BillDetail from "./BillDetail";

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
  NoBillMessage: {
    marginTop: "150px"
  }
};

class HistoryContainer extends Component {
  componentDidMount() {
    this.props.getHistory();
  }

  render() {
    // console.log(this.props.history);
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
          <Row>
            <Col className="text-center" sm="12" md="12" lg="12" xs="12">
              {this.props.history.length ? (
                <BillDetail BillList={this.props.history} />
              ) : (
                <h3 style={styles.NoBillMessage}>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getHistory: actions.getHistory
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    history: state.getHistory
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryContainer);
