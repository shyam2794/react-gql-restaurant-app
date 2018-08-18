import React, { Component } from "react";
import { Row, Col, ListGroup, ListGroupItem } from "reactstrap";

import OrdersModal from "./ordersModal";

class BillDisplayComponent extends Component {
  render() {
    const { weeklyOrders } = this.props;
    let orderClone = JSON.parse(JSON.stringify(weeklyOrders));

    let billWithCountMultiplied = orderClone.map(value => {
      return { ...value, Total: value.count * value.price };
    });

    let billWithCountMulCloned = JSON.parse(
      JSON.stringify(billWithCountMultiplied)
    );

    // console.log("Bill with Count Multiplied", billWithCountMultiplied);

    let finalBill = billWithCountMulCloned.reduce((acc, curr) => {
      let { bill_no, Total } = curr;
      const matchedItem = acc.find(order => order.bill_no === bill_no);
      if (matchedItem) {
        matchedItem.Total += Total;
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);

    // console.log("Final Reduced Bill", finalBill);

    let finalBillWithGST = finalBill.map(value => {
      if (value.gst === 5) {
        return { ...value, Total: value.Total + value.Total * 0.05 };
      } else if (value.gst === 12) {
        return { ...value, Total: value.Total + value.Total * 0.12 };
      } else {
        return { ...value, Total: value.Total };
      }
    });

    // console.log("Final Bill with GST", finalBillWithGST);
    return (
      <div>
        <ListGroup>
          {finalBillWithGST.map((value, key) => {
            return (
              <ListGroupItem className="text-left" key={key}>
                <Row key={key}>
                  <Col sm="9" md="9" lg="9" xs="9">
                    <p>
                      Bill No:
                      {value.bill_no}
                    </p>
                    <p>
                      Total:Rs.
                      {value.Total.toFixed(2)}
                    </p>
                  </Col>
                  <Col
                    className="align-items-center"
                    sm="3"
                    md="3"
                    lg="3"
                    xs="3"
                  >
                    <p>
                      <span> Date:</span>
                      <b> {value.date} </b>
                    </p>
                    <OrdersModal
                      History={weeklyOrders}
                      billAmount={value.Total}
                      currentbill={value.bill_no}
                    />
                  </Col>
                </Row>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </div>
    );
  }
}

export default BillDisplayComponent;
