import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";

import * as actions from "../../actions";
import { finalBillCalculator } from "../../Utils/finalBillCalculator";

const styles = {
  header: {
    fontFamily: "Raleway , Dosis",
    fontSize: "24px",
    backgroundColor: "black",
    padding: "5px 0px",
    borderRadius: "5px",
    color: "white",
    marginTop: "17px"
  },
  orderTableType: {
    fontFamily: "Raleway , Dosis",
    fontSize: "16px",
    backgroundColor: "#F5F5F5",
    padding: "5px 0px",
    borderRadius: "5px",
    color: "black",
    fontWeight: "bold",
    marginTop: "10px"
  },
  bookedTables: {
    borderRadius: "50%",
    backgroundColor: "#ff4040",
    color: "white",
    fontWeight: "bold",
    width: "25px"
  }
};

class CurrentOrderStatus extends Component {
  tableStatus(finalOrders, tableType) {
    let filteredOrder = finalOrders.filter(
      value => value.table_type === tableType
    );
    if (filteredOrder.length > 0) {
      return filteredOrder.map((value, key) => {
        return (
          <Col key={key} className="text-center" sm="2" md="2" xs="2" lg="2">
            <div style={styles.bookedTables}>{value.table_no}</div>
          </Col>
        );
      });
    } else {
      return (
        <Col sm="12" md="12" xs="12" lg="12">
          <h6 className="text-center"> No orders </h6>
        </Col>
      );
    }
  }

  render() {
    //console.log(finalBillCalculator(this.props.tableorder));
    let currentOrders = finalBillCalculator(this.props.tableorder);

    return (
      <div>
        <div>
          <h5 style={styles.header} className="text-center">
            Current Orders
          </h5>
        </div>
        <div>
          <div>
            <h5 style={styles.orderTableType} className="text-center">
              Kudil
            </h5>
          </div>
          <div>
            <Row>
              <Col sm="2" md="2" xs="2" lg="2" />
              {this.tableStatus(currentOrders, "Kudil")}
              <Col sm="2" md="2" xs="2" lg="2" />
            </Row>
          </div>
        </div>
        <div>
          <div>
            <h5 style={styles.orderTableType} className="text-center">
              Party Hall A
            </h5>
          </div>
          <div>
            <Row>
              <Col sm="2" md="2" xs="2" lg="2" />
              {this.tableStatus(currentOrders, "Party Hall A")}
              <Col sm="2" md="2" xs="2" lg="2" />
            </Row>
          </div>
        </div>
        <div>
          <div>
            <h5 style={styles.orderTableType} className="text-center">
              Party Hall B
            </h5>
          </div>
          <div>
            <Row>
              <Col sm="2" md="2" xs="2" lg="2" />
              {this.tableStatus(currentOrders, "Party Hall B")}
              <Col sm="2" md="2" xs="2" lg="2" />
            </Row>
          </div>
        </div>
        <div>
          <div>
            <h5 style={styles.orderTableType} className="text-center">
              Garden
            </h5>
          </div>
          <div>
            <Row>
              <Col sm="2" md="2" xs="2" lg="2" />
              {this.tableStatus(currentOrders, "Garden")}
              <Col sm="2" md="2" xs="2" lg="2" />
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tableorder: state.tableorder
});

export default connect(
  mapStateToProps,
  actions
)(CurrentOrderStatus);
