import React , {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row , Col} from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../actions';


class TableForm extends Component {

  constructor(props){
    super(props);

    this.state={
      tabletype:"",
      tablecount:"",
      tableDetailList:[]
    }

    this.onTableInputChange = this.onTableInputChange.bind(this);
    this.onCountInputChange = this.onCountInputChange.bind(this);
    this.onButtonSubmit = this.onButtonSubmit.bind(this);
    this.onClickClose = this.onClickClose.bind(this);
  }

  onTableInputChange(e){
     this.setState({
       tabletype:e.target.value
     })
  }


  onCountInputChange(e){
    this.setState({
      tablecount:e.target.value
    })
    }

   onButtonSubmit(e){
      e.preventDefault();
      let countarray = [];
      for (var i=0;i<this.state.tablecount;i++)
      {
        countarray.push(i+1);
      }
      let tablelist = {
        res_id:Number(localStorage.getItem('id')),
        tabletype:this.state.tabletype,
        tablecount:Number(this.state.tablecount)
       }
      let newTableDetailList = [...this.state.tableDetailList , tablelist]
      this.setState({
        tableDetailList:newTableDetailList
      })

      this.props.postTableDetails(tablelist);
    }

    onClickClose(e){
      e.preventDefault();
      let id = localStorage.getItem('id');
      this.props.postResDetail(id,this.state.tableDetailList);
      this.props.toggleScreen();
    }

  render()
  {
    return(
     <Container fluid={true}>
       <Form >
         <Row className="text-center">
             <Col sm="2" md="2" lg="2" xs="2"></Col>
        <Col sm="8" md="8" lg="8" xs="8">
        <FormGroup row>
          <Label for="exampleEmail" sm="4" md="4" xs="4" lg="4">Table Type</Label>
	  <Col sm={6}>
          <Input type="Text" name="Tabletype" id="Tabletype" placeholder="Example - Dinning"  value={this.state.tabletype} onChange={this.onTableInputChange}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="examplePassword" sm="4" md="4" xs="4" lg="4"> Count </Label>
           <Col sm={6}>
          <Input type="number" name="count" id="count" placeholder="Example - 1" value={this.state.tablecount} onChange={this.onCountInputChange}/>
            </Col>
        </FormGroup>
           </Col>
           <Col sm="2" md="2" lg="2" xs="2"></Col>
           </Row>
          <Row>
            <Col sm="3" md="3" lg="3" xs="3" ></Col>
           <Col className="text-center" sm="3" md="3" lg="3" xs="3">
        <Button type="submit" onClick={this.onButtonSubmit}>Submit</Button>
        </Col>
        <Col className="text-center" sm="3" md="3" lg="3" xs="3">
        <Button type="submit" onClick={this.onClickClose}>Close</Button>
        </Col>
        <Col sm="3" md="3" lg="3" xs="3"></Col>
          </Row>
      </Form>
     </Container>
   )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    postResDetail:actions.postResDetail,
    postTableDetails:actions.postTableDetails
  }, dispatch)
}

function mapStateToProps(state)
{
  return {
    resDetails:state.tabledata ,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TableForm) ;
