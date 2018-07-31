import React , { Component } from 'react' ;
import {Container , Row , Col} from 'reactstrap';

import MenuItemForm from './EnterMenu';
import MenuListRender from './MenuListRender';
import Header from '../Header';

const styles = {
  header:{
    fontFamily: 'Raleway,Dosis',
    fontSize:'24px',
    backgroundColor:"#B3E5FC",
    padding:"5px 0px",
    borderRadius:"5px",
    fontWeight:"bold",
    marginTop:"120px"
  },
  menuborder:{
    borderRadius:"5px",
    padding:"20px 0px 10px 0px",
    backgroundColor:"#FAFAFA",
    WebkitBoxShadow: "5px 3px 5px -1px rgba(0,0,0,0.47)",
    MozBoxShadow: "5px 3px 5px -1px rgba(0,0,0,0.47)",
    boxShadow: "5px 3px 5px -1px rgba(0,0,0,0.47)"
  },
  border:{
    borderRadius:"5px",
    padding:"20px 0px 10px 0px",
    backgroundColor:"#F5F5F5",
  }
}

class MenuListContainer extends Component{

  render()
  {
    return (
      <div>
         <Header />
         <Container>
           <p></p>
          <Row>
            <Col style={styles.header} xs="12" sm="12" md="12" lg="12">
            <div className="text-center" > Enter Menu </div>
            </Col>
          </Row>
          <p></p>
         <Row>
        <Col sm="12" md="12" lg="12" style={styles.border} className="text-center">
         <MenuItemForm />
         </Col>
         </Row>
          <p></p>
         <Row>
        <Col sm="12" md="12" lg="12" className="text-center">
         <MenuListRender />
         </Col>
         </Row>
       </Container>
         </div>
    )
  }
}

export default MenuListContainer;
