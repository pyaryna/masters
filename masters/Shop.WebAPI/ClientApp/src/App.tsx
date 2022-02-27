import { FC } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";

import "./App.css";

const App: FC = () => (
  <div className="App">
    <BrowserRouter>
      <Layout>
        <Switch>
          {/* <PrivateRoute exact path="/measures" component={Measures} /> */}

          {/* <Route path="/" component={Home} /> */}
        </Switch>
      </Layout>
    </BrowserRouter>
  </div>
);

export default App;
