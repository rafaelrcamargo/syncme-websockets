import React, { useEffect, useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "../pages/Home";
import SyncMobile from "../pages/SyncMobile";
import SyncDesktop from "../pages/SyncDesktop";
import { SyncContext } from "../context/SyncContext";

import { Footer } from "../components/Footer";

import "../styles/Routes.css";
import { ThemeSelector } from "../components/ThemeSelector";

const Routes = () => {
  const { setRootId, setMobileId } = useContext(SyncContext);

  useEffect(() => {
    setRootId(Math.round(Math.random() * 999999));
    setMobileId(Math.round(Math.random() * 999999));
  }, []);

  return (
    <div className="world-wrapper">
      <ThemeSelector />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/sync-mobile/:rootId/:mobileId"
            component={SyncMobile}
          />
          <Route
            exact
            path="/sync-desktop/:rootId/:mobileId"
            component={SyncDesktop}
          />
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default Routes;
