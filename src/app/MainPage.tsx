import React, { FC } from "react";
import { QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MapPage from "./pageComponent/Map/MapPage";
import { queryClient } from "./store/queryClient";

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
        <BrowserRouter>
          <Route
            render={() => (
              <>
                <Switch>
                  <Route exact path="/" component={MapPage} />
                </Switch>
              </>
            )}
          />
        </BrowserRouter>
      </QueryClientProvider>
    </SafeHydrate>
  );
};

export default MainPage;
