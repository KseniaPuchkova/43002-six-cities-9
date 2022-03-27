import {MouseEvent, memo} from 'react';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks/index';
import {changeCity} from '../../store/action';

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

function CityList(): JSX.Element {
  const {activeCity} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {CITIES.map((city) => (
          <li
            className="locations__item"
            key={city}
          >
            <Link
              to={city}
              className={`locations__item-link tabs__item${activeCity === city ? ' tabs__item--active':''}`}
              onClick={(evt: MouseEvent) => {
                evt.preventDefault();
                dispatch(changeCity(city));
              }}
            >
              <span>{city}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default memo(CityList);
