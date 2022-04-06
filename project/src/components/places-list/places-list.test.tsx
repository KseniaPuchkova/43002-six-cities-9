import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import PlacesList from './places-list';
import {makeFakeOffer, makeFakeOffers, fakeUserData} from '../../utils/mocks';
import {AuthorizationStatus, NameSpace} from '../../const';

const FAKE_OFFER_ID = 1;
const fakeOffer = makeFakeOffer(FAKE_OFFER_ID);
const fakeOffers = makeFakeOffers();

const history = createMemoryHistory();
const createMockStore = configureMockStore();
const store = createMockStore({
  [NameSpace.Data]: {
    offers: fakeOffers,
    isDataLoaded: true,
    currentOffer: fakeOffer,
    offersNearby: fakeOffers,
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    userData: fakeUserData,
  },
});

describe('Component: PlacesList', () => {
  const onMouseEnter = jest.fn();
  const onMouseLeave = jest.fn();

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PlacesList offers={fakeOffers} isNearPlacesList={false} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('PlacesList')).toBeInTheDocument();
  });
});
