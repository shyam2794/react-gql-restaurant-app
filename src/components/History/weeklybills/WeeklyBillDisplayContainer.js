import React, { Component } from "react";
import { Row, Col } from "reactstrap";

import DateList from "./DateList";
import RenderWeeklyBills from "./RenderWeeklyBills";

const styles = {
  header: {
    fontFamily: "Raleway , Dosis",
    fontSize: "24px",
    backgroundColor: "black",
    padding: "5px 0px",
    borderRadius: "5px",
    color: "white",
    marginTop: "17px"
  }
};

class BillContainer extends Component {
  state = {
    date: "All"
  };

  onHandleDateClick = date => this.setState({ date });

  render() {
    let orders = {
      order: [],
      count: []
    };

    let { weeklyOrders } = this.props;
    if (this.state.date === "All") {
      let allBills = weeklyOrders.map(value => value.bill_no);
      orders.count = [...new Set(allBills)];
      orders.order = weeklyOrders.slice(0);
    } else {
      let filteredBills = weeklyOrders
        .filter(value => value.date === this.state.date)
        .map(value => value.bill_no);
      orders.count = [...new Set(filteredBills)];
      orders.order = weeklyOrders.filter(
        value => value.date === this.state.date
      );
    }

    //console.log(weeklyOrders);

    return (
      <div>
        <Row>
          <Col className="text-center" sm="3" md="3" lg="3" xs="3">
            <h5 style={styles.header} className="text-center">
              Date
            </h5>
            <DateList {...this.props} onClickDate={this.onHandleDateClick} />
          </Col>
          <Col className="text-center" sm="9" md="9" lg="9" xs="9">
            <div style={styles.header}>
              <h5 className="text-center">Bills - {this.state.date}</h5>
              <h5 className="text-center">
                Total Bills Generated - {orders.count.length}
              </h5>
            </div>
            <br />
            <RenderWeeklyBills weeklyOrders={orders.order} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default BillContainer;
