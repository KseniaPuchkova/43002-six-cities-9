import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import ReviewItem from './review-item';
import {makeFakeReviewByOffer, makeFakeReviewsByOffer} from '../../utils/mocks';
import {NameSpace} from '../../const';

const FAKE_REVIEW_ID = 1;
const fakeReview = makeFakeReviewByOffer(FAKE_REVIEW_ID);
const fakeReviews = makeFakeReviewsByOffer();

const history = createMemoryHistory();
const createMockStore = configureMockStore();
const store = createMockStore({
  [NameSpace.Data]: {
    reviewsByOffer: fakeReviews,
  },
});

describe('Component: ReviewsItem', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewItem review={fakeReview} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(fakeReview.user.name)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.comment)).toBeInTheDocument();
  });
});
