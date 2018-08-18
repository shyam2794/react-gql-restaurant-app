import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../actions";
import ComponentToPrint from "./PrintBillContainer";

class BillToBePrinted extends Component {
  componentDidMount() {
    this.props.getWeeklyOrders();
  }

  render() {
    const { weeklyOrders } = this.props;
    //console.log(weeklyOrders);
    if (weeklyOrders.loading) {
      // console.log("loading");
      return (
        <div>
          <h2> Loading ... </h2>
        </div>
      );
    } else if (!weeklyOrders.processing && !weeklyOrders.loading) {
      let billinfo = this.props.location.state;
      let lastBill = weeklyOrders.orders.slice(-1)[0];
      //console.log("lastBill", lastBill);

      if (weeklyOrders.orders.length === 0 || billinfo.date !== lastBill.date) {
        let billid = `${billinfo.dateInbillid}001`;
        return (
          <div>
            <ComponentToPrint
              billinfo={this.props.location.state}
              billid={billid}
            />
          </div>
        );
      } else {
        let billid = Number(lastBill.bill_no) + 1;
        return (
          <div>
            <ComponentToPrint
              billinfo={this.props.location.state}
              billid={billid}
            />
          </div>
        );
      }
    } else {
      return (
        <div>
          <h2> Processing your request... </h2>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  weeklyOrders: state.weeklyOrders.weeklyOrders
});

export default connect(
  mapStateToProps,
  actions
)(BillToBePrinted);
