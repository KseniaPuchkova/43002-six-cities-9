import {MouseEvent} from 'react';
import {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/index';
import {SortType} from '../../const';
import {changeSortType} from '../../store/action';

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
      <ul className={`places__options places__options--custom${isSortListOpen ? ' places__options--opened':''}`}>
        {Object.values(SortType).map((sortType) => (
          <li
            className={`places__option${activeSortType === sortType ? ' places__option--active':''}`}
            tabIndex={0}
            key={sortType}
            onClick={(evt: MouseEvent) => {
              evt.preventDefault();
              setIsSortListOpen(!isSortListOpen);
              dispatch(changeSortType(sortType));
            }}
          >
            {sortType}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortList;
