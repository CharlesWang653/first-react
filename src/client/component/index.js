import React from "react";
import {Router, Route, Switch} from "react-router-dom";
import Create from "./create";
import Home from "./home";
import Edit from "./edit";
import NewHome from "./newHome";
import {history} from "../redux/store/store";
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route path="/home" component={NewHome} />
          <Route path="/create" component={Create} />
          <Route path="/edit/:id" component={Edit} />
        </Switch>
      </Router>
    );
  }
}
export default App;