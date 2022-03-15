import {MouseEvent} from 'react';

type SortItems = {
  sortType: string,
  isActive: boolean,
  onClick: (evt: MouseEvent) => void,
}

function SortItem({sortType, isActive, onClick}: SortItems): JSX.Element{

  return (
    <li
      className={`places__option ${isActive && 'places__option--active'}`}
      tabIndex={0}
      onClick={onClick}
    >
      {sortType}
    </li>
  );
}

export default SortItem;
