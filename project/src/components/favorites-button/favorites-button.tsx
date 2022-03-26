import {MouseEvent} from 'react';
import {useAppSelector} from '../../hooks/index';
import {AuthorizationStatus} from '../../const';

type FavoritesButtonProps = {
buttonType: {
    buttonClassName: string,
    imgWidth: string,
    imgHeight: string,
  },
  isFavorite: boolean;
  handleFavoriteClick: (evt: MouseEvent<HTMLButtonElement>) => void,
}

function FavoritesButton ({buttonType, isFavorite, handleFavoriteClick}: FavoritesButtonProps): JSX.Element {
  const {buttonClassName, imgWidth, imgHeight} = buttonType;

  const {authorizationStatus} = useAppSelector((state) => state);

  return (
    <button
      className={`${buttonClassName}__bookmark-button ${isFavorite && (authorizationStatus === AuthorizationStatus.Auth)
        ? `${buttonClassName}__bookmark-button--active` : ''} button`}
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
