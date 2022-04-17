import {MouseEvent, memo} from 'react';
import {useState} from 'react';
import className from 'classnames';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {getSortType} from '../../store/app-process/selectors';
import {changeSortType} from '../../store/app-process/app-process';
import {SortType} from '../../const';

function SortList(): JSX.Element {
  const dispatch = useAppDispatch();

  const activeSortType = useAppSelector(getSortType);

  const [isSortListOpen, setIsSortListOpen] = useState(false);
  const handleSortOnClick = () => setIsSortListOpen(!isSortListOpen);

  const onSortTypeChange = (evt: MouseEvent, sortType: string) => {
    evt.preventDefault();

    dispatch(changeSortType(sortType));
    setIsSortListOpen(!isSortListOpen);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        onClick={handleSortOnClick}
        data-testid="SortType"
      >
        {activeSortType}
        <svg
          className="places__sorting-arrow"
          width="7"
          height="4"
          style={isSortListOpen ? {transform: 'rotate(180deg) translateY(50%)'} : {}}
        >
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      {isSortListOpen && (
        <ul className='places__options places__options--custom places__options--opened'>
          {Object.values(SortType).map((sortType) => (
            <li
              key={sortType}
              className={className('places__option', {'places__option--active' : activeSortType === sortType})}
              tabIndex={0}
              onClick={(evt) => onSortTypeChange(evt, sortType)}
              data-testid={sortType}
            >
              {sortType}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

export default memo(SortList);
