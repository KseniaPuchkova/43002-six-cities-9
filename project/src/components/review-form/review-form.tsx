import React, {useState,  FormEvent, ChangeEvent} from 'react';

const MIN_CHARS_COUNT = 50;
const MAX_CHARS_COUNT = 300;

const RATINGS = ['perfect', 'good', 'not bad', 'badly', 'terribly'];
const ratings = RATINGS.map((key, value) => ({
  key: key,
  value: RATINGS.length - value,
}));

function ReviewForm(): JSX.Element {
  const [comment, setComment] = useState({rating: 0, review: ''});
  const {rating, review} = comment;

  const isDisabled = rating === null || review.length < MIN_CHARS_COUNT || review.length > MAX_CHARS_COUNT;

  return (
    <form className="reviews__form form"
      action="#"
      method="post"
      onSubmit={(evt: FormEvent<HTMLFormElement>) => evt.preventDefault()}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratings.map(({key, value}) => (
          <React.Fragment key={key}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              onChange={(evt: ChangeEvent<HTMLInputElement>) => setComment({...comment, rating: parseInt(evt.target.value, 10)})}
              checked={rating === value}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={key}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review}
        onChange={(evt: ChangeEvent<HTMLTextAreaElement>) => setComment({...comment, review: evt.target.value})}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{MIN_CHARS_COUNT} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isDisabled}
        >Submit
        </button>
      </div>
    </form>
  );
}


export default ReviewForm;
