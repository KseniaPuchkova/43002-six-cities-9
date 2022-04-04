import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';
import HistoryRouter from '../history-route/history-route';
import App from './app';
import {fakeCity, makeFakeOffer, makeFakeOffers, fakeUserData} from '../../utils/mocks';
import {AppRoute, AuthorizationStatus, SubmitStatus, SortType} from '../../const';

const FAKE_OFFER_ID = 1;
const fakeOffer = makeFakeOffer(FAKE_OFFER_ID);
const fakeOffers = makeFakeOffers();

const createMockStore = configureMockStore();
let store = createMockStore({
  APP: {
    activeCity: fakeCity,
    sortType: SortType.POPULAR,
  },
  DATA: {
    offers: fakeOffers,
    isDataLoaded: true,
    currentOffer: fakeOffer,
    offersNearby: fakeOffers,
    reviewsByOffer: [],
    favorites: [],
    submitStatus: SubmitStatus.Unknown,
  },
  USER: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    userData: {},
  },
});
let history = createMemoryHistory();
let api = createAPI();
let fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('App routing', () => {
  it('should render "Main" when user navigate to "/"', () => {
    history.push(AppRoute.Main);
    render(fakeApp);

    expect(screen.getByText(/places to stay/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('should render "Login" when user navigate to "/login"', () => {
    history.push(AppRoute.SignIn);
    render(fakeApp);

    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it('should render "Favorites" when route to user authorized navigate to "/favorites"', () => {
    history = createMemoryHistory();

    const createMockStore = configureMockStore([thunk.withExtraArgument(api)]);
    store = createMockStore({
      APP: {
        activeCity: fakeCity,
        sortType: SortType.POPULAR,
      },
      DATA: {
        offers: fakeOffers,
        isDataLoaded: true,
        currentOffer: fakeOffer,
        offersNearby: fakeOffers,
        reviewsByOffer: [],
        favorites: fakeOffers,
        submitStatus: SubmitStatus.Unknown,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: fakeUserData,
      },
    });

    fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>
    );

    history.push(AppRoute.Favorites);
    render(fakeApp);

    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
  });

  it('should render "Room" when user navigate to "/offer/:id"', () => {
    history.push(`${AppRoute.Offer}${fakeOffer.id}`);
    render(fakeApp);

    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });

  it('should render "NotFound" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeApp);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Return to main page')).toBeInTheDocument();
  });
});
