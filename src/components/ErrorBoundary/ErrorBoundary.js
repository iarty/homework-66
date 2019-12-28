import React, { Component } from "react";
import { MDBCard, MDBCardBody } from "mdbreact";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    errorMessage: ""
  };

  componentDidCatch = (error, errorInfo) => {
    console.log(errorInfo);
    this.setState({ hasError: true, errorMessage: error });
  };

  render() {
    if (this.state.hasError) {
      return (
        <li
          className="chat-message d-flex justify-content-between mb-4"
          style={{ color: "red" }}
        >
          <MDBCard>
            <MDBCardBody style={{ width: 900 }}>
              <blockquote className="mb-3 p-2">
                <p>"ERROR"</p>
              </blockquote>
              <cite className="p-2">&mdash; ERROR</cite>
            </MDBCardBody>
          </MDBCard>
        </li>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
