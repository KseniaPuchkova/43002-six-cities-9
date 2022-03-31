import {MouseEvent, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import className from 'classnames';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {setFavoriteAction} from '../../store/api-actions';
import {AppRoute, AuthorizationStatus} from '../../const';
import {FavoriteButtonType} from '../../types/favorite-button';
import {Offer} from '../../types/offer';

type FavoritesButtonProps = {
  favoriteButtonType: FavoriteButtonType,
  offer: Offer,
}

function FavoritesButton ({favoriteButtonType, offer}: FavoritesButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {buttonClassName, imgWidth, imgHeight} = favoriteButtonType;

  const {authorizationStatus} = useAppSelector(({USER}) => USER);

  const [isFavorite, setFavorite] = useState(offer.isFavorite);


  const handleFavoriteClick = (evt: MouseEvent) => {
    evt.preventDefault();

    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      return navigate(AppRoute.SignIn);
    } else {
      dispatch(setFavoriteAction({
        id: offer.id,
        flag: Number(!offer.isFavorite),
      }));

      setFavorite(!isFavorite);
    }
  };

  return (
    <button className={className(`${buttonClassName}__bookmark-button`,
      {[`${buttonClassName}__bookmark-button--active`] : (offer.isFavorite || isFavorite) && (authorizationStatus === AuthorizationStatus.Auth)},
      'button')}
    type="button"
    onClick={handleFavoriteClick}
    >
      <svg
        className={className(`${buttonClassName}__bookmark-icon`)}
        width={imgWidth}
        height={imgHeight}
      >
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">{(offer.isFavorite || isFavorite) ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default FavoritesButton;
