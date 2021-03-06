import { Redirect, Route, useLocation } from 'react-router-dom';
import { getUser } from '../actions/auth';

export default function ProtectedRoute({
  component: Component,
  render,
  ...rest
}) {
  const location = useLocation();
  const user = getUser();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user)
          return (
            <Redirect to={{ pathname: '/login', state: { from: location } }} />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
}
