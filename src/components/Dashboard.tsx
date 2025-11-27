import React, { useState, useEffect } from 'react';
import '../css/Dashboard.css';
import FilterSidebar from '../components/filter';
import Footer from '../components/Footer';
import { CustomBarChart, CustomPieChart, SemiCircleChart, StatCard } from './ChartComponents';
import type { ChartData } from './ChartComponents';


interface DashboardData {
  acoesPorCidade: ChartData[];
  acoesExecucao: number;
  acoesExecutadas: number;
  eventosAcademicos: number;
  pessoasEnvolvidas: ChartData[];
  totalPessoas: number;
  totalEnvolvidos: number;
  acoesPorModalidade: ChartData[];
  acoesPorArea: ChartData[];
  discentes: {
    percentual: number;
    total: number;
    envolvidos: number;
    bolsistas: number;
  };
  docentes: {
    percentual: number;
    percentualCoordenadores: number;
    total: number;
    envolvidos: number;
    coordenadores: number;
  };
  taes: {
    percentual: number;
    percentualCoordenadores: number;
    total: number;
    envolvidos: number;
    coordenadores: number;
  };
}

// conectar
//const API_URL = "http://localhost:3000/api";

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [filters, setFilters] = useState<any>({});

  const handleFilterChange = (newFilters: any) => {
    console.log("Filtros atualizados:", newFilters);
    setFilters(newFilters);
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data with filters:", filters);

      // dado estatico por enquanto
      const mockData: DashboardData = {
        acoesPorCidade: [
          { name: 'Alegrete', value: 39, color: '#2E7D32' },
          { name: 'Bagé', value: 91, color: '#1565C0' },
          { name: 'Santana do Livramento', value: 38, color: '#424242' },
          { name: 'São Gabriel', value: 30, color: '#1565C0' },
          { name: 'São Borja', value: 46, color: '#FBC02D' },
          { name: 'Itaqui', value: 51, color: '#E64A19' },
          { name: 'Uruguaiana', value: 135, color: '#1565C0' },
          { name: 'Dom Pedrito', value: 66, color: '#283593' },
          { name: 'Caçapava do Sul', value: 27, color: '#F06292' },
          { name: 'Jaguarão', value: 35, color: '#283593' },
        ],
        acoesExecucao: 1000,
        acoesExecutadas: 800,
        eventosAcademicos: 61,
        pessoasEnvolvidas: [
          { name: 'Discentes', value: 350, color: '#FFC107' },
          { name: 'Docentes', value: 150, color: '#1565C0' },
          { name: 'TAEs', value: 80, color: '#E64A19' },
          { name: 'Colaboradores Externos', value: 120, color: '#F4511E' },
        ],
        totalPessoas: 273,
        totalEnvolvidos: 300,
        acoesPorModalidade: [
          { name: 'Projeto', value: 636, color: '#278837' },
          { name: 'Curso', value: 115, color: '#2E3192' },
          { name: 'Evento', value: 461, color: '#444' },
          { name: 'Prestação de Serviço', value: 8, color: '#2E3192' },
          { name: 'Programa', value: 67, color: '#FFC107' },
        ],
        acoesPorArea: [
          { name: 'Educação', value: 354, color: '#278837' },
          { name: 'Saúde', value: 133, color: '#2E3192' },
          { name: 'Cultura', value: 159, color: '#444' },
          { name: 'Meio Ambiente', value: 90, color: '#2E3192' },
          { name: 'Direitos Humanos e Justiça', value: 56, color: '#FFC107' },
          { name: 'Comunicação', value: 62, color: '#E74B23' },
          { name: 'Tecnologia e Produção', value: 88, color: '#2E3192' },
          { name: 'Trabalho', value: 50, color: '#2E3192' },
        ],
        discentes: {
          percentual: 35.65,
          total: 8724,
          envolvidos: 2848,
          bolsistas: 166
        },
        docentes: {
          percentual: 89.9,
          percentualCoordenadores: 19.91,
          total: 904,
          envolvidos: 813,
          coordenadores: 180
        },
        taes: {
          percentual: 35.5,
          percentualCoordenadores: 20.5,
          total: 877,
          envolvidos: 311,
          coordenadores: 180
        }
      };

      setData(mockData);
    };

    fetchData();
  }, [filters]);

  if (!data) return <div>Carregando...</div>;

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header-container">
        <div className="dashboard-header-bg">
          <svg width="100%" height="100%" viewBox="0 0 1440 300" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M180 0 V 100 Q 180 150 130 150 H 100 Q 80 150 80 130 Q 80 110 100 110 H 130 Q 150 110 150 80 V 0" fill="#E74B23" transform="translate(-50, 20)" />
            <path d="M1260 0 V 120 Q 1260 180 1200 180 H 1150 Q 1120 180 1120 150 Q 1120 120 1150 120 H 1200 Q 1230 120 1230 90 V 0" fill="#FFC107" transform="translate(50, 0)" />
            <path d="M0 250 Q 50 250 80 280 L 150 300 H 0 V 250" fill="#155BD8" transform="translate(0, 20)" />
            <path d="M1440 280 Q 1400 280 1380 300 H 1440 V 280" fill="#2E3192" />
          </svg>
        </div>
        <div className="dashboard-header-box">
          <h1 className="dashboard-title">INDICADORES DA EXTENSÃO UNIVERSITÁRIA</h1>
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
        <h2 className="dashboard-subtitle">Acompanhe os dados sobre as ações de extensão realizadas na UNIPAMPA</h2>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">

        {/* Main grafcos Area */}
        <div className="dashboard-main">
          <div className="stats-section-vertical" style={{ position: 'relative' }}>
            <button className="download-pdf">Download PDF</button>
            <div className="chart-decoration-wrapper">
              <div className="chart-dec-tab tab-yellow"></div>
              <div className="chart-dec-tab tab-red"></div>
              <div className="chart-dec-tab tab-blue"></div>
              <div className="chart-dec-tab tab-green"></div>
              <div className="chart-dec-tab tab-yellow-bottom"></div>
              <div className="bar-chart-container" style={{ margin: 0, width: '100%', minHeight: '350px', position: 'relative', zIndex: 2 }}>
                <div className="bar-chart-content">
                  <div className="chart-header" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    <h3>Número de Ações de Extensão</h3>
                    <span className="more-options">⋮</span>
                  </div>
                  <CustomBarChart data={data.acoesPorCidade} height={300} />
                  <div className="expand-icon-container">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 3V5H19.59L14.29 10.29L15.71 11.71L21 6.41V11H23V3H15Z" fill="#333" />
                      <path d="M3 15V21H9V19H4.41L9.71 13.71L8.29 12.29L3 17.59V13H1V15H3Z" fill="#333" />
                      <path d="M21 13V17.59L15.71 12.29L14.29 13.71L19.59 19H15V21H23V13H21Z" fill="#333" />
                      <path d="M9 3H1V11H3V6.41L8.29 11.71L9.71 10.29L4.41 5H9V3Z" fill="#333" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="stats-row-horizontal" style={{ marginTop: '20px', display: 'flex', gap: '15px', justifyContent: 'space-between' }}>
              <StatCard value={data.acoesExecucao} title="N° de Ações de Extensão em Execução" color="#0D3887" borderColor="#0D3887" />
              <StatCard value={data.acoesExecutadas} title="N° de Ações de Extensão Executadas" color="#0D3887" borderColor="#0D3887" />
              <StatCard value={data.eventosAcademicos} title="N° de Eventos Acadêmicos" color="#0D3887" borderColor="#0D3887" />
            </div>
          </div>
          <div className="stats-row-wide" style={{ marginTop: '40px', alignItems: 'stretch' }}>
            <div className="bar-chart-container" style={{ flex: 2, margin: 0, width: 'auto', minHeight: '350px', position: 'relative' }}>
              <div className="bar-chart-content">
                <div className="chart-header" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                  <h3 style={{ maxWidth: '90%' }}>Número de pessoas envolvidas nos projetos de extensão executados (Equipe executora)</h3>
                  <span className="more-options">⋮</span>
                </div>
                <div className="row-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                  <div className="chart-legend-left">
                    {data.pessoasEnvolvidas.map((item, idx) => (
                      <div key={idx} className="legend-item" style={{ marginBottom: '8px' }}>
                        <span className="legend-dot" style={{ backgroundColor: item.color, width: '15px', height: '15px' }}></span>
                        {item.name}
                      </div>
                    ))}
                  </div>
                  <div className="pie-chart-wrapper" style={{ marginRight: '50px' }}>
                    <CustomPieChart data={data.pessoasEnvolvidas} size={250} />
                  </div>
                </div>
                <div className="expand-icon-container">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 3V5H19.59L14.29 10.29L15.71 11.71L21 6.41V11H23V3H15Z" fill="#333" />
                    <path d="M3 15V21H9V19H4.41L9.71 13.71L8.29 12.29L3 17.59V13H1V15H3Z" fill="#333" />
                    <path d="M21 13V17.59L15.71 12.29L14.29 13.71L19.59 19H15V21H23V13H21Z" fill="#333" />
                    <path d="M9 3H1V11H3V6.41L8.29 11.71L9.71 10.29L4.41 5H9V3Z" fill="#333" />
                  </svg>
                </div>
              </div>
              <div className="pie-total-badge">
                <span className="total-label">Total</span>
                <span className="total-value">{data.totalEnvolvidos}</span>
              </div>
            </div>
            <div className="stats-column" style={{ flex: 1, justifyContent: 'center', maxWidth: '300px' }}>
              <div className="stat-card-green">
                <div className="stat-value">{data.totalPessoas}</div>
                <div className="stat-label">N° de pessoas da comunidade externa</div>
              </div>
            </div>
          </div>
          <div className="stats-row-wide" style={{ marginTop: '40px', flexDirection: 'column' }}>
            {/* Modalidade */}
            <div className="bar-chart-container" style={{ margin: 0, width: '100%', minHeight: '300px', position: 'relative' }}>
              <div className="bar-chart-content">
                <div className="chart-header" style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <h3>Ações por modalidade</h3>
                  <span className="more-options">⋮</span>
                </div>
                <CustomBarChart data={data.acoesPorModalidade} height={250} barColor="#278837" />
                <div className="expand-icon-container">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 3V5H19.59L14.29 10.29L15.71 11.71L21 6.41V11H23V3H15Z" fill="#333" />
                    <path d="M3 15V21H9V19H4.41L9.71 13.71L8.29 12.29L3 17.59V13H1V15H3Z" fill="#333" />
                    <path d="M21 13V17.59L15.71 12.29L14.29 13.71L19.59 19H15V21H23V13H21Z" fill="#333" />
                    <path d="M9 3H1V11H3V6.41L8.29 11.71L9.71 10.29L4.41 5H9V3Z" fill="#333" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Área Temática */}
            <div className="bar-chart-container" style={{ margin: 0, width: '100%', minHeight: '300px', position: 'relative' }}>
              <div className="bar-chart-content">
                <div className="chart-header" style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <h3>Ações por Área Temática</h3>
                  <span className="more-options">⋮</span>
                </div>
                <CustomBarChart data={data.acoesPorArea} height={300} barColor="#278837" />
                <div className="expand-icon-container">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 3V5H19.59L14.29 10.29L15.71 11.71L21 6.41V11H23V3H15Z" fill="#333" />
                    <path d="M3 15V21H9V19H4.41L9.71 13.71L8.29 12.29L3 17.59V13H1V15H3Z" fill="#333" />
                    <path d="M21 13V17.59L15.71 12.29L14.29 13.71L19.59 19H15V21H23V13H21Z" fill="#333" />
                    <path d="M9 3H1V11H3V6.41L8.29 11.71L9.71 10.29L4.41 5H9V3Z" fill="#333" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Discentes */}
          <div className="section-header-pill">
            <div className="icon-circle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3Z" fill="white" />
                <path d="M5 13.18V17.18C5 17.18 5 21 12 21C19 21 19 17.18 19 17.18V13.18L12 17L5 13.18Z" fill="white" />
              </svg>
            </div>
            Discentes
          </div>
          <div className="stats-section-vertical">
            <div className="bar-chart-container" style={{ margin: 0, width: '100%', marginBottom: '30px' }}>
              <div className="bar-chart-content" style={{ alignItems: 'center' }}>
                <div className="chart-header" style={{ width: '100%', marginBottom: '20px' }}>
                  <h3>Percentual de discentes envolvidos em atividades de extensão</h3>
                  <span className="more-options" style={{ float: 'right' }}>⋮</span>
                </div>
                <SemiCircleChart percentage={data.discentes.percentual} label="Discente" color="#FFC107" />
                <div className="expand-icon-container">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 3V5H19.59L14.29 10.29L15.71 11.71L21 6.41V11H23V3H15Z" fill="#333" />
                    <path d="M3 15V21H9V19H4.41L9.71 13.71L8.29 12.29L3 17.59V13H1V15H3Z" fill="#333" />
                    <path d="M21 13V17.59L15.71 12.29L14.29 13.71L19.59 19H15V21H23V13H21Z" fill="#333" />
                    <path d="M9 3H1V11H3V6.41L8.29 11.71L9.71 10.29L4.41 5H9V3Z" fill="#333" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Cards */}
            <div className="stats-row-horizontal" style={{ marginBottom: '40px' }}>
              <StatCard value={data.discentes.total} title="Total de Discentes na Universidade" color="#0D3887" borderColor="#0D3887" />
              <StatCard value={data.discentes.envolvidos} title="Discentes envolvidos em ações de extensão" color="#0D3887" borderColor="#0D3887" />
              <StatCard value={data.discentes.bolsistas} title="N° de Discentes Bolsistas" color="#0D3887" borderColor="#0D3887" />
            </div>
          </div>

          {/* Docentes */}
          <div className="section-header-pill">
            <div className="icon-circle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 17V19H4V17H20ZM20 5V15H4V5H20ZM22 3H2V21H22V3ZM15 7H6V9H15V7ZM15 11H6V13H15V11Z" fill="white" />
              </svg>
            </div>
            Docentes
          </div>

          <div className="stats-section-vertical">
            <div style={{ display: 'flex', gap: '30px', width: '100%', marginBottom: '30px' }}>
              {/*Docent Envolvidos */}
              <div className="bar-chart-container" style={{ margin: 0, flex: 1, position: 'relative' }}>
                <div className="chart-header" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
                  <h3 style={{ maxWidth: '80%' }}>Percentual de docentes envolvidos em atividades de extensão</h3>
                  <span className="more-options">⋮</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <SemiCircleChart percentage={data.docentes.percentual} label="Docente" color="#FFC107" size={200} />
                </div>
                <div className="expand-icon-container">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 3V5H19.59L14.29 10.29L15.71 11.71L21 6.41V11H23V3H15Z" fill="#333" />
                    <path d="M3 15V21H9V19H4.41L9.71 13.71L8.29 12.29L3 17.59V13H1V15H3Z" fill="#333" />
                    <path d="M21 13V17.59L15.71 12.29L14.29 13.71L19.59 19H15V21H23V13H21Z" fill="#333" />
                    <path d="M9 3H1V11H3V6.41L8.29 11.71L9.71 10.29L4.41 5H9V3Z" fill="#333" />
                  </svg>
                </div>
              </div>
              {/*Coordenadores */}
              <div className="bar-chart-container" style={{ margin: 0, flex: 1, position: 'relative' }}>
                <div className="chart-header" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
                  <h3 style={{ maxWidth: '80%' }}>Percentual de coordenadores docentes</h3>
                  <span className="more-options">⋮</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <SemiCircleChart percentage={data.docentes.percentualCoordenadores} label="Docente" color="#FFC107" size={200} />
                </div>
                <div className="expand-icon-container">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 3V5H19.59L14.29 10.29L15.71 11.71L21 6.41V11H23V3H15Z" fill="#333" />
                    <path d="M3 15V21H9V19H4.41L9.71 13.71L8.29 12.29L3 17.59V13H1V15H3Z" fill="#333" />
                    <path d="M21 13V17.59L15.71 12.29L14.29 13.71L19.59 19H15V21H23V13H21Z" fill="#333" />
                    <path d="M9 3H1V11H3V6.41L8.29 11.71L9.71 10.29L4.41 5H9V3Z" fill="#333" />
                  </svg>
                </div>
              </div>
            </div>
            {/* Cards */}
            <div className="stats-row-horizontal" style={{ marginBottom: '40px' }}>
              <StatCard value={data.docentes.total} title="Total de Docentes na Universidade" color="#0D3887" borderColor="#0D3887" />
              <StatCard value={data.docentes.envolvidos} title="Docentes envolvidos em ações de extensão" color="#0D3887" borderColor="#0D3887" />
              <StatCard value={data.docentes.coordenadores} title="N° de Docentes Coordenadores de Projetos" color="#0D3887" borderColor="#0D3887" />
            </div>
          </div>
          {/*TAEs */}
          <div className="section-header-pill">
            <div className="icon-circle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 11C16 12.6569 14.6569 14 13 14C11.3431 14 10 12.6569 10 11C10 9.34315 11.3431 8 13 8C14.6569 8 16 9.34315 16 11Z" fill="white" />
                <path d="M18 11C18 12.6569 16.6569 14 15 14C14.7716 14 14.5513 13.9729 14.3396 13.922C14.7563 13.0602 15 12.0729 15 11C15 9.9271 14.7563 8.9398 14.3396 8.07798C14.5513 8.02708 14.7716 8 15 8C16.6569 8 18 9.34315 18 11Z" fill="white" />
                <path d="M8 11C8 12.6569 6.65685 14 5 14C3.34315 14 2 12.6569 2 11C2 9.34315 3.34315 8 5 8C6.65685 8 8 9.34315 8 11Z" fill="white" />
                <path d="M13 15C10.3333 15 5 16.34 5 19V21H21V19C21 16.34 15.6667 15 13 15Z" fill="white" />
              </svg>
            </div>
            TAEs
          </div>
          <div className="stats-section-vertical">
            <div style={{ display: 'flex', gap: '30px', width: '100%', marginBottom: '30px' }}>
              {/*TAe nvolvidos */}
              <div className="bar-chart-container" style={{ margin: 0, flex: 1, position: 'relative' }}>
                <div className="chart-header" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
                  <h3 style={{ maxWidth: '80%' }}>Percentual TAEs envolvidos em atividades de extensão</h3>
                  <span className="more-options">⋮</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <SemiCircleChart percentage={data.taes.percentual} label="Docente" color="#FFC107" size={200} />
                </div>
                <div className="expand-icon-container">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 3V5H19.59L14.29 10.29L15.71 11.71L21 6.41V11H23V3H15Z" fill="#333" />
                    <path d="M3 15V21H9V19H4.41L9.71 13.71L8.29 12.29L3 17.59V13H1V15H3Z" fill="#333" />
                    <path d="M21 13V17.59L15.71 12.29L14.29 13.71L19.59 19H15V21H23V13H21Z" fill="#333" />
                    <path d="M9 3H1V11H3V6.41L8.29 11.71L9.71 10.29L4.41 5H9V3Z" fill="#333" />
                  </svg>
                </div>
              </div>

              {/* tAE Coordenadores */}
              <div className="bar-chart-container" style={{ margin: 0, flex: 1, position: 'relative' }}>
                <div className="chart-header" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
                  <h3 style={{ maxWidth: '80%' }}>Percentual TAEs coordenadores</h3>
                  <span className="more-options">⋮</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <SemiCircleChart percentage={data.taes.percentualCoordenadores} label="Docente" color="#FFC107" size={200} />
                </div>
                <div className="expand-icon-container">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 3V5H19.59L14.29 10.29L15.71 11.71L21 6.41V11H23V3H15Z" fill="#333" />
                    <path d="M3 15V21H9V19H4.41L9.71 13.71L8.29 12.29L3 17.59V13H1V15H3Z" fill="#333" />
                    <path d="M21 13V17.59L15.71 12.29L14.29 13.71L19.59 19H15V21H23V13H21Z" fill="#333" />
                    <path d="M9 3H1V11H3V6.41L8.29 11.71L9.71 10.29L4.41 5H9V3Z" fill="#333" />
                  </svg>
                </div>
              </div>

            </div>

            {/* Cards */}
            <div className="stats-row-horizontal" style={{ marginBottom: '40px' }}>
              <StatCard value={data.taes.total} title="Total de TAEs na Universidade" color="#0D3887" borderColor="#0D3887" />
              <StatCard value={data.taes.envolvidos} title="TAEs envolvidos em ações de extensão" color="#0D3887" borderColor="#0D3887" />
              <StatCard value={data.taes.coordenadores} title="N° de TAEs coordenadores" color="#0D3887" borderColor="#0D3887" />
            </div>
          </div>

          <div className="update-badge">
            Atualizado em: 10/06/2025 16:12:00
          </div>

        </div>

        {/* Sidebar */}
        <div className="dashboard-sidebar">
          <FilterSidebar onFilterChange={handleFilterChange} />
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
