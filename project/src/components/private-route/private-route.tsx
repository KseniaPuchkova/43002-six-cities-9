import {ReactNode} from 'react';
import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppSelector} from '../../hooks/index';

type PrivateRouteProps =  {
  children: ReactNode | undefined
};

function PrivateRoute(props: PrivateRouteProps) {
  const {children} = props;
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? <div>{children}</div>
      : <Navigate to={AppRoute.SignIn} />
  );
}

export default PrivateRoute;
