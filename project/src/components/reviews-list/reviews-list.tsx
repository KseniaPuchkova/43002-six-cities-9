import ReviewItem from '../review-item/review-item';
import {Review} from '../../types/review';

const MAX_REVIEWS_COUNT = 10;

type ReviewsListProps = {
  reviews: Review[]
}

function ReviewsList({reviews}: ReviewsListProps): JSX.Element {

  const reviewsByDateAndCount = reviews
    .slice()
    .sort((a: Review, b: Review) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .slice(0, MAX_REVIEWS_COUNT);

  return (
    <ul className="reviews__list" data-testid="ReviewsList">
      {reviewsByDateAndCount.map((review) => (
        <ReviewItem
          key={review.id}
          review={review}
        />
      ))}
    </ul>
  );
}

export default ReviewsList;
