import { Route } from 'react-router-dom';
import isEmpty from 'ramda/src/isEmpty';
import { readSession } from '../../../utils/common';
import { SessionRedirect } from '../../../common/sessionRedirect';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={() =>
      !isEmpty(readSession()) ? (
        <Component {...rest} />
      ) : (
        <SessionRedirect {...rest} />
      )
    }
  />
);
