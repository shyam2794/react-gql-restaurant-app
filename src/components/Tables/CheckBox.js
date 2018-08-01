import React, { Component } from "react";

import { FormGroup, Label, Input, Row, Col } from "reactstrap";

const styles = {
  sidebar: {
    backgroundColor: "beige",
    padding: "20px",
    marginTop: "20px",
    fontFamily: "Roboto"
  },
  available: {
    width: "10px",
    padding: "8px",
    backgroundColor: "#C5E1A5",
    borderRadius: "100%"
  },
  booked: {
    width: "10px",
    padding: "8px",
    backgroundColor: "#ff4040",
    borderRadius: "100%"
  },
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

class CheckboxesGroup extends Component {
  handleCheckbox = table => {
    const { tableItem } = this.props;
    if (tableItem.length === 0) {
      //  console.log("table is empty");
      var modifiedTable = [...tableItem, table];
      this.props.onCheckEvent(modifiedTable);
      return;
    } else {
      //   console.log("table is not empty" , table);
      var newTable = tableItem.filter(
        value => value.table_id === table.table_id
      );
      if (newTable.length === 0) {
        var addTable = [...tableItem, table];
        this.props.onCheckEvent(addTable);
        return;
      } else {
        //   console.log("you have unchecked the box");
        var filteredTable = tableItem.filter(
          value => value.table_id !== table.table_id
        );
        this.props.onCheckEvent(filteredTable);
        return;
      }
    }
    //this.props.tableDetail(table,this.props.tableItem);
  };

  render() {
    // console.log(this.props) ;
    return (
      <div>
        <div>
          <h5 style={styles.header} className="text-center">
            {" "}
            Legend{" "}
          </h5>
          <p />
          <Row>
            <Col md="3" sm="3" xs="3" lg="3" />
            <Col md="2" sm="2" xs="2" lg="2">
              {" "}
              <div style={styles.available} />{" "}
            </Col>
            <Col className="text-left" md="7" sm="7" xs="7" lg="7">
              {" "}
              Available{" "}
            </Col>
          </Row>
          <p />
          <Row>
            <Col md="3" sm="3" xs="3" lg="3" />
            <Col md="2" sm="2" xs="2" lg="2">
              {" "}
              <div style={styles.booked} />{" "}
            </Col>
            <Col className="text-left" md="7" sm="7" xs="7" lg="7">
              {" "}
              Booked{" "}
            </Col>
          </Row>
        </div>
        <div style={styles.sidebar}>
          <h5 className="text-center"> Select the Table </h5>
          <div className="text-left">
            {this.props.Tables.map((value, key) => {
              return (
                <FormGroup key={key} check>
                  <Label check>
                    <Input
                      name={value}
                      onChange={() => this.handleCheckbox(value)}
                      type="checkbox"
                      id={`check-${key}`}
                    />
                    {value.tabletype}
                  </Label>
                </FormGroup>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default CheckboxesGroup;
