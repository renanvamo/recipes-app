import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ButtonShare from '../components/ButtonShare';
import CardDetail from '../components/RecipeInProgress/CardDetail';
import IngredientsList from '../components/RecipeInProgress/IngredientsList';
import Instructions from '../components/RecipeInProgress/Instructions';
import ButtonFinish from '../components/RecipeInProgress/ButtonFinish';
import { InProgressProvider } from '../context/RecipeInProgress';
import ButtonFavorite from '../components/ButtonFavorite';
import fetchByFilter from '../services/data';

export default function RecipeInProgress({ location }) {
  const [recipe, setRecipe] = useState();
  const recipeId = window.location.pathname.split('/')[2];
  const isMeal = (window.location.pathname).includes('comidas');

  const { state } = location;
  console.log(isMeal);

  useEffect(() => state && !recipe && setRecipe(state), [recipe, state]);

  useEffect(() => {
    if (!state) {
      let fetchType = 'thecocktaildb';
      if (isMeal) {
        fetchType = 'themealdb';
      }
      const URL = `https://www.${fetchType}.com/api/json/v1/1/lookup.php?i=${recipeId}`;
      const getRecipe = async () => {
        const response = await fetchByFilter(URL);
        return isMeal ? setRecipe(response.meals[0]) : setRecipe(response.drinks[0]);
      };
      getRecipe();
    }
  }, [isMeal, recipeId, state]);

  const renderDrink = () => {
    const CHARACTERS = -12;
    return (
      <InProgressProvider>
        <section>
          <CardDetail
            thumb={ recipe.strDrinkThumb }
            name={ recipe.strDrink }
            id={ recipe.idDrink }
            category={ recipe.strCategory }
          />
          <p>{recipe.strAlcoholic}</p>
          <ButtonShare
            path={ window.location.href.slice(0, CHARACTERS) }
            testid="share-btn"
          />
          <ButtonFavorite objData={ recipe } />
          <IngredientsList recipe={ recipe } />
          <Instructions Instructions={ recipe.strInstructions } />
          <ButtonFinish recipe={ recipe } />
        </section>
      </InProgressProvider>
    );
  };

  const renderMeal = () => {
    const CHARACTERS = -12;
    return (
      <InProgressProvider>
        <section>
          <CardDetail
            thumb={ recipe.strMealThumb }
            name={ recipe.strMeal }
            id={ recipe.idMeal }
            category={ recipe.strCategory }
          />
          <ButtonShare
            path={ window.location.href.slice(0, CHARACTERS) }
            testid="share-btn"
          />
          <ButtonFavorite objData={ recipe } />
          <IngredientsList recipe={ recipe } />
          <Instructions Instructions={ recipe.strInstructions } />
          <ButtonFinish recipe={ recipe } />
        </section>
      </InProgressProvider>
    );
  };

  if (recipe && isMeal) {
    return renderMeal();
  } if (recipe && !isMeal) {
    return renderDrink();
  }
  return <div>Carregando...</div>;
}

RecipeInProgress.propTypes = {
  location: PropTypes.string,
  state: PropTypes.string,
}.isRequired;
