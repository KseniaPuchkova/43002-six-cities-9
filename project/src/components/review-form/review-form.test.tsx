import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import ReviewForm from './review-form';
import {makeFakeReviewsByOffer, fakeUserData} from '../../utils/mocks';
import {AuthorizationStatus, NameSpace} from '../../const';

const fakeReviews = makeFakeReviewsByOffer();

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: ReviewsItem', () => {
  it('should render correctly', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        reviewsByOffer: fakeReviews,
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: fakeUserData,
      },
    });

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

    const [fiveStars, fourStars, threeStars, twoStars, oneStar] = screen.getAllByRole('radio');

    expect(oneStar).not.toBeChecked();
    expect(twoStars).not.toBeChecked();
    expect(threeStars).not.toBeChecked();
    expect(fourStars).not.toBeChecked();
    expect(fiveStars).not.toBeChecked();

    userEvent.click(fiveStars);
    expect(fiveStars).toBeChecked();
    expect(oneStar).not.toBeChecked();
    expect(twoStars).not.toBeChecked();
    expect(threeStars).not.toBeChecked();
    expect(fourStars).not.toBeChecked();

    userEvent.type(screen.getByTestId('comment'), 'Comment');
    expect(screen.getByDisplayValue('Comment')).toBeInTheDocument();

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
  });
});
