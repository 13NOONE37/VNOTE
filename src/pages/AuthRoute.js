import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import AppContext from 'store/appContext';
import Loading from 'components/other/Loading';

export default function AuthRoute(props) {
  const [loggedIn] = useContext(AppContext);

  if (loggedIn == null)
    return (
      <div style={{ height: '100vh' }}>
        <Loading />
      </div>
    );
  if (loggedIn) return <Route {...props} />;

  return <Redirect to='/authentication' />;
}
