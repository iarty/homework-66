import React, { Component } from "react";
import axios from "../../axios/axios";
import QuotesItem from "../../components/QuotesItem/QuotesItem";
import withLoader from "../../hoc/withLoader/withLoader";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";

class Quotes extends Component {
  state = {
    quotes: []
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.props.match.params.name &&
      prevProps.match.params.name !== this.props.match.params.name
    ) {
      const response = await axios.get(
        `/quotes.json?orderBy="category"&equalTo="${this.props.match.params.name}"`
      );
      this.dataHandler(response.data);
    } else if (prevProps.match.params.name !== this.props.match.params.name) {
      const response = await axios.get("/quotes.json");
      this.dataHandler(response.data);
    }
  }

  async componentDidMount() {
    const response = await axios.get("/quotes.json");
    this.dataHandler(response.data);
    this.props.history.push("/");
  }

  dataHandler = data => {
    const quotes = [];
    if (data) {
      Object.keys(data).forEach(key => {
        quotes.push({
          id: key,
          ...data[key]
        });
      });
      this.setState({ quotes });
    }
  };

  quoteRemove = async id => {
    this.setState(prevState => ({
      quotes: prevState.quotes.filter(el => el.id !== id)
    }));
    await axios.delete(`/quotes/${id}.json`);
  };

  render() {
    const name = this.props.match.params.name || "All";
    return (
      <div className="mt-5">
        <h1>{name}</h1>
        {this.state.quotes.map((quote, index) => (

          <ErrorBoundary key={index}>
            <QuotesItem
              onDelete={this.quoteRemove}
              key={index}
              text={quote.text}
              author={quote.author}
              id={quote.id}
            />
          </ErrorBoundary>
        ))}
      </div>
    );
  }
}

export default withLoader(Quotes, axios);
