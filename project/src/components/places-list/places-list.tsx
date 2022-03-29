import {memo} from 'react';
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
    <div className={isNearPlacesList ? 'near-places__list places__list' : 'cities__places-list places__list tabs__content'}>
      {offers.slice().map((offer) => (
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
