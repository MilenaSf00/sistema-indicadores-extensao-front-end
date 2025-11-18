import React from 'react';
import '../css/Dashboard.css';
import FilterSidebar from '../components/filter';
import Footer from '../components/Footer';

const Dashboard: React.FC = () => {
  const barData = [
    { name: 'Alegrete', value: 39 },
    { name: 'Bagé', value: 91 },
    { name: 'Santana do Livramento', value: 38 },
    { name: 'São Gabriel', value: 30 },
    { name: 'São Borja', value: 46 },
    { name: 'Itaqui', value: 51 },
    { name: 'Uruguaiana', value: 135 },
    { name: 'Dom Pedrito', value: 66 },
    { name: 'Caçapava do Sul', value: 27 },
    { name: 'Jaguarão', value: 35 },
  ];

  return (
    <div className="dashboard-container">


      <div className="dashboard-box">
        <div className="dashboard-inner-box">
          INDICADORES DA EXTENSÃO UNIVERSITÁRIA
        </div>
        <p className="dashboard-description">
          Acompanhe os dados sobre as ações de extensão realizadas na UNIPAMPA
        </p>
      </div>

      <button className="download-pdf">Download PDF</button>

    
      <FilterSidebar />

    
      <div className="bar-chart-container">
     
        <div className="bar-chart-legend">
          
        </div>

  
        <div className="bar-chart-content">
          {barData.map((item, index) => (
            <div className="bar-item" key={index}>
              <span style={{width: '180px'}}>{item.name}</span>
              <div className="bar-fill" style={{width: `${item.value * 2}px`}}></div>
              <span style={{marginLeft: '10px'}}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="cards-container">
        {[
          { number: 0, title: 'N° de Ações de Extensão em Execução' },
          { number: 0, title: 'N° de Ações de Extensão Executadas' },
          { number: 0, title: 'N° de Eventos Acadêmicos' }
        ].map((card, index) => (
          <div className="card" key={index}>
            <div className="card-border">
              <div className="card-blue">
                <div className="card-number">{card.number}</div>
                <div className="card-title">{card.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

   
      <div className="pie-chart-container">
        <h3 className="pie-chart-title">
          Número de pessoas envolvidas nos projetos de extensão executados (Equipe executora)
        </h3>

        <div className="pie-chart-content">
        
          <div className="pie-chart-legend">
            <div className="legend-item">
              <span className="legend-color discente"></span> Discentes
            </div>
            <div className="legend-item">
              <span className="legend-color docentes"></span> Docentes
            </div>
            <div className="legend-item">
              <span className="legend-color taes"></span> TAEs
            </div>
            <div className="legend-item">
              <span className="legend-color externos"></span> Colaboradores Externos
            </div>
          </div>

        
          <div className="pie-chart"></div>
        </div>
      </div>
         <Footer />
    </div>
  );
};

export default Dashboard;
