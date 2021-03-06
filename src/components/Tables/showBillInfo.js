import React, { Component } from "react";
import { Row, Col } from "reactstrap";

import { formatDate } from "../../Utils/formatDate";

const styles = {
  header: {
    borderBottom: "1px solid"
  },
  containerStyle: {
    border: "solid 1px black",
    margin: "5px 10px 0px 0px",
    paddingBottom: "10px",
    width: "350px",
    height: "600px"
  },
  table: {
    width: "100%"
  }
};

class ShowBillInfo extends Component {
  render() {
    //  console.log(this.props);
    const { props } = this;

    let billDate = formatDate();
    let removeZero = props.billinfo.order.filter(value => value.count !== 0);
    let order = removeZero.filter(
      value =>
        value.table_no === props.billinfo.table_id &&
        value.table_type === props.billinfo.table_type
    );

    const GST_NO = "33AAKFH1844DIZQ";

    return (
      <div style={styles.containerStyle}>
        <Row>
          <Col sm="12" xs="12" md="12" lg="12">
            <h4 style={styles.header} className="text-center">
              {" "}
              Hotel KVK{" "}
            </h4>
            <h6 className="text-center"> 3/271H , L&T ByePass Road , </h6>
            <h6 className="text-center"> Venkittapuram , Coimbatore-62 </h6>
            <h6 className="text-center"> GST NO: {GST_NO} </h6>
            <h6 className="text-center"> Ph: 9842691403 </h6>
          </Col>
        </Row>
        <Row>
          <Col className="text-left" sm="6" xs="6" md="6" lg="6">
            Date:{billDate.date}
          </Col>
          <Col className="text-left" sm="6" xs="6" md="6" lg="6">
            Bill No:{props.billid}
          </Col>
        </Row>
        <Row>
          <Col className="text-left" sm="6" xs="6" md="6" lg="6">
            Time:{billDate.time}
          </Col>
          <Col className="text-left" sm="6" xs="6" md="6" lg="6">
            Server No:
          </Col>
        </Row>
        <p />
        <table style={styles.table} border="1">
          <thead>
            <tr>
              <th>Item</th>
              <th>Count</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {order.map((value, key) => {
              return (
                <tr key={value.id}>
                  <td>{value.name}</td>
                  <td>{value.count}</td>
                  <td>{(value.price * value.count).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p />
        <Row>
          <Col className="text-right" sm="6" md="6" xs="6" lg="6">
            Bill{"  "}:
          </Col>
          <Col sm="6" md="6" xs="6" lg="6">
            Rs.{Number(props.billinfo.totalBill).toFixed(2)}
          </Col>
        </Row>
        <p />
        <Row>
          <Col className="text-right" sm="6" md="6" xs="6" lg="6">
            {props.billinfo.Gst_type}% GST:
          </Col>
          <Col sm="6" md="6" xs="6" lg="6">
            Rs.{Number(props.billinfo.GST).toFixed(2)}
          </Col>
        </Row>
        <p />
        <Row>
          <Col className="text-right" sm="6" md="6" xs="6" lg="6">
            Total Bill{"  "}:
          </Col>
          <Col sm="6" md="6" xs="6" lg="6">
            {!props.billinfo.finalBill
              ? `Rs.${Number(props.billinfo.totalBill).toFixed(2)}`
              : `Rs.${Number(props.billinfo.finalBill).toFixed(2)}`}
          </Col>
        </Row>
        <p />
        <Row>
          <Col className="text-center" sm="12" xs="12" md="12" lg="12">
            Thank You.Visit Again !
          </Col>
        </Row>
      </div>
    );
  }
}

export default ShowBillInfo;
