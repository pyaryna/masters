import { FC } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Content from "./pages/Home/Content";
import AboutUs from "./pages/AboutUs/AboutUs";
import Layout from "./components/Layout/Layout";
import Contacts from "./pages/Contacts/Contacts";
import Collaborative from "./pages/Home/Collaborative";
import BookDetails from "./pages/BookDetails/BookDetails";

import { UserProvider } from "./contexts/UserContext";
import { FilterProvider } from "./contexts/FilterContext";
import { MetadataProvider } from "./contexts/MetadataContext";

import "./App.css";

const App: FC = () => (
  <div className="App">
    <BrowserRouter>
      <UserProvider>
        <MetadataProvider>
          <FilterProvider>
            <Layout>
              <Switch>
                <Route exact path="/about-us" component={AboutUs} />
                <Route exact path="/collab-recom" component={Collaborative} />
                <Route exact path="/content-recom" component={Content} />
                <Route exact path="/contacts" component={Contacts} />
                <Route path="/:id" component={BookDetails} />
                <Route path="/" component={Home} />
              </Switch>
            </Layout>
          </FilterProvider>
        </MetadataProvider>
      </UserProvider>
    </BrowserRouter>
  </div>
);

export default App;
