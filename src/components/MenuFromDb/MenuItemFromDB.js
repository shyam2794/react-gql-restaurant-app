import React, { Component, Fragment } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";
import { Row, Col } from "reactstrap";

import { connect } from "react-redux";
import * as actions from "../../actions";

const styles = {
  menuItem: {
    marginTop: 10
  }
};

class PaperSheet extends Component {
  deleteItem = id => this.props.deleteMenuFromDB(id);

  allMenu = (category, menuFromDB, deleteicon) => {
    let menu = [];
    if (category === "All") {
      menu = menuFromDB.map(value => value);
    } else {
      menu = menuFromDB.filter(value => value.category === category);
    }

    return (
      <Row>
        {menu.map((value, key) => {
          return (
            <Col
              style={styles.menuItem}
              key={`${value.name}-${key}`}
              sm="4"
              xs="4"
              md="4"
              lg="4"
            >
              <Card>
                <Row>
                  <CardBody>
                    <CardTitle>{value.name}</CardTitle>
                    <CardSubtitle>
                      Rs.
                      {Number(value.price).toFixed(2)}
                    </CardSubtitle>
                  </CardBody>
                </Row>
                <Row>
                  <Col sm="2" md="2" lg="2" xs="2" />
                  <Col sm="9" md="9" lg="9" xs="9">
                    <p className="text-right">
                      <Button
                        onClick={() => this.deleteItem(value.id)}
                        color="danger"
                      >
                        <i
                          className="fa fa-trash"
                          style={deleteicon.fonticon}
                          onClick={() => this.deleteItem(value.id)}
                          aria-hidden="true"
                        />
                      </Button>
                    </p>
                  </Col>
                  <Col sm="1" md="1" lg="1" xs="1" />
                </Row>
              </Card>
            </Col>
          );
        })}
      </Row>
    );
  };

  render() {
    // console.log('menu item from DB' , this.props);
    let deleteicon = {
      fonticon: {
        fontSize: "1em"
      }
    };
    const { category, menusFromDB } = this.props;
    // console.log(this.props);
    return (
      <div>
        {this.allMenu(category, menusFromDB, deleteicon)} <p />
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(PaperSheet);
