import React, { useContext, useEffect, useState } from 'react';
import { SearchBarContext } from '../context/SearchBar';
import fetchByFilter from '../services/data';

export default function FoodExplorerByCountry() {
  const [areas, setAreas] = useState([]);
  const [filterOrigin, setFilterOrigin] = useState('');
  const { setDataValues } = useContext(SearchBarContext);

  useEffect(() => {
    const getCategories = async () => {
      const urlToFetch = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
      const { meals } = await fetchByFilter(urlToFetch);
      setAreas(meals);
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getRecipes = async () => {
      const URL_ALL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const URL_FILTER = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${filterOrigin}`;
      const URL_FETCH = filterOrigin ? URL_FILTER : URL_ALL;
      const { meals } = await fetchByFilter(URL_FETCH);
      setDataValues(meals);
    };
    getRecipes();
  }, [filterOrigin]);

  const handleChange = ({ target }) => {
    setFilterOrigin(target.value);
  };

  return (
    <label htmlFor="explore-by-area" className="container-explore-by-area">
      <select
        data-testid="explore-by-area-dropdown"
        id="explore-by-area"
        onChange={ handleChange }
        value={ filterOrigin }
      >
        <option
          data-testid="All-option"
          value=""
        >
          All
        </option>
        { areas && areas.length > 0 && areas.map(({ strArea }) => (
          <option
            data-testid={ `${strArea}-option` }
            key={ strArea }
            value={ strArea }
          >
            { strArea }
          </option>))}
      </select>
    </label>
  );
}
