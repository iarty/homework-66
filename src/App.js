import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import HeaderNav from "./components/HeaderNav/HeaderNav";
import QuotesList from "./containers/QuotesList/QuotesList";
import QuoteDataForm from "./containers/QuoteDataForm/QuoteDataForm";

export default function App() {
  return (
    <Layout>
      <HeaderNav />
      <div className="container ">
        <div className="d-flex justify-content-center">
          <Switch>
            <Route path="/newQuotes" component={QuoteDataForm} />
            <Route
              path="/quotes/:id/edit"
              render={props => (
                <QuoteDataForm {...props} title="Edit quote" btn="Edit" />
              )}
            />
            <Route path="/quotes/:name" component={QuotesList} />
            <Route path={"/" || "/quotes"} component={QuotesList} exact />
            <Route
              render={() => (
                <div className="container mt-5">
                  <div className="text-center">
                    <h1>Not found!</h1>
                  </div>
                </div>
              )}
            />
          </Switch>
        </div>
      </div>
    </Layout>
  );
}
