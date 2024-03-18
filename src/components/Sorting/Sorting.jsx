import React from 'react';
import { ReactComponent as SortIcon } from '../../assets/icons/sort-24px.svg';
import "./Sorting.scss";

const Sorting = ({ onAscClick, onDescClick }) => {
  return (
    <div className="sorting">
      <div className="sorting-click" onClick={onAscClick} style={{ top: '0', left: '0' }}></div>
      <div className="sorting-click" onClick={onDescClick} style={{ bottom: '0', left: '0' }}></div>
      <SortIcon />
    </div>
  );
};

export default Sorting;