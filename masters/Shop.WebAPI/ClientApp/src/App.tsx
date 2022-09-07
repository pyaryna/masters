import { FC } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/AboutUs";
import Layout from "./components/Layout/Layout";

import { MetadataProvider } from "./contexts/MetadataContext";

import "./App.css";

const App: FC = () => (
  <div className="App">
    <BrowserRouter>
      <MetadataProvider>
        <Layout>
          <Switch>
            {/* <PrivateRoute exact path="/measures" component={Measures} /> */}

            <Route path="/about-us" component={AboutUs} />
            <Route path="/" component={Home} />
          </Switch>
        </Layout>
      </MetadataProvider>
    </BrowserRouter>
  </div>
);

export default App;
