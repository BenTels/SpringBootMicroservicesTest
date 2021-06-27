import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { loginFunction } from "./KeyCloakService";
import { StateManipulation } from "./StateManipulation";
import { StateService } from "./StateService";
import { TokenControl } from "./TokenControl";

export default function App() {

  const [remoteTerms, updateTerms] : [string[], React.Dispatch<React.SetStateAction<string[]>>]= useState<string[]>([]);
  const [token, replaceToken] : [string | undefined, React.Dispatch<React.SetStateAction<string | undefined>>]= useState<string | undefined>(undefined);

  let stateService: StateService = new StateService(token, (s: string[]) => updateTerms(s));

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/state">State Manipulation</Link>
            </li>
            <li>
              <Link to="/token">Token Control</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/state">
            <StateManipulation termList={remoteTerms} stateService={stateService} />
          </Route>
          <Route path="/token">
            <TokenControl token={ token } 
                  loginFunction={ loginFunction.bind(null, replaceToken) } 
                  logoutFunction={() => replaceToken(undefined)} />
          </Route>
          <Route path="/">
            <RedirectToSM />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function RedirectToSM(): React.ReactElement {
  return ( <Redirect to="/state" />);
}

