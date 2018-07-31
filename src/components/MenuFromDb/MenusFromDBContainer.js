import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col, Container } from "reactstrap";

import * as actions from "./../../actions";
import Header from "../Header";
import RenderCategories from "./RenderCategories";
import MenusFromDBRenderer from "./MenuListFromDBRenderer";

const styles = {
  Message: {
    marginTop: "300px"
  },
  enterMenuButton: {
    marginTop: "50px"
  },
  header: {
    fontFamily: "Raleway , Dosis",
    fontSize: "24px",
    backgroundColor: "black",
    padding: "5px 0px",
    borderRadius: "5px",
    color: "white",
    marginTop: "100px",
    marginLeft: "0px"
  }
};

class FinalMenuList extends Component {
  state = {
    category: "All"
  };

  componentDidMount() {
    this.props.getMenuFromDB();
  }

  onClickCategory = value => {
    // console.log("selected Item in DB Container", value);
    this.setState({
      category: value
    });
  };

  render() {
    // console.log(this.props.menusFromDB);
    if (!this.props.menusFromDB.length) {
      return (
        <div>
          <Header />
          <Row style={styles.Message} className="text-center">
            <Col sm="3" md="3" xs="3" lg="3">
              {" "}
            </Col>
            <Col sm="6" md="6" xs="6" lg="6">
              <h3> There are no Menus !... </h3>
              <button
                style={styles.enterMenuButton}
                onClick={() => this.props.history.push("/Menu")}
                className="btn btn-primary"
              >
                {" "}
                Add Menu Item{" "}
              </button>
            </Col>
            <Col sm="3" md="3" xs="3" lg="3">
              {" "}
            </Col>
          </Row>
        </div>
      );
    }

    let categories = this.props.menusFromDB.map((value, key) => value.category);
    let distinctCategories = [...new Set(categories)];

    return (
      <div>
        <Header />
        <Container>
          <Row>
            <Col sm="3" md="3" xs="3" lg="3">
              <h5 style={styles.header} className="text-center">
                {" "}
                Categories{" "}
              </h5>
              <Row>
                <Col sm="12" md="12" xs="12" lg="12">
                  <RenderCategories
                    categories={distinctCategories}
                    onClickEvent={this.onClickCategory}
                  />
                </Col>
              </Row>
            </Col>
            <Col sm="9" md="9" xs="9" lg="9">
              <MenusFromDBRenderer
                menusFromDB={this.props.menusFromDB}
                category={this.state.category}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getMenuFromDB: actions.getMenuFromDB
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    menusFromDB: state.menusFromDB
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FinalMenuList);
