import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks/index';
import {setFavoriteAction} from '../../store/api-actions';
import {AppRoute, AuthorizationStatus} from '../../const';
import {FavoriteButtonType} from '../../types/favorite-button';
import {Offer} from '../../types/offer';

type FavoritesButtonProps = {
  favoriteButtonType: FavoriteButtonType,
  offer: Offer,
}

function FavoritesButton ({favoriteButtonType, offer}: FavoritesButtonProps): JSX.Element {
  const {buttonClassName, imgWidth, imgHeight} = favoriteButtonType;

  const {authorizationStatus} = useAppSelector((state) => state);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleFavoriteClick = () => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      return navigate(AppRoute.SignIn);
    } else {
      dispatch(setFavoriteAction({
        id: offer.id,
        flag: Number(!offer.isFavorite),
      }));
    }
  };

  return (
    <button
      className={`${buttonClassName}__bookmark-button ${offer.isFavorite && (authorizationStatus === AuthorizationStatus.Auth)
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
      <span className="visually-hidden">{offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default FavoritesButton;
