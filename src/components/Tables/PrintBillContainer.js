import React, { Component } from "react";
import ReactToPrint from "react-to-print";
import { Button, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import * as actions from "../../actions";
import ShowBillInfo from "./showBillInfo";
import ModalMessage from "./AlertMessage/Alert";

const styles = {
  header: {
    marginTop: "120px"
  }
};

class BillPrintContainer extends Component {
  billpaid = () => {
    let q = new Date();
    let m = q.getMonth() + 1;
    let d = q.getDate();
    let y = q.getFullYear();
    if (m < 10) m = "0" + m;
    if (d < 10) d = "0" + d;
    let date = `${y}-${m}-${d}`;
    //console.log(date);
    const { billinfo, billid } = this.props;
    let finalBill = !billinfo.finalBill
      ? billinfo.totalBill
      : billinfo.finalBill;
    let filteredMenu = billinfo.order
      .filter(
        value =>
          value.table_no === billinfo.table_id &&
          value.table_type === billinfo.table_type
      )
      .map(value => ({
        name: value.name,
        count: value.count,
        price: value.price
      }));
    let toDb = {
      price: Number(finalBill.toFixed(2)),
      res_id: billinfo.res_id,
      table_id: billinfo.table_id,
      date: date,
      year: y,
      month: +m,
      bill_no: Number(billid),
      table_type: billinfo.table_type,
      menu: filteredMenu,
      gst: billinfo.Gst_type
    };
    //console.log(toDb);
    this.props.postHistory(toDb);
  };

  render() {
    // console.log(this.props);
    let { history } = this.props.historyDetails;
    let Success_Content = "The Bill Has been Posted Successfully";
    let Error_Content =
      "oops Unable to post the Bill . Check your internet Connectivity ";
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
                        Print Bill{" "}
                      </Button>
                    )}
                    content={() => this.componentRef}
                  />
                </Col>
              </Row>
              <p> </p>
              <Row>
                <Col className="text-center" sm="12" lg="12" md="12">
                  <Button outline onClick={this.billpaid} color="success">
                    Bill Pay
                  </Button>
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
              <p> </p>
              <Row>
                <Col className="text-center" sm="12" lg="12" md="12">
                  <Link to="/Bills">
                    <Button outline color="primary">
                      {" "}
                      View History{" "}
                    </Button>{" "}
                  </Link>
                </Col>
              </Row>
            </div>
          </Col>
          <Col sm="4" xs="4" md="4" lg="4">
            <ShowBillInfo
              ref={el => (this.componentRef = el)}
              billinfo={this.props.billinfo}
              billid={this.props.billid}
            />
          </Col>
        </Row>
        {history.historyOrder.affectedRows && (
          <ModalMessage content={Success_Content} success={true} />
        )}
        {history.error && (
          <ModalMessage content={Error_Content} success={false} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  historyDetails: state.postHistory,
  weeklyOrders: state.weeklyOrders.weeklyOrders.orders
});

export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(BillPrintContainer)
);
