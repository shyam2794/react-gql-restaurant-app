import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Row,Col,Modal, ModalHeader, ModalBody,Table } from 'reactstrap';

import {showMonthWise} from './billByYear';
import DayWiseBill from './dayWiseBill';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});

class PaperSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
   this.toggle = this.toggle.bind(this);
   this.renderMonthAmount = this.renderMonthAmount.bind(this);
}

toggle() {
  this.setState({
    modal: !this.state.modal
  });
}

renderMonthAmount(monthData,year)
{
   const tableStyle = {
     Table : {
         backgroundColor:"beige",
         padding:"20px",
         marginTop:"10px",
         fontFamily: 'Roboto',
       }
     }

  let newMonth = JSON.parse(JSON.stringify(monthData));
  let order = newMonth.filter(value => value.year === year);
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

   return(
     <div>
         <ModalHeader toggle={this.toggle}> Bill Amount by Month - {year}</ModalHeader>
       <ModalBody>
         <Table style={tableStyle}>
           <thead>
                    <tr>
                      <th> Month </th>
                      <th> Amount </th>
                      <th> Daywise </th>
                    </tr>
            </thead>
            <tbody>
           {order.map((value,key) => {
              return( <tr key={`Table-${key}`}>
                  <td> {monthNames[value.month - 1]} </td>
                  <td> {Number(value.amount).toFixed(2)} </td>
                 <td> <DayWiseBill monthData={value} history={this.props.billList} year={this.props.year} monthName={monthNames[value.month - 1]}/> </td>
               </tr>
             )
           })}
            </tbody>
         </Table>
       </ModalBody>
   </div>
   )
}

  render()
  {
  const { classes,year,amount , billList} = this.props;

  let monthData = showMonthWise(year,billList);
  //console.log(monthData);

  return (
    <div onClick={this.toggle}>
      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">
        <Row>
        <Col className="text-center" sm="6" md="6" xs="12" lg="6">
          <p>Year:{" "} {year} </p>
        </Col>
        <Col className="text-center" sm="6" md="6" xs="12" lg="6">
          <p>Amount:{" "} {Number(amount).toFixed(2)} </p>
        </Col>
        </Row>
        </Typography>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
               {this.renderMonthAmount(monthData,year)}
        </Modal>
      </Paper>
    </div>
  );
}
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);
