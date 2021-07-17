import './App.css';
import React from "react";
import Characters from "./components/Characters";
import CharacterDetail from "./components/CharacterDetail";
import NotFound from "./components/NotFound";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Characters}>
          </Route>
          <Route exact path="/character/:id" component={CharacterDetail}>
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
