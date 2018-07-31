import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Row, Col } from "reactstrap";

import { connect } from "react-redux";
import * as actions from "../../actions";
import { bindActionCreators } from "redux";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  })
});

class PaperSheet extends Component {
  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
  }

  deleteItem(id) {
    this.props.deleteMenuFromDB(id);
  }

  allMenu = (category, menuFromDB, classes, deleteicon) => {
    let menu = [];
    if (category === "All") {
      menu = menuFromDB.map(value => value);
    } else {
      menu = menuFromDB.filter(value => value.category === category);
    }

    return menu.map((value, key) => {
      return (
        <div key={`${value.name}-${key}`}>
          <Row>
            <Col sm="2" xs="2" md="2" lg="2" />
            <Col sm="7" xs="7" md="7" lg="7">
              <Paper className={classes.root} elevation={4}>
                <Row>
                  <Col className="text-right" sm="6" xs="6" md="6" lg="6">
                    {value.name}
                  </Col>
                  <Col sm="6" xs="6" md="6" lg="6">
                    - Rs.{value.price}
                  </Col>
                </Row>
              </Paper>
            </Col>
            <Col sm="3" xs="3" md="3" lg="3">
              <i
                className="fa fa-trash"
                style={deleteicon.fonticon}
                onClick={() => this.deleteItem(value.id)}
                aria-hidden="true"
              />
            </Col>
          </Row>
          <br />
        </div>
      );
    });
  };

  render() {
    // console.log('menu item from DB' , this.props);
    let deleteicon = {
      fonticon: {
        marginTop: "25px",
        fontSize: "2em"
      }
    };
    const { category, classes, menusFromDB } = this.props;
    // console.log(this.props);
    return (
      <div>{this.allMenu(category, menusFromDB, classes, deleteicon)}</div>
    );
  }
}

const mapDispatchToProps = function(dispatch) {
  return bindActionCreators(
    {
      deleteMenuFromDB: actions.deleteMenuFromDB
    },
    dispatch
  );
};

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(PaperSheet));
