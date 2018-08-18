import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import { postMenu } from "./postMenu";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";

import MenuListItem from "./MenuListItem";

class MenuListRender extends Component {
  onMenuSubmit = () =>
    postMenu(this.props.menuItems, () =>
      this.props.history.push("/FinalMenuList")
    );

  getMenu = () => this.props.history.push("/FinalMenuList");

  refreshMenu = () => this.props.clearMenuItem();

  render() {
    // console.log(this.props);
    return (
      <div>
        <MenuListItem item={this.props.menuItems} />
        <Row>
          <Col sm="3" md="3" lg="3" xs="3" />
          <Col className="text-center" sm="2" md="2" lg="2" xs="2">
            <button onClick={this.onMenuSubmit} className="btn btn-primary">
              {" "}
              submit{" "}
            </button>
          </Col>
          <Col className="text-center" sm="2" md="2" lg="2" xs="2">
            <button onClick={this.getMenu} className="btn btn-primary">
              {" "}
              My Menu{" "}
            </button>
          </Col>
          <Col className="text-center" sm="2" md="2" lg="2" xs="2">
            <button onClick={this.refreshMenu} className="btn btn-primary">
              {" "}
              Clear Menu{" "}
            </button>
          </Col>
          <Col sm="3" md="3" lg="3" xs="3" />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({ menuItems: state.menulist });

export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(MenuListRender)
);
