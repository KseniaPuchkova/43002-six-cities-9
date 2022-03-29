import {MouseEvent} from 'react';

type SortItems = {
  sortType: string,
  isActive: boolean,
  onSortTypeChange: (evt: MouseEvent) => void,
}

function SortItem({sortType, isActive, onSortTypeChange}: SortItems): JSX.Element{

  return (
    <li
      className={`places__option ${isActive && 'places__option--active'}`}
      tabIndex={0}
      onClick={onSortTypeChange}
    >
      {sortType}
    </li>
  );
}

export default SortItem;
