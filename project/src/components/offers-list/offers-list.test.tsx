import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import OffersList from './offers-list';
import {fakeCity, makeFakeOffer, makeFakeOffers} from '../../utils/mocks';
import {AuthorizationStatus, SortType, NameSpace} from '../../const';

const FAKE_OFFER_ID = 1;
const fakeOffer = makeFakeOffer(FAKE_OFFER_ID);
const fakeOffers = makeFakeOffers();

const history = createMemoryHistory();
const mockStore = configureMockStore();
window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe('Component: OffersList', () => {
  it('should render correctly with offers', () => {
    const store = mockStore({
      [NameSpace.App]: {
        activeCity: fakeCity,
        sortType: SortType.POPULAR,
      },
      [NameSpace.Data]: {
        offers: fakeOffers,
        isDataLoaded: true,
        currentOffer: fakeOffer,
        offersNearby: fakeOffers,
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: {},
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OffersList />
        </HistoryRouter>
      </Provider>,
    );
    expect(screen.getByText(/Places/)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${fakeOffers.length} places to stay in ${fakeCity}`, 'i'))).toBeInTheDocument();
  });

  it('should render correctly without offers', () => {
    const store = mockStore({
      [NameSpace.App]: {
        activeCity: fakeCity,
        sortType: SortType.POPULAR,
      },
      [NameSpace.Data]: {
        offers: [],
        isDataLoaded: false,
        currentOffer: null,
        offersNearby:[],
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: {},
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OffersList />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`We could not find any property available at the moment in ${fakeCity}`, 'i'))).toBeInTheDocument();
  });
});

