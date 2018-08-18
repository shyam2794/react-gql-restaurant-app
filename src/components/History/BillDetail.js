import React, { Component, Fragment } from "react";
import { Container, Row, Col } from "reactstrap";

import YearBill from "./renderYearBill";
import { yearwiseData } from "./billByYear";
import { formatDate } from "../../Utils/formatDate";
import NoBill from "../../Images/Nobill.png";

const styles = {
  header: {
    fontFamily: "Raleway,Dosis",
    fontSize: "16px",
    backgroundColor: "black",
    padding: "5px 0px",
    borderRadius: "5px",
    fontWeight: "bold",
    marginTop: "10px",
    color: "white"
  },
  styleForNoBill: {
    padding: "25px"
  }
};

export default class BillDetail extends Component {
  renderTodaysBill() {
    let date = formatDate().date;
    const { BillList } = this.props;
    let newArray = JSON.parse(JSON.stringify(BillList));
    let todaysBill = newArray.filter(value => value.date === date);
    // console.log(todaysBill) ;
    if (todaysBill.length > 0) {
      return (
        <div>
          <p> </p>
          <p> Date : {todaysBill[0].date} </p>
          <p> Bill Amount : {Number(todaysBill[0].price).toFixed(2)} </p>
        </div>
      );
    } else {
      return (
        <h4 style={styles.styleForNoBill}>
          <img src={NoBill} alt="" /> No bills have been generated today
        </h4>
      );
    }
  }

  render() {
    let yearAmount = yearwiseData(this.props.BillList);

    // console.log('bill details' , this.props.BillList);
    return (
      <Fragment>
        <Container fluid={true}>
          <Row>
            <Col
              className="text-center"
              style={styles.header}
              sm="12"
              md="12"
              xs="12"
              lg="12"
            >
              Todays Bill
            </Col>
          </Row>
          {this.renderTodaysBill()}
          <Row>
            <Col
              className="text-center"
              style={styles.header}
              sm="12"
              md="12"
              xs="12"
              lg="12"
            >
              Bill By Month and Year
            </Col>
          </Row>
          <Row>
            {yearAmount.map((value, key) => {
              return (
                <Col
                  key={key}
                  className="text-center"
                  sm="6"
                  md="6"
                  xs="12"
                  lg="6"
                >
                  <YearBill
                    billList={this.props.BillList}
                    year={value.year}
                    amount={value.amount}
                  />
                </Col>
              );
            })}
          </Row>
        </Container>
      </Fragment>
    );
  }
}
