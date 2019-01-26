import React from 'react';
import './ItemStatusFilter.css';

const ItemStatusFilter = ({state,onFilterChange}) => {
  const btns = [
    {name:'all',label:'All'},
    {name:'active',label:'Active'},
    {name:'done',label:'Done'}
  ]
  const buttons = btns.map(({name,label}) => {
    const isActive = state === name;
    const classs = isActive ? 'btn-info' : 'btn-outline-secondary' 
    return (
      <button 
        key={name}
        onClick={() => onFilterChange(name)}
        type="button"
        className={`btn ${classs}`}>{label}
      </button>
    )
  })
  return (
    <div className="btn-group">
      {buttons}
    </div>
  );
};

export default ItemStatusFilter;