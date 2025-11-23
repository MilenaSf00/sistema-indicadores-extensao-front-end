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
        <p className='copyright'>© 2025 | Indicadores da Extensão </p>
      </div>
    </footer>
  );
};

export default Footer;
