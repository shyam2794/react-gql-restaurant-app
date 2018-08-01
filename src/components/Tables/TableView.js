import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";

import * as actions from "../../actions";
import SideBar from "./SideBar";
import Header from "../Header";
import Table from "./Table";
import CurrentOrderStatus from "./CurrentOrderStatus";

const styles = {
  header: {
    fontFamily: "Raleway , Dosis",
    fontSize: "24px",
    backgroundColor: "#B3E5FC",
    padding: "5px 0px",
    borderRadius: "5px",
    fontWeight: "bold",
    marginTop: "100px"
  },
  button: {
    marginTop: "10px"
  }
};

class Booking extends Component {
  state = {
    checkedTable: []
  };

  handleCheckEvent = TableItem => {
    // console.log('in the parent component' , TableItem);
    let newTableItem = JSON.parse(JSON.stringify(TableItem));
    this.setState({
      checkedTable: newTableItem
    });
  };

  componentDidMount() {
    // console.log('component did mount in table view');
    this.props.getTableDetails();
    // this.props.getOrdersForServe();
  }

  render() {
    let newTableData = [...this.props.Tables];
    let tableData = newTableData.map((value, index) => {
      let countarray = [];
      for (let i = 1; i <= value.tablecount; i++) {
        countarray.push(i);
      }
      return {
        res_id: value.res_id,
        tabletype: value.tabletype,
        tablecount: value.tablecount,
        count: countarray,
        table_id: index + 1
      };
    });
    //   console.log(this.props);
    return (
      <Container fluid={true}>
        <Header />
        <Row>
          <Col
            className="text-center"
            style={styles.header}
            sm="12"
            md="12"
            xs="12"
            lg="12"
          >
            Booking Status
          </Col>
        </Row>
        <Row />
        <Row>
          <Col sm="2" md="2" lg="2" xs="2">
            <SideBar
              onChecked={this.handleCheckEvent}
              tableItem={this.state.checkedTable}
              Tables={tableData}
            />
          </Col>
          <Col sm="8" md="8" lg="8" xs="8">
            <Table tableItem={this.state.checkedTable} Tables={tableData} />
          </Col>
          <Col sm="2" md="2" lg="2" xs="2">
            <CurrentOrderStatus />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  tableItem: state.tableItem,
  Tables: state.tabledata
});

export default connect(
  mapStateToProps,
  actions
)(Booking);
