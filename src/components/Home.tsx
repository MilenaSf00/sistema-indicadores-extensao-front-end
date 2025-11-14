// src/pages/Home.tsx
import React from 'react';
import '../css/Home.css'; 
import logo from '../assets/LogoHome.png'; 


const Home: React.FC = () => {
  return (
    <div className="home-container">
      <img src={logo} alt="Logo" className="home-logo" />

      <div className="home-text">
        <h1 className="home-title">UNIPAMPA</h1>
        <h2 className="home-subtitle">INDICADORES DA EXTENSÃO UNIVERSITÁRIA</h2>
        <h2 className= "home-subsubtitle"> Acompanhe os dados sobre as ações de extensão realizadas na UNIPAMPA</h2>

        <button className="home-button">Acessar Indicadores</button>
      </div>
      {/* Retângulo cinza */}
      <div className="info-box">
        <h3 className="info-title">EXTENSÃO E CULTURA NA UNIPAMPA</h3>
        <p className="info-text">
          A Extensão Universitária, sob o princípio constitucional da indissociabilidade entre ensino, pesquisa e extensão, é um processo interdisciplinar, educativo, cultural, científico e político que promove a interação transformadora entre Universidade e outros setores da sociedade.
        </p>
      </div>
    </div>
  );
};

export default Home;