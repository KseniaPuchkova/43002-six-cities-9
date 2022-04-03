import {Route, Routes} from 'react-router-dom';
import Main, {isCheckedAuth} from '../main/main';
import LoadingScreen from '../loading-screen/loading-screen';
import Favorites from '../favorites/favorites';
import NotFound from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import Room from '../room/room';
import SignIn from '../login/login';
import {useAppSelector} from '../../hooks/hooks';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {isDataLoadedStatus} from '../../store/data-process/selectors';
import {AppRoute} from '../../const';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isDataLoaded = useAppSelector(isDataLoadedStatus);

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }
  return (
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
  );
}

export default App;
