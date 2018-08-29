import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Row, Col, Container } from "reactstrap";
import { css } from "react-emotion";
import { ClimbingBoxLoader } from "react-spinners";

import * as actions from "./../../actions";
import Header from "../Header";
import RenderCategories from "./RenderCategories";
import MenusFromDBRenderer from "./MenuListFromDBRenderer";
import Networkmsg from "../../Images/networkerror.png";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const styles = {
  errorMessage: {
    display: "block",
    margin: "0 auto",
    marginTop: 200
  },
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
  },
  spinnerContainer: {
    marginTop: "200px",
    padding: "30px",
    WebkitBoxShadow: " 1px 0px 27px 5px rgba(0,0,0,0.75)",
    MozBoxShadow: " 1px 0px 27px 5px rgba(0,0,0,0.75)",
    boxShadow: " 1px 0px 27px 5px rgba(0,0,0,0.75)"
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

  renderLoadingSpinner = loading => {
    return (
      <Row>
        <Col sm="4" md="4" lg="4" xs="4">
          {" "}
        </Col>
        <Col className="text-center" sm="4" md="4" lg="4" xs="4">
          <div style={styles.spinnerContainer}>
            <ClimbingBoxLoader
              className={override}
              sizeUnit={"px"}
              size={20}
              color={"#123abc"}
              loading={loading}
            />{" "}
            <br />
            <h3 className="text-center"> Loading </h3>
          </div>
        </Col>
        <Col sm="4" md="4" lg="4" xs="4" />
      </Row>
    );
  };
  render() {
    const { loading, menuList, error } = this.props.menusFromDB;
    console.log(this.props.menusFromDB);

    if (error) {
      return (
        <Fragment>
          <Header />
          <img style={styles.errorMessage} src={Networkmsg} alt="" />
          <p />
          <h2 className="text-center">
            {" "}
            {`"Oops ${error.message} . Check your internet Connectivity"`}
          </h2>
        </Fragment>
      );
    }

    if (loading) {
      return (
        <Fragment>
          <Header />
          {this.renderLoadingSpinner(loading)}
        </Fragment>
      );
    } else if (!menuList.length) {
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

    let categories = menuList.map((value, key) => value.category);
    let distinctCategories = [...new Set(categories)];

    return (
      <div>
        <Header />
        <Row>
          <Col sm="1" md="1" xs="1" lg="1" />
          <Col class="text-center" sm="2" md="2" xs="2" lg="2">
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
          <Col sm="8" md="8" xs="8" lg="8">
            <MenusFromDBRenderer
              menusFromDB={menuList}
              category={this.state.category}
            />
          </Col>
          <Col sm="1" md="1" xs="1" lg="1" />
        </Row>
      </div>
    );
  }
}

export default connect(
  state => ({ menusFromDB: state.menusFromDB.menuFromDB }),
  actions
)(FinalMenuList);
