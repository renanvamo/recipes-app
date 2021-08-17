import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const user = localStorage.getItem('user');
  const email = user ? JSON.parse(user).email : 'E-mail não encontrado';
  const history = useHistory();

  return (
    <div>
      <Header title="Perfil" />
      <section className="container-buttons">
        <h5 data-testid="profile-email">{ email }</h5>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => { localStorage.clear(); history.push('/'); } }
        >
          Sair
        </button>
      </section>
      <Footer />
    </div>
  );
}
