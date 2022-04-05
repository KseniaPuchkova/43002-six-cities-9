import {configureMockStore} from '@jedmao/redux-mock-store';
import {render} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import ReviewsList from './reviews-list';
import {makeFakeReviewsByOffer} from '../../utils/mocks';
import {NameSpace} from '../../const';

const fakeReviews = makeFakeReviewsByOffer();

const history = createMemoryHistory();
const createMockStore = configureMockStore();
const store = createMockStore({
  [NameSpace.Data]: {
    reviewsByOffer: fakeReviews,
  },
});

describe('Component: ReviewsList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewsList reviews={fakeReviews} />
        </HistoryRouter>
      </Provider>
    );

    const {container} = render(<ReviewsList reviews={fakeReviews}/>)
    expect(container.firstChild).toHaveClass('reviews__list')
  });
});
