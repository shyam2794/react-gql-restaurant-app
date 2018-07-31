import React from 'react';
import { Button, Modal, ModalHeader, ModalBody , Table } from 'reactstrap';

class DayWiseBill extends React.Component {
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
   
  dayWiseBill(history,monthdata)
  {  
    const tableStyle = {
        Table : {
            backgroundColor:"beige",
            padding:"20px",
            marginTop:"10px",
            fontFamily: 'Roboto',
          }
        }
       
    let historyCopy = JSON.parse(JSON.stringify(history));  
    let dayWiseBill = historyCopy.filter(value => value.month === monthdata.month && value.year === monthdata.year );

       return (
        <Table style={tableStyle}>
        <thead>
                 <tr>
                   <th> Date </th>
                   <th> Amount </th>
                 </tr>
         </thead>
         <tbody>
           {dayWiseBill.map((value,key) => {
              return( <tr key={`Table-${key}`}>
                  <td> {value.date} </td>
                  <td> {Number(value.price).toFixed(2)} </td>
               </tr>
             )
           })}
            </tbody>
      </Table>
       )
  }

  render() {
      const {monthName , year , monthData , history } = this.props ; 
    return (
      <div>
        <Button color="primary" onClick={this.toggle}> viewDayWise </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>  Day Wise Bills for {monthName} - {year} </ModalHeader>
          <ModalBody>
              {this.dayWiseBill(history,monthData)}
        </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default DayWiseBill;