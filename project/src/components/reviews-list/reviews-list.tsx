import ReviewItem from '../review-item/review-item';
import {Review} from '../../types/review';

type ReviewsListProps = {
  reviews: Review[]
}

function ReviewsList({reviews}: ReviewsListProps): JSX.Element {

  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          review={review}
        />
      ))}
    </ul>
  );
}

export default ReviewsList;
