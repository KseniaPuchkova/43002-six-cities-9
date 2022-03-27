import React, {useState, useEffect, FormEvent, ChangeEvent} from 'react';
import {toast} from 'react-toastify';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {postReviewAction} from '../../store/api-actions';
import {SubmitStatus} from '../../const';

export enum ReviewLength {
  Min = 50,
  Max = 300,
}

const RATINGS = ['perfect', 'good', 'not bad', 'badly', 'terribly'];

const ratings = RATINGS.map((rating, index) => ({
  rating: rating,
  index: RATINGS.length - index,
}));

function ReviewForm(): JSX.Element {
  const {currentOffer, submitStatus} = useAppSelector(({DATA}) => DATA);

  const [review, setReview] = useState({count: 0, comment: ''});
  const {count, comment} = review;

  const dispatch = useAppDispatch();
  const handleReviewSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!currentOffer) {
      return;
    }

    dispatch(postReviewAction({id: currentOffer.id, rating: count, comment}));
  };

  useEffect(() => {
    if (submitStatus === SubmitStatus.Success) {
      setReview({count: 0, comment: ''});
      toast.success('Your review has been sent successfully. Thanks!');
    }

    if (submitStatus === SubmitStatus.Error) {
      toast.error('Your review has not been sent. Please try later');
    }

  }, [submitStatus]);


  const isDisabled = count === 0 || comment.length < ReviewLength.Min || comment.length > ReviewLength.Max;
  const isSending = submitStatus === SubmitStatus.Sending;

  return (
    <form className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleReviewSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratings.map(({rating, index}) => (
          <React.Fragment key={rating}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={index}
              id={`${index}-stars`}
              type="radio"
              onChange={(evt: ChangeEvent<HTMLInputElement>) => setReview({...review, count: Number(evt.target.value)})}
              checked={count === index}
              disabled={isSending}
            />
            <label
              htmlFor={`${index}-stars`}
              className="reviews__rating-label form__rating-label"
              title={rating}
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
        value={comment}
        onChange={(evt: ChangeEvent<HTMLTextAreaElement>) => setReview({...review, comment: evt.target.value})}
        disabled={isSending}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{ReviewLength.Min} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isDisabled || isSending}
        >Submit
        </button>
      </div>
    </form>
  );
}


export default ReviewForm;
