// import 'css/Other/VariableConfig.css';
// import 'css/App.css';

import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import CheckSession from 'utils/CheckSession';
import UpdateUserData from 'utils/UpdateUserData';

import AppContext from 'store/appContext';
import Routes from 'pages/Routes';
import AuthRoute from 'pages/AuthRoute';
import GuestRoute from 'pages/GuestRoute';
import NotFound from 'pages/NotFound';
import SideBar from 'components/main/SideBar';

function App() {
  const [LoggedIn, setLoggedIn] = useState(null);
  const [user, setuser] = useState([]);
  const [notes, setnotes] = useState([]);
  const [notebooks, setnotebooks] = useState([]);
  const [categoriesTable, setcategoriesTable] = useState([]);

  useEffect(() => {
    CheckSession(
      setLoggedIn,
      setuser,
      notes,
      setnotes,
      notebooks,
      setnotebooks,
      categoriesTable,
      setcategoriesTable,
    );
  }, []);

  useEffect(() => {
    UpdateUserData(user, notes, notebooks, categoriesTable);
  }, [notes, notebooks, categoriesTable]);

  return (
    <Router>
      <div className='globalContainer'>
        <AppContext.Provider
          value={[
            LoggedIn,
            user,
            notes,
            setnotes,
            notebooks,
            setnotebooks,
            categoriesTable,
            setcategoriesTable,
          ]}
        >
          {LoggedIn && <SideBar />}
          <Switch>
            {Routes.map((route, index) => {
              if (route.protected == 'guest') {
                return (
                  <GuestRoute
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                    key={index}
                  />
                );
              }

              if (route.protected == 'auth') {
                return (
                  <AuthRoute
                    path={route.path}
                    exact={route.path}
                    component={route.component}
                    key={index}
                  />
                );
              } else {
                <Route
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                  key={index}
                />;
              }
            })}

            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
        </AppContext.Provider>
      </div>
    </Router>
  );
}

export default App;
