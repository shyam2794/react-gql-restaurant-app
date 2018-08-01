import React, { Component } from "react";
import { Row, Col } from "reactstrap";

import { formatDate } from "../../../Utils/formatDate";

const styles = {
  header: {
    borderBottom: "1px solid"
  },
  containerStyle: {
    border: "solid 1px black",
    margin: "5px 10px 0px 0px",
    paddingBottom: "10px",
    width: "350px",
    height: "500px"
  },
  table: {
    width: "100%"
  }
};

class PrintToKitchenContent extends Component {
  render() {
    let { date, time } = formatDate();

    const { orderDetails } = this.props;
    let removeZero = orderDetails.order.filter(value => value.count !== 0);
    let order = removeZero.filter(
      value =>
        value.table_no === orderDetails.table_id &&
        value.table_type === orderDetails.table_type
    );

    return (
      <div style={styles.containerStyle}>
        <Row>
          <Col sm="12" xs="12" md="12" lg="12">
            <h4 style={styles.header} className="text-center">
              {" "}
              Hotel KVK{" "}
            </h4>
          </Col>
        </Row>
        <Row>
          <Col className="text-center" sm="12" xs="12" md="12" lg="12">
            Date:{date}
          </Col>
        </Row>
        <Row>
          <Col className="text-center" sm="12" xs="12" md="12" lg="12">
            Time:{time}
          </Col>
        </Row>
        <p />
        <Row>
          <Col sm="12" xs="12" md="12" lg="12">
            <h6 className="text-center">
              {" "}
              Order From:{orderDetails.table_type}{" "}
            </h6>
            <h6 className="text-center"> Table No:{orderDetails.table_id} </h6>
          </Col>
        </Row>
        <p> </p>
        <table style={styles.table} border="1">
          <thead>
            <tr>
              <th>Item</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {order.map((value, key) => {
              return (
                <tr key={value.id}>
                  <td>{value.name}</td>
                  <td>{value.count}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PrintToKitchenContent;
