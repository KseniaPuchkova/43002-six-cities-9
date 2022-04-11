import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Routes, Route} from 'react-router-dom';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import PlaceCard from './place-card';
import {makeFakeOffer, makeFakeOffers, fakeCardType} from '../../utils/mocks';
import {AppRoute, AuthorizationStatus, SubmitStatus, SortType, NameSpace} from '../../const';

const FAKE_OFFER_ID = 1;
const fakeOffer = makeFakeOffer(FAKE_OFFER_ID);
const fakeOffers = makeFakeOffers();

const history = createMemoryHistory();
const createMockStore = configureMockStore();
const store = createMockStore({
  [NameSpace.App]: {
    activeCity: fakeOffer.city,
    sortType: SortType.POPULAR,
  },
  [NameSpace.Data]: {
    offers: fakeOffers,
    isDataLoaded: true,
    currentOffer: fakeOffer,
    offersNearby: fakeOffers,
    reviewsByOffer: [],
    favorites: [],
    submitStatus: SubmitStatus.Unknown,
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    userData: {},
  },
});

describe('Component: PlaceCard', () => {
  it('should render "PlaceCard" correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PlaceCard offer={fakeOffer} cardType={fakeCardType}/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/night/i)).toBeInTheDocument();
  });

  it('should navigate to "/room" when user click on image or title', () => {
    global.scrollTo = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Main}
              element={<PlaceCard offer={fakeOffer} cardType={fakeCardType}/>}
            />
            <Route
              path={AppRoute.Room}
              element={<h1>This is room page</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    const [imageLink, titleLink] = screen.getAllByRole('link');
    userEvent.click(imageLink);
    userEvent.click(titleLink);

    expect(screen.getByText(/This is room page/i)).toBeInTheDocument();
  });
});
