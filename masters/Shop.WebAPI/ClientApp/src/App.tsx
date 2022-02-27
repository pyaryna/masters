import { FC } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import AboutUs from "./pages/AboutUs/AboutUs";
import Layout from "./components/Layout/Layout";

import "./App.css";

const App: FC = () => (
  <div className="App">
    <BrowserRouter>
      <Layout>
        <Switch>
          {/* <PrivateRoute exact path="/measures" component={Measures} /> */}

          <Route path="/about-us" component={AboutUs} />
        </Switch>
      </Layout>
    </BrowserRouter>
  </div>
);

export default App;
