import { Route } from 'react-router-dom';

export const MainRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={() => <Component {...rest} />} />
);
