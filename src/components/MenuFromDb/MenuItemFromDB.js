import React, { Component, Fragment } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";
import { Row, Col } from "reactstrap";

import { connect } from "react-redux";
import * as actions from "../../actions";

const styles = {
  menuItem: {
    marginTop: 10
  },

  cardBodyBackground: {
    background: "#37177b" /* fallback for old browsers */,
    // background:
    //   "-webkit-linear-gradient(to right, #4A00E0, #8E2DE2)" /* Chrome 10-25, Safari 5.1-6 */,
    // background:
    //   "linear-gradient(to right, #4A00E0, #8E2DE2)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
    borderBottom: "solid 0.5px white",
    color: "white",
    padding: "20px"
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
                <div style={styles.cardBodyBackground}>
                  <Row>
                    <CardBody>
                      <CardTitle>{value.name}</CardTitle>
                      <CardSubtitle> {value.category} </CardSubtitle>
                    </CardBody>
                  </Row>
                </div>
                <div
                  style={{
                    backgroundColor: "black",
                    color: "white"
                  }}
                >
                  <Row>
                    <Col className="text-center" sm="8" md="8" lg="8" xs="8">
                      <h5
                        style={{
                          padding: "15px"
                        }}
                      >
                        {" "}
                        ₹-
                        {Number(value.price).toFixed(2)}
                      </h5>
                    </Col>
                    <Col sm="4" md="4" lg="4" xs="4">
                      <p className="text-center">
                        <Button
                          style={{ marginTop: "10px" }}
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
                </div>
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
