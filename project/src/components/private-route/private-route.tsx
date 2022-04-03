import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks/hooks';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {AppRoute, AuthorizationStatus} from '../../const';

type PrivateRouteProps =  {
  children: JSX.Element | null
};

function PrivateRoute({children}: PrivateRouteProps) {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? <div>{children}</div>
      : <Navigate to={AppRoute.SignIn} />
  );
}

export default PrivateRoute;
