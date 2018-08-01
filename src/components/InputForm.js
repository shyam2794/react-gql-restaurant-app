import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as actions from "../actions";

class Signin extends Component {
  handleFormSubmit = values => {
    this.props.signin(values, result => {
      if (result.Kudil === 0 && result.partyhall === 0)
        this.props.history.push("/TableDetails");
      else this.props.history.push("/Booking");
    });
  };

  render() {
    const { handleSubmit } = this.props;

    const renderInput = ({ input, meta, label, type }) => {
      return (
        <div className="form-group">
          <label htmlFor="username">{label} </label> <br />
          <input className="form-control" type={type} {...input} />
          {type === "password" ? (
            <small id="emailHelp" className="form-text text-muted">
              The password should be more than 6 characters.
            </small>
          ) : (
            " "
          )}
        </div>
      );
    };

    return (
      <form
        className="form-container"
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
      >
        <Field
          name="username"
          label="username"
          component={renderInput}
          type="text"
        />
        <Field
          name="password"
          label="password"
          component={renderInput}
          type="password"
        />
        <button type="submit" className="btn btn-primary btn-block">
          Submit
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  usertest: state.usertest
});

export default withRouter(
  reduxForm({
    form: "signin",
    initialValues: {
      username: "a@x.c",
      password: "a"
    }
  })(
    connect(
      mapStateToProps,
      actions
    )(Signin)
  )
);
