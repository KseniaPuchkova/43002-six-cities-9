import {Route, Routes} from 'react-router-dom';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import Main from '../main/main';
import Favorites from '../favorites/favorites';
import NotFound from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import Room from '../room/room';
import SignIn from '../login/login';
import LoadingScreen from '../loading-screen/loading-screen';
import {useAppSelector} from '../../hooks/hooks';
import {AppRoute, AuthorizationStatus} from '../../const';

const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

function App(): JSX.Element {
  const {authorizationStatus} = useAppSelector(({USER}) => USER);
  const {isDataLoaded} = useAppSelector(({DATA})=> DATA);

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Main />}
        />
        <Route
          path={AppRoute.SignIn}
          element={<SignIn />}
        />
        <Route
          path={AppRoute.Favorites}
          element={<PrivateRoute><Favorites /></PrivateRoute>}
        />
        <Route
          path={AppRoute.Room}
          element={<Room />}
        />
        <Route
          path={AppRoute.NotFound}
          element={<NotFound />}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
