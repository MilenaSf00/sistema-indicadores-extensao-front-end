import React from 'react';
import '../css/Dashboard.css';


const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <div className="dashboard-inner-box">
          Indicadores da Extensão Universitária
        </div>

        <p className="dashboard-description">
          Acompanhe os dados sobre as ações de extensão realizadas na UNIPAMPA
        </p>
      </div>

      <button className="download-pdf">Download PDF</button>

     
      <div className="chart-container">
       
        <div className="chart-header">
          <h3>Número de ações de extensão</h3>
           <span className="chart-options">⋯</span> 
        </div>

        {/* gráfico 1*/}
        <div className="chart-bars">
          <div className="chart-bar">
            <div className="bar-fill" style={{ height: '20%' }}></div>
            <span>Opção 1</span>
          </div>
          <div className="chart-bar">
            <div className="bar-fill" style={{ height: '20%' }}></div>
            <span>Opção 2</span>
          </div>
        </div>

        {/* ampliar gráfico */}
        <div className="chart-footer">
          <span className="chart-expand">⤢</span> 
        </div>
      </div>
     {/* cards */}
      <div className="cards-container">
        {[1, 2, 3].map((num) => (
          <div className="card" key={num}>
            <div className="card-border">
              <div className="card-blue">
                <div className="card-number">1000</div>
                <div className="card-title">N° de Ações de Extensão em Execução</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
 