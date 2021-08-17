import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { InProgressContext } from '../../context/RecipeInProgress';

export default function IngredientsList(props) {
  const { recipe } = props;
  const {
    setLocalStorage,
    ingredientsArray,
    setIngredientsArray,
    measurementsArray,
    setMeasurementsArray,
    updateLocalStorage,
    checkSavedItens,
    setFinishButton,
  } = useContext(InProgressContext);

  useEffect(setLocalStorage, [setLocalStorage]);

  useEffect(() => {
    setFinishButton();
  }, [setFinishButton]);

  useEffect(() => {
    const getItems = (searchedKey) => Object.entries(recipe).filter(
      (value) => value[0].includes(searchedKey) && value[1],
    ).map((item) => item[1]);

    if (recipe) {
      const ingredients = getItems('Ingredient');
      const measures = getItems('Measure');
      setIngredientsArray(ingredients);
      setMeasurementsArray(measures);
    }
  }, [recipe, setIngredientsArray, setMeasurementsArray]);

  return (
    <section>
      <h3>Receita</h3>
      { ingredientsArray && ingredientsArray.map((ingredient, index) => (
        <div key={ index } data-testid={ `${index}-ingredient-step` }>
          <label key={ index } htmlFor={ `id${index}` }>
            <input
              checked={ checkSavedItens(ingredient) }
              id={ `id${index}` }
              name="ingredient"
              onClick={ (e) => { updateLocalStorage(e); } }
              key={ index }
              type="checkbox"
              value={ ingredient }
            />
            {`${ingredient} ${
              measurementsArray[index]
                ? ` - ${measurementsArray[index]}`
                : ''
            }`}
          </label>
        </div>
      ))}
    </section>
  );
}

IngredientsList.propTypes = {
  recipe: PropTypes.string,
}.isRequired;
