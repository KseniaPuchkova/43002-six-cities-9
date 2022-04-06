import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import ReviewForm from './review-form';
import {makeFakeReviewsByOffer, fakeUserData} from '../../utils/mocks';
import {AuthorizationStatus, NameSpace} from '../../const';

const fakeReviews = makeFakeReviewsByOffer();

const history = createMemoryHistory();
const createMockStore = configureMockStore();
const store = createMockStore({
  [NameSpace.Data]: {
    reviewsByOffer: fakeReviews,
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    userData: fakeUserData,
  },
});

describe('Component: ReviewsItem', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewForm />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByPlaceholderText(/Tell how was your stay, what you like and what can be improved/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByText(/To submit review please make sure to set/i)).toBeInTheDocument();
  });
});
