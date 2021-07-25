import 'css/other/VariableConfig.css';
import 'css/other/app.css';

import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import CheckSession from 'utils/AccountFunctions/CheckSession';
import UpdateUserData from 'utils/AccountFunctions/UpdateUserData';

import AppContext from 'store/appContext';
import Routes from 'pages/Routes';
import AuthRoute from 'pages/AuthRoute';
import GuestRoute from 'pages/GuestRoute';
import NotFound from 'pages/NotFound';
import SideBar from 'components/main/SideBar';
import Loading from './other/Loading';
import FetchUserData from 'utils/AccountFunctions/FetchUserData';

function App() {
  const [LoggedIn, setLoggedIn] = useState(null);
  const [user, setuser] = useState([]);
  const [notes, setnotes] = useState([]);
  const [notebooks, setnotebooks] = useState([]);
  const [categoriesTable, setcategoriesTable] = useState([]);

  useEffect(() => {
    console.log('useeffect z app');
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
    FetchUserData(user, setnotes, setnotebooks, setcategoriesTable);
  }, []);

  useEffect(() => {
    //Dodać te dane do localstorage zamiast do firebase a niżej wysyłac do firebase
    UpdateUserData(user, notes, notebooks, categoriesTable);
  }, [notes, notebooks, categoriesTable]);

  // useEffect(() => {
  //   window.addEventListener('beforeunload', async (e) => {
  //     e.preventDefault();
  //     await UpdateUserData(user, notes, notebooks, categoriesTable);
  //     e.returnValue = 'Masz niezapisane zmiany! Chcesz wyjść?';
  //   });

  //   document.addEventListener('visibilitychange', (e) => {
  //     if (document.visibilityState === 'hidden') {
  //       console.log('visibility change ot hidden');
  //       UpdateUserData(user, notes, notebooks, categoriesTable);
  //     }
  //   });
  // }, []);

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
                  />
                );
              }

              if (route.protected == 'auth') {
                return (
                  <AuthRoute
                    path={route.path}
                    exact={route.path}
                    component={route.component}
                  />
                );
              } else {
                <Route
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
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
