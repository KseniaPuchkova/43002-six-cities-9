import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks/index';
import {AppRoute, AuthorizationStatus} from '../../const';

type PrivateRouteProps =  {
  children: JSX.Element | null
};

function PrivateRoute({children}: PrivateRouteProps) {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? <div>{children}</div>
      : <Navigate to={AppRoute.SignIn} />
  );
}

export default PrivateRoute;
