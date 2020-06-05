import React, { useContext, useState, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Spinner, } from '@blueprintjs/core';
import { FirebaseContext } from './Firebase';
import SpinnerWrapper from './SpinnerWrapper';

export default ({ ...props }) => {
  const firebase = useContext(FirebaseContext);
  const history = useHistory();
  const [isAuth, setIsAuth] = useState(false);
  useEffect(()=>{
    firebase.auth.onAuthStateChanged(function (user) {
      if (!user) {
        history.push('/login');
        return;
      }
      setIsAuth(true);
    });
  }, []);
  
  const Loading = (
    <SpinnerWrapper>
      <Spinner size={100} />
    </SpinnerWrapper>
  );
  if (isAuth === false) return (
    <Route {...props} component={undefined}>
      {Loading}
    </Route>
  )
  return (
    <Route {...props} />
  )
}