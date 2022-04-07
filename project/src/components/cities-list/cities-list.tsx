import {MouseEvent} from 'react';
import {Link} from 'react-router-dom';
import className from 'classnames';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {getActiveCity} from '../../store/app-process/selectors';
import {changeCity} from '../../store/app-process/app-process';
import {CITIES} from '../../const';

function CitiesList(): JSX.Element {
  const dispatch = useAppDispatch();

  const activeCity = useAppSelector(getActiveCity);

  const handleChangeCityClick = (evt: MouseEvent, city: string) => {
    evt.preventDefault();

    dispatch(changeCity(city));
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city) => (
            <li
              className="locations__item"
              key={city}
            >
              <Link
                to={city}
                className={className('locations__item-link tabs__item', {'tabs__item--active' : activeCity === city})}
                onClick={(evt) => handleChangeCityClick(evt, city)}
              >
                <span>{city}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default CitiesList;
