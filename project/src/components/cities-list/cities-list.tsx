import {MouseEvent, memo} from 'react';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks/index';
import {changeCity} from '../../store/app-process/app-process';

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

function CitiesList(): JSX.Element {
  const dispatch = useAppDispatch();
  const {activeCity} = useAppSelector(({APP}) => APP);

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
    </div>
  );
}

export default memo(CitiesList);
