import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Offer} from '../../types/offer';
import {useAppDispatch, useAppSelector} from '../../hooks/index';
import {setIsFavoriteAction} from '../../store/api-actions';
import {AuthorizationStatus, AppRoute} from '../../const';

type FavoritesButtonProps = {
buttonType: {
    buttonClassName: string,
    imgWidth: string,
    imgHeight: string,
  },
  currentOffer: Offer | null,
  offerId: number,
}

function FavoritesButton ({buttonType, currentOffer, offerId}: FavoritesButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {authorizationStatus} = useAppSelector((state) => state);

  const {buttonClassName, imgWidth, imgHeight} = buttonType;

  const [isFavorite, setIsFavorite] = useState(currentOffer?.isFavorite);

  const handleToFavorite = () => {
    if (!offerId) {
      return;
    }
    dispatch(setIsFavoriteAction({isFavorite: !isFavorite, offerId}));

    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.SignIn);
      return;
    }

    setIsFavorite(!isFavorite);
  };

  return (
    <button
      className={`${buttonClassName}__bookmark-button ${isFavorite
        && (authorizationStatus === AuthorizationStatus.Auth)
        && `${buttonClassName}__bookmark-button--active`} button`}
      type="button"
      onClick={handleToFavorite}
    >
      <svg
        className={`${buttonClassName}__bookmark-icon`}
        width={imgWidth}
        height={imgHeight}
      >
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default FavoritesButton;
