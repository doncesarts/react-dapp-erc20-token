import React from "react";
import {  Route, Switch } from "react-router-dom";

import Home from './pages/Home';
import Kyc from './pages/Kyc';
import MyWallet from './pages/MyWallet';
class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/kyc" component={Kyc} />
        <Route exact path="/myWallet" component={MyWallet} />
      <Route
        render={function() {
          return <h1>Not Found</h1>;
        }}
      />
    </Switch>

    );
  }
}

export default Routes;
