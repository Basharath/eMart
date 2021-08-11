import { Redirect, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({
  component: Component,
  render,
  ...rest
}) {
  const location = useLocation();
  const { userData: user } = useSelector((state) => state.auth);

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
