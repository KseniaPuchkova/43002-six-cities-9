import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import Map from './map';
import {makeFakeOffer, makeFakeOffers} from '../../utils/mocks';
import {AuthorizationStatus, SubmitStatus, SortType, NameSpace} from '../../const';

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
    authorizationStatus: AuthorizationStatus.NoAuth,
    userData: {},
  },
});

describe('Component: Map', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Map activeCity={fakeOffer.city} offersByCity={fakeOffers} hoveredOffer={fakeOffer}/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('Map')).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(fakeOffers.length);
  });

  it('should render correctly when user hovered offer', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Map activeCity={fakeOffer.city} offersByCity={fakeOffers} hoveredOffer={fakeOffers[0]}/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByAltText('hovered')).toBeInTheDocument();
  });
});
