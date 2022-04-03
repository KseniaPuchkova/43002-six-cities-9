import {MouseEvent} from 'react';
import className from 'classnames';

type SortItems = {
  sortType: string,
  isActive: boolean,
  onSortTypeChange: (evt: MouseEvent) => void,
}

function SortItem({sortType, isActive, onSortTypeChange}: SortItems): JSX.Element{
  return (
    <li
      className={className('places__option', {'places__option--active' : isActive})}
      tabIndex={0}
      onClick={onSortTypeChange}
    >
      {sortType}
    </li>
  );
}

export default SortItem;
