import {memo} from 'react';
import className from 'classnames';
import PlaceCard from '../place-card/place-card';
import {CardType} from '../../const';
import {Offer} from '../../types/offer';

type PlacesListProps = {
  offers: Offer[],
  isNearPlacesList?: boolean,
  onMouseEnter?: (offer: Offer) => void
  onMouseLeave?: () => void
};

function PlacesList({offers, isNearPlacesList, onMouseEnter, onMouseLeave}: PlacesListProps) {

  return (
    <div className={className(
      {'cities__places-list places__list tabs__content' : !isNearPlacesList},
      {'near-places__list places__list' : isNearPlacesList})}
    data-testid="PlacesList"
    >
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          cardType={isNearPlacesList ? CardType.ROOM : CardType.MAIN}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      ))}
    </div>
  );
}

export default memo(PlacesList, (prevProps, nextProps) => prevProps.offers === nextProps.offers);
