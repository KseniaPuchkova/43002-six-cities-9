import {MouseEvent} from 'react';
import className from 'classnames';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {setFavoriteAction} from '../../store/api-actions';
import {redirectToRoute} from '../../store/action';
import {AuthorizationStatus, AppRoute} from '../../const';
import {FavoriteButtonType} from '../../types/favorite-button';
import {Offer} from '../../types/offer';

type FavoritesButtonProps = {
  favoriteButtonType: FavoriteButtonType,
  offer: Offer,
}

function FavoritesButton ({favoriteButtonType, offer}: FavoritesButtonProps): JSX.Element {
  const dispatch = useAppDispatch();

  const {buttonClassName, imgWidth, imgHeight} = favoriteButtonType;

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const handleFavoriteClick = (evt: MouseEvent) => {
    evt.preventDefault();

    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      dispatch(redirectToRoute(AppRoute.SignIn));
      return;
    }

    dispatch(setFavoriteAction({
      id: offer.id,
      flag: Number(!offer.isFavorite),
    }));
  };

  return (
    <button className={className(`${buttonClassName}__bookmark-button`,
      {[`${buttonClassName}__bookmark-button--active`] : offer.isFavorite && authorizationStatus === AuthorizationStatus.Auth},
      'button')}
    type="button"
    onClick={handleFavoriteClick}
    data-testid="button"
    >
      <svg
        className={className(`${buttonClassName}__bookmark-icon`)}
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
