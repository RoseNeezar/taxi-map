import React, { FC } from "react";
import { QueryClientProvider } from "react-query";
import { Router, BrowserRouter, Route, Switch } from "react-router-dom";
import ErrorPage from "./pageComponent/ErrorPage/ErrorPage";
import MapPage from "./pageComponent/Map/MapPage";
import NotFound from "./pageComponent/NotFound/NotFound";
import { queryClient } from "./store/queryClient";
import Navigate from "./utils/Navigate";

const SafeHydrate: FC = ({ children }) => {
  return (
    <div suppressHydrationWarning>
      {typeof document === "undefined" ? null : children}
    </div>
  );
};

const MainPage = () => {
  return (
    <SafeHydrate>
      <QueryClientProvider client={queryClient}>
        <Router history={Navigate!}>
          <Route
            render={() => (
              <>
                <Switch>
                  <Route exact path="/" component={MapPage} />
                  <Route exact path="/error" component={ErrorPage} />
                  <Route path="*" component={NotFound} />
                </Switch>
              </>
            )}
          />
        </Router>
      </QueryClientProvider>
    </SafeHydrate>
  );
};

export default MainPage;
