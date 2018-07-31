import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "../../actions";
import BillDisplay from "./BillDisplay";

const styles = {
  tableBooked: {
    padding: 30,
    height: 100,
    marginTop: "20px",
    backgroundColor: "#ff4040",
    borderRadius: "5px"
  },
  tableAvailable: {
    padding: 30,
    height: 100,
    marginTop: "20px",
    backgroundColor: "#C5E1A5",
    borderRadius: "5px"
  },
  header: {
    fontFamily: "Raleway , Dosis",
    fontSize: "24px",
    backgroundColor: "black",
    padding: "5px 0px",
    borderRadius: "5px",
    color: "white"
  },
  tablename: {
    marginTop: "10px",
    backgroundColor: "beige"
  }
};

class Table extends Component {
  displayTable = (tblno, tbltype, finalbill) => {
    for (var i = 0; i < finalbill.length; i++) {
      if (
        tblno === Number(finalbill[i].table_no) &&
        tbltype === finalbill[i].table_type
      ) {
        return true;
      }
    }
  };

  componentDidMount() {
    // console.log('compnent Did Mount in Tables ');
    this.interval = setInterval(() => this.props.getTableOrders(), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    if (this.props.tableItem.length === 0) {
      return <div> </div>;
    }

    // console.log(this.props);
    var clonedArray = JSON.parse(JSON.stringify(this.props.tableorder));
    var orderMultiplyCount = clonedArray.map(value => {
      value.price = value.price * value.count;
      return value;
    });

    var finalbill = orderMultiplyCount.reduce((acc, next) => {
      const { table_type, res_id, table_no, price } = next;
      var matcheditem = acc.find(
        item =>
          item.table_no === next.table_no && item.table_type === next.table_type
      );
      if (matcheditem) {
        matcheditem.price += next.price;
      } else {
        acc.push({ table_type, res_id, table_no, price });
      }
      //console.log(acc);
      return acc;
    }, []);
    // console.log(this.props.tableItem);
    return (
      <div>
        <div className="text-center" />
        <p />

        <div>
          {this.props.tableItem.map((table, key) => {
            return (
              <Row key={`Table-${key}`}>
                <Col style={styles.header} sm="12" md="12" lg="12">
                  <h4 className="text-center"> {table.tabletype}</h4>
                </Col>
                {table.count.map((value, key) => {
                  let tableid = key + 1;
                  return (
                    <Col key={key} sm="3" md="3" lg="3">
                      {this.displayTable(
                        tableid,
                        table.tabletype,
                        finalbill
                      ) ? (
                        <div style={styles.tableBooked} />
                      ) : (
                        <div style={styles.tableAvailable} />
                      )}
                      <Row>
                        <Col className="text-center">
                          {table.tabletype === "Kudil" ? (
                            <p style={styles.tablename}>{`${
                              table.tabletype
                            }-${key + 1}`}</p>
                          ) : (
                            <p style={styles.tablename}>{`Table-${key + 1}`}</p>
                          )}
                        </Col>
                      </Row>
                      <Row>
                        <Col className="text-center">
                          {finalbill.map((item, key) => {
                            let id = Number(item.table_no);
                            return tableid === id &&
                              table.tabletype === item.table_type ? (
                              <BillDisplay key={key} finalbill={item} />
                            ) : (
                              " "
                            );
                          })}
                        </Col>
                      </Row>
                    </Col>
                  );
                })}
              </Row>
            );
          })}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getTableOrders: actions.getTableOrders
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    tableorder: state.tableorder
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
