import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Route, Routes} from 'react-router-dom';
import * as Redux from 'react-redux';
import {Provider} from 'react-redux';
import Room from './room';
import {makeFakeOffer, makeFakeOffers, makeFakeReviewsByOffer} from '../../utils/mocks';
import {AppRoute, AuthorizationStatus, SubmitStatus, NameSpace} from '../../const';

const FAKE_OFFER_ID = 1;
const fakeOffer = makeFakeOffer(FAKE_OFFER_ID);
const fakeOffers = makeFakeOffers();
const fakeReviews = makeFakeReviewsByOffer();

const history = createMemoryHistory();
history.push(`${AppRoute.Offer}${fakeOffers[FAKE_OFFER_ID].id}`);
const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.Data]: {
    offers: fakeOffers,
    isDataLoaded: true,
    currentOffer: fakeOffer,
    offersNearby: fakeOffers,
    reviewsByOffer: fakeReviews ,
    favorites: [],
    submitStatus: SubmitStatus.Unknown,
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    userData: {},
  },
});

describe('Component: Room', () => {
  it('should render correctly', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Room}
              element={<Room />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();

    expect(useDispatch).toBeCalledTimes(103);
  });
});
