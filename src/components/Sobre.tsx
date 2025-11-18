import React from "react";
import Footer from "../components/Footer";
import "../css/Sobre.css";
import logo from "../assets/LogoHome.png";

const Sobre: React.FC = () => {
  return (
    <>
      <div className="sobre-container">
        

        <div className="sobre-box">
          
          <div className="sobre-inner-box">
            SOBRE O SISTEMA
          </div>

          <p className="sobre-description">
            Saiba mais sobre o desenvolvimento e a equipe que construiu essa ferramenta
          </p>

        </div>

     
        <div className="sobre-content-row">

    
          <div className="sobre-left">
            <img src={logo} alt="Logo" className="sobre-logo" />
          </div>

         
          <div className="sobre-right">
            <h3 className="sobre-section-title">Objetivo</h3>
            <p className="sobre-paragraph">
              Apoiar a tomada de decisões e ampliar a visibilidade das atividades de extensão
              através da análise facilitada dos dados usando gráficos e tabelas automatizadas.
            </p>
          </div>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default Sobre;
