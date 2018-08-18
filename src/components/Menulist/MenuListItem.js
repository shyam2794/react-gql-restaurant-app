import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
import * as actions from "../../actions";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  })
});

class PaperSheet extends Component {
  deleteItem = name => this.props.menulist(name);

  render() {
    let deleteicon = {
      fonticon: {
        marginTop: "25px",
        fontSize: "2em"
      }
    };
    const { classes, item } = this.props;
    // console.log(this.props);
    return (
      <div>
        {item.map((value, key) => {
          return (
            <div key={`${value.name}-${key}`}>
              <Row>
                <Col sm="3" xs="3" md="3" lg="3" />
                <Col sm="6" xs="6" md="6" lg="6">
                  <Paper className={classes.root} elevation={4}>
                    <Typography variant="headline" component="h3">
                      {value.name}
                    </Typography>
                    <Typography component="p">{value.price}</Typography>
                  </Paper>
                </Col>
                <Col sm="3" xs="3" md="3" lg="3">
                  <i
                    className="fa fa-trash"
                    style={deleteicon.fonticon}
                    onClick={() => {
                      this.deleteItem(value.name);
                    }}
                    aria-hidden="true"
                  />
                </Col>
              </Row>
              <br />
            </div>
          );
        })}
      </div>
    );
  }
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  actions
)(withStyles(styles)(PaperSheet));
