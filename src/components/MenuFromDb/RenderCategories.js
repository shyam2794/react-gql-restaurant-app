import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

class RenderCategories extends Component {
  onClickCategory = value => {
    this.props.onClickEvent(value);
  };

  render() {
    return (
      <div>
        <ListGroup>
          <ListGroupItem onClick={() => this.onClickCategory("All")}>
            {" "}
            All Categories{" "}
          </ListGroupItem>
          {this.props.categories.map((value, key) => {
            return (
              <ListGroupItem
                onClick={() => this.onClickCategory(value)}
                key={key}
              >
                {value}
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </div>
    );
  }
}

export default RenderCategories;
