import React from 'react';
import '../css/Home.css';
import logo from '../assets/LogoHome.png';
import Footer from '../components/Footer';
import LeftInfoGraphs from './LeftInfoGraphs';
import RightInfoGraphs from './RightInfoGraphs';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <img src={logo} alt="Logo" className="home-logo" style={{ zIndex: 2, position: "relative" }} />
      <div className="home-text" style={{ zIndex: 2, position: "relative" }}>
        <h1 className="home-title">UNIPAMPA</h1>
        <h2 className="home-subtitle">INDICADORES DA EXTENSÃO UNIVERSITÁRIA</h2>
        <h2 className="home-subsubtitle">
          Acompanhe os dados sobre as ações de extensão realizadas na UNIPAMPA
        </h2>
        <div className="button-wrapper">
          <button className="home-button">Acessar Indicadores</button>
          <div className="btn-decoration btn-dec-red"></div>
          <div className="btn-decoration btn-dec-yellow"></div>
          <div className="btn-decoration btn-dec-blue"></div>
          <div className="btn-decoration btn-dec-orange"></div>
        </div>
      </div>
      <div className="info-box" style={{ zIndex: 2, position: "relative" }}>
        <div className='left-info-decorators' style={{ zIndex: 3, position: "relative" }}>
          <LeftInfoGraphs />
        </div>
        <div className='right-info-decorators' style={{ zIndex: 3, position: "relative" }}>
          <RightInfoGraphs />
        </div>
        <h3 className="info-title">EXTENSÃO E CULTURA NA UNIPAMPA</h3>
        <p className="info-text">
          A Extensão Universitária, sob o princípio constitucional da indissociabilidade entre ensino, pesquisa e extensão, é um processo interdisciplinar, educativo, cultural, científico e político que promove a interação transformadora entre Universidade e outros setores da sociedade.
        </p>
        <p className="info-reference">
          Plano Nacional de Extensão Universitária, 1999.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
