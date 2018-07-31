import React, { Component } from "react";
import {Row,Col} from 'reactstrap';

import slide1 from '../../Images/slide1.png';
import slide2 from '../../Images/slide2.png';
import slide3 from '../../Images/slide3.png';
import slide4 from '../../Images/slide4.png';


const styles = {
  carousel : {
    backgroundColor:"white",
    height:"500px"
  } ,
  firstrowBorder:{
    marginTop:"80px"
  },
  rowBorder:{
    marginTop:"35px"
  }
}

export default class SimpleSlider extends Component {
  render() {
    return (
      <div style ={styles.carousel}>
          <Row style ={styles.rowBorder}>
          <Col className="text-center"  sm="12" md="12" xs="12" lg="12">
                  <h4> How Its Done </h4>
          </Col >
          </Row>
          <Row style ={styles.rowBorder} >
          <Col className="text-center" sm="6" md="6" xs="6" lg="6">
              <img src={slide3} alt=" " />
          </Col>
          <Col className="text-center" sm="6" md="6" xs="6" lg="6">
                <img src={slide1} alt=" " />
          </Col>
          </Row>
          <Row style ={styles.rowBorder}>
          <Col className="text-center" sm="6" md="6" xs="6" lg="6">
                <h4> Enter the Order of your Customers  </h4>
          </Col>
          <Col className="text-center" sm="6" md="6" xs="6" lg="6">
                <h4> Keep Track of the Tables  </h4>
          </Col>
          </Row>
          <Row style ={styles.rowBorder}>
          <Col className="text-center" sm="6" md="6" xs="6" lg="6">
            <img src={slide2} alt=" " />
          </Col>
          <Col className="text-center"  sm="6" md="6" xs="6" lg="6">
                  <img src={slide4} alt=" " />
          </Col>
          </Row>
          <Row style ={styles.rowBorder}>
          <Col className="text-center" sm="6" md="6" xs="6" lg="6">
                <h4> Generate the Bill , GST Compliant </h4>
          </Col>
          <Col className="text-center" sm="6" md="6" xs="6" lg="6">
                <h4> View the Bills History </h4>
          </Col>
          </Row>
      </div>
    );
  }
}
