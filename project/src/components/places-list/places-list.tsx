import {Offer} from '../../types/offer';
import {CardTypes} from '../../const';
import PlaceCard from '../place-card/place-card';

type PlacesListProps = {
  offers: Offer[],
  isNearPlacesList?: boolean,
  onMouseOver?: (offer: Offer) => void
};

function PlacesList({offers, isNearPlacesList, onMouseOver}: PlacesListProps) {

  return (
    <div className={isNearPlacesList ? 'near-places__list places__list' : 'cities__places-list places__list tabs__content'}>
      {offers.slice().map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          cardType={isNearPlacesList ? CardTypes.ROOM : CardTypes.MAIN}
          onMouseOver={onMouseOver}
        />
      ))}
    </div>
  );
}

export default PlacesList;
