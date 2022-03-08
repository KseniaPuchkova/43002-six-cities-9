import {Link} from 'react-router-dom';

const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

function CityList(): JSX.Element {
  const activeCity = CITIES[3];

  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => (
        <li
          className="locations__item"
          key={city}
        >
          <Link
            to={city}
            className={`locations__item-link tabs__item ${activeCity === city && ('tabs__item--active')}`}
          >
            <span>{city}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default CityList;
