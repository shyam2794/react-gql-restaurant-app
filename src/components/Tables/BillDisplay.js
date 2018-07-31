import React from "react";
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Table
} from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../actions";
import { withRouter, Link } from "react-router-dom";
import checked from "../../Images/checked.png";

const styles = {
  Table: {
    backgroundColor: "beige",
    padding: "20px",
    marginTop: "10px",
    fontFamily: "Roboto"
  },
  header: {
    fontFamily: "Raleway , Dosis",
    backgroundColor: "black",
    padding: "5px 0px",
    borderRadius: "5px",
    fontWeight: "bold",
    color: "white"
  }
};

class AlertDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      GST: 0,
      Gst_type: 0,
      FinalBill: 0
    };

    this.toggle = this.toggle.bind(this);
    this.applyGST = this.applyGST.bind(this);
    this.renderOrderList = this.renderOrderList.bind(this);
    this.menuOrderForBill = this.menuOrderForBill.bind(this);
    this.onClickServedItem = this.onClickServedItem.bind(this);
    this.renderTable = this.orderServedStatus.bind(this);
  }

  menuOrderForBill(finalbill) {
    let removeZero = this.props.tableorder.filter(value => value.count !== 0);
    let order = removeZero.filter(
      value =>
        value.table_no === finalbill.table_no &&
        value.table_type === finalbill.table_type
    );
    return (
      <Table style={styles.Table}>
        <thead>
          <tr>
            <th> List </th>
            <th>itemname</th>
            <th>Count</th>
            <th>cost</th>
            <th> Total </th>
          </tr>
        </thead>
        <tbody>
          {order.map((value, key) => {
            return (
              <tr key={`Table-${key}`}>
                <td> {key + 1}</td>
                <td> {value.name} </td>
                <td> {value.count} </td>
                <td> {value.price.toFixed(2)} </td>
                <td> {(value.price * value.count).toFixed(2)} </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }

  componentDidMount() {
    this.props.getOrdersForServe();
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  onClickServedItem(order) {
    this.props.removeServedMenuItem(order, this.props.tableorder);
  }

  applyGST(Gst, amount, type) {
    this.setState({
      GST: Gst,
      Gst_type: type,
      FinalBill: amount
    });
  }

  orderServedStatus(order) {
    // console.log(order);
    return (
      <Table style={styles.Table}>
        <thead>
          <tr>
            <th> List </th>
            <th>itemname</th>
            <th>Count To be Served</th>
            <th>Served Count</th>
            <th> Served </th>
          </tr>
        </thead>
        <tbody>
          {order.map((value, key) => {
            return (
              <tr key={`Table-${key}`}>
                <td> {key + 1}</td>
                <td> {value.name} </td>
                <td className="text-center"> {value.count_to_be_served} </td>
                <td className="text-center"> {value.served_count} </td>
                <td>
                  {" "}
                  <Button
                    outline
                    onClick={() => this.onClickServedItem(value)}
                    color="success"
                  >
                    {" "}
                    Served{" "}
                  </Button>{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }

  renderOrderList() {
    const { finalbill, orderListForServe } = this.props;
    // console.log(tableorder);
    // console.log(finalbill);
    let clonedFinalBill = JSON.parse(JSON.stringify(finalbill));
    let TotalBill = clonedFinalBill.price;
    let GST_FIVE = (clonedFinalBill.price * 5) / 100;
    let GST_TWELVE = (clonedFinalBill.price * 12) / 100;
    let Gst_Number_five = 5;
    let Gst_Number_twelve = 12;
    let BillWithFiveGst =
      clonedFinalBill.price + (clonedFinalBill.price * 5) / 100;
    let BillWithTwelveGst =
      clonedFinalBill.price + (clonedFinalBill.price * 12) / 100;
    let removeZero = orderListForServe.filter(value => value.count !== 0);
    let order = removeZero.filter(
      value =>
        value.table_no === finalbill.table_no &&
        value.table_type === finalbill.table_type
    );
    let date = new Date();
    let components = [
      date.getDate(),
      date.getMonth() + 1,
      date
        .getFullYear()
        .toString()
        .substr(2)
    ];

    let q = new Date();
    let m = q.getMonth() + 1;
    let d = q.getDate();
    let y = q.getFullYear();
    if (m < 10) m = "0" + m;
    if (d < 10) d = "0" + d;

    let billDate = `${y}-${m}-${d}`;

    let billid = components.join("");
    return (
      <div>
        <ModalHeader toggle={this.toggle}> Order Details </ModalHeader>
        <ModalBody>
          <Row>
            <Col
              style={styles.header}
              className="text-center"
              sm="12"
              md="12"
              xs="12"
              lg="12"
            >
              Order Served Status
            </Col>
          </Row>
          <p> </p>
          {order.length === 0 ? (
            <h4 className="text-center">
              {" "}
              All the Orders are Served <img src={checked} alt=" " />
            </h4>
          ) : (
            this.orderServedStatus(order)
          )}
          <Row>
            <Col
              style={styles.header}
              className="text-center"
              sm="12"
              md="12"
              xs="12"
              lg="12"
            >
              Order For Bill
            </Col>
          </Row>
          <p> </p>
          {this.menuOrderForBill(finalbill)}
          <Row>
            <Col
              style={styles.header}
              className="text-center"
              sm="12"
              md="12"
              xs="12"
              lg="12"
            >
              Bill With GST
            </Col>
          </Row>
          <p />
          <Row>
            <Col className="text-center" sm="6" md="6" xs="6" lg="6">
              Total Bill :
            </Col>
            <Col sm="6" md="6" xs="6" lg="6">
              Rs.{TotalBill.toFixed(2)}
            </Col>
          </Row>
          <p> </p>
          <Row>
            <Col className="text-center" sm="3" md="3" xs="3" lg="3">
              <Button
                outline
                onClick={() =>
                  this.applyGST(GST_FIVE, BillWithFiveGst, Gst_Number_five)
                }
                id="5"
                color="primary"
              >
                {" "}
                GST 5%{" "}
              </Button>
            </Col>
            <Col className="text-center" sm="3" md="3" xs="3" lg="3">
              <Button
                outline
                onClick={() =>
                  this.applyGST(
                    GST_TWELVE,
                    BillWithTwelveGst,
                    Gst_Number_twelve
                  )
                }
                id="12"
                color="primary"
              >
                {" "}
                GST 12%{" "}
              </Button>
            </Col>
            <Col sm="6" md="6" xs="6" lg="6">
              Rs.{this.state.GST.toFixed(2)}
            </Col>
          </Row>
          <p />
          <Row>
            <Col className="text-center" sm="6" md="6" xs="6" lg="6">
              Final Bill :
            </Col>
            <Col sm="6" md="6" xs="6" lg="6">
              {!this.state.FinalBill
                ? `Rs.${TotalBill.toFixed(2)}`
                : `Rs.${this.state.FinalBill.toFixed(2)}`}
            </Col>
          </Row>
          <p />
          <Row>
            <Col className="text-center" sm="6" md="6" lg="6" xs="6">
              <Link
                to={{
                  pathname: "/printBill",
                  state: {
                    order: this.props.tableorder,
                    totalBill: TotalBill,
                    GST: this.state.GST,
                    Gst_type: this.state.Gst_type,
                    finalBill: this.state.FinalBill,
                    res_id: finalbill.res_id,
                    table_id: finalbill.table_no,
                    table_type: finalbill.table_type,
                    dateInbillid: billid,
                    date: billDate
                  }
                }}
              >
                <Button color="primary"> View Bill </Button>
              </Link>
            </Col>

            <Col className="text-center" sm="6" md="6" lg="6" xs="6">
              <Link
                to={{
                  pathname: "/PrintToKitchen",
                  state: {
                    order: this.props.tableorder,
                    res_id: finalbill.res_id,
                    table_id: finalbill.table_no,
                    table_type: finalbill.table_type
                  }
                }}
              >
                <Button color="primary"> To Kitchen </Button>
              </Link>
            </Col>
          </Row>
        </ModalBody>
      </div>
    );
  }

  render() {
    // console.log(this.props);
    return (
      <div>
        <Row>
          <Col className="text-center" sm="12" lg="12" md="12">
            <Button outline color="info" onClick={this.toggle}>
              {" "}
              View Order{" "}
            </Button>
          </Col>
        </Row>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          {this.renderOrderList()}
        </Modal>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      postHistory: actions.postHistory,
      getTableOrders: actions.getTableOrders,
      getOrdersForServe: actions.getOrdersForServe,
      removeServedMenuItem: actions.removeServedMenuItem
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    tableorder: state.tableorder,
    orderListForServe: state.serveorder
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AlertDialog)
);
