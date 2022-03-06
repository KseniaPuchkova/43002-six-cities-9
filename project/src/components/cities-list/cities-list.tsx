import {CITIES} from '../../const';

function CityList(): JSX.Element {
  const activeCity = CITIES[3];

  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => (
        <li
          className="locations__item"
          key={city}
        >
          <a
            href={city}
            className={`locations__item-link tabs__item ${activeCity === city && ('tabs__item--active')}`}
          >
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default CityList;
