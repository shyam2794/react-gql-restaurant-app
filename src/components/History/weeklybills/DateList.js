import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

const styles = {
  listItem: {
    cursor: "pointer"
  }
};

class DateList extends Component {
  onClickDate = value => {
    this.props.onClickDate(value);
  };

  render() {
    // console.log(this.props);
    const { weeklyOrders } = this.props;

    let dates = weeklyOrders.map(value => value.date);
    let uniqueDates = [...new Set(dates)].reverse();
    return (
      <div>
        <ListGroup>
          <ListGroupItem
            style={styles.listItem}
            onClick={() => this.onClickDate("All")}
          >
            {" "}
            All Bills{" "}
          </ListGroupItem>
          {uniqueDates.map((value, key) => {
            return (
              <ListGroupItem
                style={styles.listItem}
                key={key}
                onClick={() => this.onClickDate(value)}
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

export default DateList;
