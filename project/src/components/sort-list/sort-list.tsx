import {MouseEvent, memo} from 'react';
import {useState} from 'react';
import className from 'classnames';
import SortItem from '../sort-item/sort-item';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {changeSortType} from '../../store/app-process/app-process';
import {SortType} from '../../const';

function SortList(): JSX.Element {
  const dispatch = useAppDispatch();

  const {sortType: activeSortType} = useAppSelector(({APP}) => APP);

  const [isSortListOpen, setIsSortListOpen] = useState(false);
  const handleSortOnClick = () => setIsSortListOpen(!isSortListOpen);

  const onSortTypeChange = (evt: MouseEvent, sortType: string) => {
    evt.preventDefault();
    setIsSortListOpen(!isSortListOpen);
    dispatch(changeSortType(sortType));
  };

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
      <ul className={className('places__options places__options--custom', {'places__options--opened' : isSortListOpen})}></ul>
      <ul className={`places__options places__options--custom ${isSortListOpen ? 'places__options--opened' : ''}`}>
        {Object.values(SortType).map((sortType) => (
          <SortItem
            key={sortType}
            isActive={activeSortType === sortType}
            sortType={sortType}
            onSortTypeChange={(evt) => onSortTypeChange(evt, sortType)}
          />
        ))}
      </ul>
    </form>
  );
}

export default memo(SortList);
