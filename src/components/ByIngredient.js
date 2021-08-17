import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function ByIngredient() {
  const history = useHistory();
  const path = window.location.pathname.split('/')[2];
  return (
    <Button
      variant="dark"
      type="button"
      onClick={ () => history.push(`/explorar/${path}/ingredientes`) }
      data-testid="explore-by-ingredient"
    >
      Por Ingredientes
    </Button>
  );
}

export default ByIngredient;
