import React, { useEffect, useState } from 'react';
import '../assets/css/filters.css';

const Filters = ({ onSearch, onResetFilter }) => {
  const [keyword, setKeyword] = useState('');
  const [source, setSource] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    onSearch({ keyword, source, date });
  }, [keyword, source, date]);

  const handleSearchFilter = (e) => {
    let {name, value} = e.target;
    if (name === 'title') {
      setKeyword(value);
    } else if (name === 'source') {
      setSource(value);
    } else if (name === 'date') {
      setDate(value);
    }
  };

  const handleReset = () => {
    onResetFilter();
    setKeyword('');
    setSource('');
    setDate('');
  };

  return (
    <div className="filters-container">
      <input
        type="text"
        name="title"
        placeholder="Search by title"
        value={keyword}
        onChange={handleSearchFilter}
        className="filter-input"
      />
      <input
        type="text"
        name="source"
        placeholder="Search by source"
        value={source}
        onChange={handleSearchFilter}
        className="filter-input"
      />
      <input
        type="date"
        name="date"
        value={date}
        onChange={handleSearchFilter}
        className="filter-input"
      />
      <button onClick={handleReset} className="reset-button">
        Reset
      </button>
    </div>
  );
};

export default Filters;
