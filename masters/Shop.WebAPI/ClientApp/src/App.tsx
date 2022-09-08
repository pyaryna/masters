import { FC } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/AboutUs";
import Layout from "./components/Layout/Layout";
import BookDetails from "./pages/BookDetails/BookDetails";

import { FilterProvider } from "./contexts/FilterContext";
import { MetadataProvider } from "./contexts/MetadataContext";

import "./App.css";

const App: FC = () => (
  <div className="App">
    <BrowserRouter>
      <MetadataProvider>
        <FilterProvider>
          <Layout>
            <Switch>
              {/* <PrivateRoute exact path="/measures" component={Measures} /> */}
              <Route path="/:id" component={BookDetails} />
              <Route path="/about-us" component={AboutUs} />
              <Route path="/" component={Home} />
            </Switch>
          </Layout>
        </FilterProvider>
      </MetadataProvider>
    </BrowserRouter>
  </div>
);

export default App;
