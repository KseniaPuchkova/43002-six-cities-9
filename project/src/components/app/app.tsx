import {Route, Routes} from 'react-router-dom';
import Main from '../main/main';
import Favorites from '../favorites/favorites';
import NotFound from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import Room from '../room/room';
import SignIn from '../login/login';
import {AppRoute} from '../../const';

function App(): JSX.Element {
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
