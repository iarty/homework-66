import React, { Component, Fragment } from "react";
import { Sugar } from "react-preloaders";

const withLoader = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        interceptorsId: null
      };

      this.state.interceptorsId = axios.interceptors.request.use(
        option => {
          this.setState({ loading: true });
          return option;
        },
        error => {
          console.log(error);
          return error;
        }
      );

      this.state.interceptorsId = axios.interceptors.response.use(
        res => {
          this.setState({ loading: false });
          return res;
        },
        error => {
          this.setState({ loading: false });
          return error;
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.response.eject(this.state.interceptorsId);
    }

    render() {
      return (
        <Fragment>
          {this.state.loading && <Sugar />}
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  };
};

export default withLoader;
