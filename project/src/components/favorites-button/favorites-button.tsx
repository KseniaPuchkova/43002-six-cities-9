import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks/index';
import {loadOffersAction, loadFavoritesAction, setFavoriteAction} from '../../store/api-actions';
import {AppRoute, AuthorizationStatus} from '../../const';
import {FavoriteButton} from '../../types/favorite-button';
import {Offer} from '../../types/offer';

type FavoritesButtonProps = {
  favoriteButton: FavoriteButton,
  offer: Offer,
}

function FavoritesButton ({favoriteButton, offer}: FavoritesButtonProps): JSX.Element {
  const {buttonClassName, imgWidth, imgHeight} = favoriteButton;

  const {authorizationStatus} = useAppSelector((state) => state);

  const [isFavorite, setIsFavorite] = useState(offer?.isFavorite);
  const postFavoriteFlag = isFavorite ? 0 : 1;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFavoriteClick = () => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.SignIn);
    } else {
      dispatch(setFavoriteAction({
        id: offer.id,
        flag: postFavoriteFlag,
      }));

      setIsFavorite(!isFavorite);
      dispatch(loadOffersAction());
      dispatch(loadFavoritesAction());
    }
  };

  return (
    <button
      className={`${buttonClassName}__bookmark-button ${isFavorite && (authorizationStatus === AuthorizationStatus.Auth)
        ? `${buttonClassName}__bookmark-button--active ` : ''}button`}
      type="button"
      onClick={handleFavoriteClick}
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
