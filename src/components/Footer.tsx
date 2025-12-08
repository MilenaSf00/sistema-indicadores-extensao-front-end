import React from 'react';
import '../css/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="dashboard-footer">
      <div>
        <h4 className="footer-title">EQUIPE:</h4>
        <p className="footer-content">Milena Soares Ferreira - Estudante do curso de Eng. Software | milenasf.aluno@unipampa.edu.br</p>
        <p className="footer-content">Kauã Jardim Dias - Estudante do curso Ciência da Computação | kauadias.aluno@unipampa.edu.br </p>
        <p className="footer-content">Aline Vieira de Mello - Docente | alinemello@unipampa.edu.br </p>
        <p className='copyright'>2025 | Indicadores da Extensão </p>
        <div className="footer-license">
          <a
            rel="license"
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
            target="_blank"
            title="Licença Creative Commons BY-NC-SA 4.0"
          >
            <span className="license-text">Creative Commons</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
