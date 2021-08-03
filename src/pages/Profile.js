import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();
  const sectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    width: '180px',
  };
  return (
    <div>
      <Header title="Perfil" search={ false } />
      <section style={ sectionStyle }>
        <h5 data-testid="profile-email">{email}</h5>
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
