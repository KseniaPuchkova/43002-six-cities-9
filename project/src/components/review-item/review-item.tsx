import dayjs from 'dayjs';
import {Review} from '../../types/review';
import {getRatingInPercent} from '../../utils';

export const MAX_RATING = 5;

type ReviewsProps = {
  review: Review
}

function ReviewItem({review}: ReviewsProps) {
  const {user, rating, date, comment} = review;
  const {avatarUrl, name} = user;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar"
            src={avatarUrl}
            width="54"
            height="54"
            alt={`Reviews ${name}`}
          />
        </div>
        <span className="reviews__user-name">{name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: getRatingInPercent(rating)}}></span>
            <span className="visually-hidden">{rating}</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time
          className="reviews__time"
          dateTime={dayjs(date).format('YYYY-MM-DD')}
        >
          {dayjs(date).format('MMMM YYYY')}
        </time>
      </div>
    </li>
  );
}

export default ReviewItem;
