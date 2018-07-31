import React , {Component} from 'react' ;
import {Row , Col} from 'reactstrap';

import Header from '../Header';
import Carousel from './Carousel';


const styles = {
  jumbotron:{
    height:550,
    backgroundColor:"black",
    color:"white"
  },
  heading:{
    marginTop:250
  }
}

class Homepage extends Component
{
  render()
  {
    return (
        <div>
         <Header />
         <div style={styles.jumbotron}>
             <Row>
               <Col xs="2" sm="2" md="2" lg="2" >
               </Col>
               <Col className="text-center" xs="8" sm="8" md="8" lg="8">
                 <h2 style={styles.heading}>
                     "A Mobile Come Web Application which changes the way of handling Invoice"
                 </h2>
               </Col>
               <Col xs="2" sm="2" md="2" lg="2" >
               </Col>
             </Row>
         </div>
         <Carousel />
        </div>
    )
  }
}

export default Homepage ;
