import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";

import * as actions from "../../actions";

const styles = {
  button: {
    marginTop: "30px"
  },
  border: {
    border: "solid 1px",
    paddingLeft: "30px"
  },
  menuheader: {
    marginTop: "80px"
  }
};

class EnterMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: "",
      cost: "",
      course: "",
      category: ""
    };

    this.onMenuInputChange = this.onMenuInputChange.bind(this);
    this.onCostInputChange = this.onCostInputChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick(e) {
    e.preventDefault();
    this.setState({
      menu: "",
      cost: ""
    });
    let menuitem = {
      res_id: Number(localStorage.getItem("id")),
      name: this.state.menu.trim(),
      price: Number(this.state.cost),
      course: this.state.course.trim(),
      category: this.state.category.trim()
    };
    //console.log(menuitem);
    this.props.menulist(menuitem);
  }

  onMenuInputChange(e) {
    this.setState({
      menu: e.target.value
    });
  }

  onCostInputChange(e) {
    this.setState({
      cost: e.target.value
    });
  }

  onChooseCourse = course => {
    this.setState({
      course
    });
  };

  onCategoryChange = e => {
    this.setState({
      category: e.target.value
    });
  };

  render() {
    let categories = [
      "Select Category",
      "VEG SOUP",
      "VEG SALAD",
      "VEG STARTERS",
      "NON VEG SOUP",
      "NON VEG STARTERS",
      "SEA FOOD",
      "TANDOORI",
      "ROTI",
      "VEG GRAVY",
      "NON VEG GRAVY",
      "VARIETY RICE(VEG)",
      "VARIETY RICE(NON VEG)",
      "ICE CREAMS",
      "FRESH JUICES",
      "MILKSHAKE",
      "DOSA",
      "OTHERS"
    ];

    let courses = ["Veg", "Non-Veg"];
    return (
      <Form>
        <Row className="text-center">
          <Col sm="2" md="2" lg="2" xs="2" />
          <Col sm="8" md="8" lg="8" xs="8">
            <FormGroup row>
              <Label for="select_Course" sm="4" md="4" xs="4" lg="4">
                Course
              </Label>
              {courses.map((value, key) => {
                return (
                  <Col key={key} className="text-left" sm={2}>
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="checkbox"
                          onChange={() => this.onChooseCourse(value)}
                          name={value}
                        />{" "}
                        {value}
                      </Label>
                    </FormGroup>
                  </Col>
                );
              })}
            </FormGroup>
            <FormGroup row>
              <Label for="select_Category" sm="4" md="4" xs="4" lg="4">
                Category
              </Label>
              <Col sm={6}>
                <Input
                  type="select"
                  name="select"
                  id="select_Category"
                  onChange={this.onCategoryChange}
                >
                  {categories.map((value, key) => {
                    return <option key={key}>{value}</option>;
                  })}
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="menu-item" sm="4" md="4" xs="4" lg="4">
                Menu Name
              </Label>
              <Col sm={6}>
                <Input
                  type="text"
                  name="menu"
                  id="menu"
                  value={this.state.menu}
                  onChange={this.onMenuInputChange}
                  placeholder="Enter Menu Here"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="item-cost" sm="4" md="4" xs="4" lg="4">
                Cost
              </Label>
              <Col sm={6}>
                <Input
                  type="item-cost"
                  name="item-cost"
                  value={this.state.cost}
                  onChange={this.onCostInputChange}
                  id="item-cost"
                  placeholder="Enter Cost Here "
                />
              </Col>
            </FormGroup>
          </Col>
          <Col sm="2" md="2" lg="2" xs="2">
            <Button
              disabled={!this.state.cost}
              style={styles.button}
              onClick={this.onButtonClick}
            >
              {" "}
              Add Item{" "}
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default connect(
  null,
  actions
)(EnterMenu);
