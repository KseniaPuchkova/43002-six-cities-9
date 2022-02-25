import {PropsWithChildren} from 'react';
import {Navigate, RouteProps} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';

type PrivateRouteProps = PropsWithChildren<RouteProps & {
  authorizationStatus: AuthorizationStatus
}>

function PrivateRoute(props: PrivateRouteProps) {
  const {children, authorizationStatus} = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? <div>{children}</div>
      : <Navigate to={AppRoute.SignIn} />
  );
}

export default PrivateRoute;
