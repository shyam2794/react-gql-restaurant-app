import React from "react";
import { Button, Modal, ModalBody, Table, Row, Col } from "reactstrap";

const styles = {
  Table: {
    backgroundColor: "beige",
    padding: "10px 20px 20px 20px",
    fontFamily: "Roboto"
  },
  header: {
    backgroundColor: "black",
    padding: "5px 0px",
    borderRadius: "5px",
    color: "white",
    fontSize: "20px"
  },
  billAmount: {
    backgroundColor: "#FFEE58",
    padding: "5px 0px",
    borderRadius: "5px",
    color: "black",
    fontSize: "20px"
  }
};

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  orderDetails() {
    let { currentbill, History, billAmount } = this.props;
    let filteredOrders = History.filter(
      value => value.bill_no === currentbill && value.count !== 0
    );
    return (
      <Table style={styles.Table}>
        <thead>
          <tr>
            <th> List </th>
            <th> Menu </th>
            <th> Price </th>
            <th> Count </th>
            <th> Total Price </th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((value, key) => {
            return (
              <tr key={`Table-${key}`}>
                <td> {key + 1}</td>
                <td> {value.name} </td>
                <td className="text-center">
                  {" "}
                  {Number(value.price).toFixed(2)}{" "}
                </td>
                <td className="text-center"> {value.count} </td>
                <td className="text-center">
                  {" "}
                  {Number(value.count * value.price).toFixed(2)}{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }

  render() {
    // console.log("inside the modal", this.props);
    let { currentbill, History, billAmount } = this.props;
    return (
      <div>
        <Button outline onClick={this.toggle} color="success">
          View Orders
        </Button>{" "}
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          centered={true}
        >
          <ModalBody>
            <Row>
              <Col className="text-center" sm="12" md="12" xs="12" lg="12">
                <p style={styles.header}> Billno - {currentbill}</p>
                <p style={styles.billAmount}>
                  {" "}
                  Bill Amount - Rs. {Number(billAmount).toFixed(2)}
                </p>
              </Col>
            </Row>
            {this.orderDetails()}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;
