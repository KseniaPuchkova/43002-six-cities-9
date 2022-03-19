import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppSelector} from '../../hooks';
import {Review }from '../../types/review';
import Main from '../main/main';
import Favorites from '../favorites/favorites';
import NotFound from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import Room from '../room/room';
import SignIn from '../login/login';
import LoadingScreen from '../loading-screen/loading-screen';

type AppProps = {
  reviews: Review[]
};

function App({reviews}: AppProps): JSX.Element {
  const {isDataLoaded} = useAppSelector((state) => state);

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
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
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Room}
          element={<Room reviews={reviews} />}
        />
        <Route
          path={AppRoute.NotFound}
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
