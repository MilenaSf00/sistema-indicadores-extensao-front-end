import React, { useState, useEffect } from "react";
import { useSpeech } from "react-text-to-speech";
import Footer from "../components/Footer";
import "../css/Sobre.css";
import logoSobre from "../assets/LogoHomePagSobre.png";
import foto1 from "../assets/foto1.png";
import foto2 from "../assets/foto2.png";
import foto3 from "../assets/foto3.png";

const Sobre: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);


  const teamMembers = [
    {
      name: "Milena Soares Ferreira",
      role: "Desenvolvedora",
      desc1: "Discente de Engenharia de Software",
      desc2: "Bolsista de Gestão PROEC",
      image: foto1
    },
    {
      name: "Kauã Jardim Dias",
      role: "Desenvolvedor",
      desc1: "Discente de Ciência da Computação",
      desc2: "Bolsista de Gestão PROEC",
      image: foto2
    },
    {
      name: "Aline de Mello",
      role: "Orientadora",
      desc1: "Docente",
      desc2: "Orientadora do Projeto",
      image: foto3
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % teamMembers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [teamMembers.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % teamMembers.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  const textToRead = "Sobre o sistema. O sistema foi desenvolvido para possibilitar o acesso aos dados da extensão universitária de forma facilitada e livre. Objetivo. Apoiar tomada de decisões e ampliar a visibilidade das atividades de extensão através da facilitação do acesso e análise desses dados por meio de gráficos e tabelas geradas de maneira automatizada. Desenvolvimento. O sistema foi idealizado e implementado por Milena Ferreira e Kauã Dias, sob a tutoria da docente Aline de Mello.";

  const { speechStatus, start, stop } = useSpeech({ text: textToRead, lang: "pt-BR" });

  return (
    <div className="sobre-wrapper">
      <div className="sobre-header-container">
        <div className="sobre-header-bg">
          <svg width="100%" height="100%" viewBox="0 0 1440 300" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M180 0 V 100 Q 180 150 130 150 H 100 Q 80 150 80 130 Q 80 110 100 110 H 130 Q 150 110 150 80 V 0" fill="#E74B23" transform="translate(-50, 20)" />
            <path d="M1260 0 V 120 Q 1260 180 1200 180 H 1150 Q 1120 180 1120 150 Q 1120 120 1150 120 H 1200 Q 1230 120 1230 90 V 0" fill="#FFC107" transform="translate(50, 0)" />
            <path d="M0 250 Q 50 250 80 280 L 150 300 H 0 V 250" fill="#155BD8" transform="translate(0, 20)" />
            <path d="M1440 280 Q 1400 280 1380 300 H 1440 V 280" fill="#2E3192" />
          </svg>
        </div>
        <div className="sobre-header-box">
          <h1 className="sobre-title">SOBRE O SISTEMA</h1>
          <div className="corner-dec-top-right">
            <div className="bar-blue-tr"></div>
            <div className="bar-yellow-tr"></div>
            <div className="bar-red-tr"></div>
          </div>
          <div className="corner-dec-bottom-left">
            <div className="bar-red-bl"></div>
            <div className="bar-yellow-bl"></div>
            <div className="bar-blue-bl"></div>
          </div>
        </div>
        <p className="sobre-subtitle">
          Saiba mais sobre o desenvolvimento e a equipe que construiu essa ferramenta
        </p>
      </div>
      <div className="sobre-main-content">
        <div className="sobre-image-container">
          <img src={logoSobre} alt="Sobre o Sistema Illustration" className="sobre-illustration" />
        </div>
        <div className="sobre-text-content">
          <div className="tts-container">
            <button
              className={`tts-button ${speechStatus === "started" ? "active" : ""}`}
              onClick={speechStatus === "started" ? stop : start}
              aria-label={speechStatus === "started" ? "Parar leitura do texto" : "Ouvir o texto sobre o sistema"}
              title={speechStatus === "started" ? "Parar leitura" : "Ouvir texto"}
            >
              {speechStatus === "started" ? (
                <>
                  <span aria-hidden="true">🔇</span> Parar Leitura
                </>
              ) : (
                <>
                  <span aria-hidden="true">🔊</span> Ouvir Texto
                </>
              )}
            </button>
          </div>
          <div className="text-block">
            <h3 className="text-title">Sobre o sistema</h3>
            <p className="text-body">
              O sistema foi desenvolvido para possibilitar o acesso aos dados da extensão universitária de forma facilitada e livre.
            </p>
          </div>
          <div className="text-block">
            <h3 className="text-title">Objetivo</h3>
            <p className="text-body">
              Apoiar tomada de decisões e ampliar a visibilidade das atividades de extensão através da facilitação do acesso e análise desses dados por meio de gráficos e tabelas geradas de maneira automatizada.
            </p>
          </div>
          <div className="text-block development-block">
            <div className="dev-text">
              <h3 className="text-title">Desenvolvimento</h3>
              <p className="text-body">
                O sistema foi idealizado e implementado por Milena Ferreira e Kauã Dias, sob a tutoria da docente Aline de Mello.
              </p>
            </div>
            <div className="dev-chart-placeholder">
              <div className="pie-chart"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="sobre-team-section">
        <h2 className="team-section-title">Conheça a Nossa Equipe</h2>

        <div className="carousel-container">
          <button className="carousel-btn prev-btn" onClick={prevSlide}>&#10094;</button>

          <div className="carousel-slide">
            <div className="team-card">
              <div
                className="team-avatar"
                style={{ backgroundImage: `url(${teamMembers[currentSlide].image})` }}
                title={`${teamMembers[currentSlide].name} - ${teamMembers[currentSlide].role}`}
                role="img"
                aria-label={`Foto de ${teamMembers[currentSlide].name}, ${teamMembers[currentSlide].role}`}
              ></div>
              <h3 className="team-name">{teamMembers[currentSlide].name}</h3>
              <p className="team-role">{teamMembers[currentSlide].role}</p>
              <p className="team-desc">{teamMembers[currentSlide].desc1}</p>
              <p className="team-desc">{teamMembers[currentSlide].desc2}</p>
            </div>
          </div>
          <button className="carousel-btn next-btn" onClick={nextSlide}>&#10095;</button>
        </div>
        <div className="team-dots">
          {teamMembers.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Sobre;
