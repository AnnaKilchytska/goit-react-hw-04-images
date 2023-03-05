import PropTypes from 'prop-types';

import { useState } from 'react';

function Searchform({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleInput = e => {
    setValue(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (value.trim() === '') {
      alert('Please enter a value');
      return;
    }

    onSubmit(value);
    setValue('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          value={value}
          onChange={handleInput}
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchform.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchform;
