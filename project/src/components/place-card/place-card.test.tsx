import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import PlaceCard from './place-card';
import {fakeCity, makeFakeOffer, makeFakeOffers, fakeCardType} from '../../utils/mocks';
import {AuthorizationStatus, SubmitStatus, SortType} from '../../const';

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
    authorizationStatus: AuthorizationStatus.Auth,
    userData: {},
  },
});

const history = createMemoryHistory();

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
});
