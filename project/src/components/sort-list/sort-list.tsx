import {MouseEvent} from 'react';
import {useState} from 'react';
import SortItem from '../sort-item/sort-item';
import {useAppDispatch, useAppSelector} from '../../hooks/index';
import {changeSortType} from '../../store/action';
import {SortType} from '../../const';

function SortList(): JSX.Element {
  const activeSortType = useAppSelector((state) => state.sortType);
  const dispatch = useAppDispatch();

  const [isSortListOpen, setIsSortListOpen] = useState(false);
  const handleSortOnClick = () => setIsSortListOpen(!isSortListOpen);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type"
        tabIndex={0}
        onClick={handleSortOnClick}
      >
        {activeSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isSortListOpen && 'places__options--opened'}`}>
        {Object.values(SortType).map((sortType) => (
          <SortItem
            key={sortType}
            isActive={activeSortType === sortType}
            sortType={sortType}
            onClick={(evt: MouseEvent) => {
              evt.preventDefault();
              setIsSortListOpen(!isSortListOpen);
              dispatch(changeSortType(sortType));
            }}
          />
        ))}
      </ul>
    </form>
  );
}

export default SortList;
