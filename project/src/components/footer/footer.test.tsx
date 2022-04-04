import {render, screen} from '@testing-library/react';
import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../history-route/history-route';
import Footer from './footer';
import {AppRoute} from '../../const';

const history = createMemoryHistory();

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Footer />
      </HistoryRouter>);

    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should redirect to main page', () => {
    history.push('/non-existent-route');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<h1>Main page</h1>}
          />
          <Route
            path={AppRoute.NotFound}
            element={<Footer />}
          />
        </Routes>
      </HistoryRouter>);


    userEvent.click(screen.getByRole('link'));
    expect(screen.getByText(/Main page/i)).toBeInTheDocument();
  });
});
