import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import '../css/Dashboard.css';
import FilterSidebar from '../components/filter';
import Footer from '../components/Footer';
import { getIndicators, getFilterOptions, getActionsDetails, type FilterOptions, type ActionDetail } from '../services/api';
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

const ChartActionMenu = ({ chartId, title, onViewDetails }: { chartId: string, title: string, onViewDetails?: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (format: 'png' | 'jpeg') => {
    setIsOpen(false);
    setIsDownloading(true);
    const element = document.getElementById(chartId);
    if (!element) {
      setIsDownloading(false);
      return;
    }


    document.body.style.cursor = 'wait';

    try {

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        ignoreElements: (node) => {
          return node.classList.contains('more-options') || node.classList.contains('expand-icon-container') || node.classList.contains('chart-menu-dropdown');
        }
      });

      const link = document.createElement('a');
      link.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${format}`;
      link.href = canvas.toDataURL(`image/${format}`);
      link.click();
    } catch (e) {
      console.error(e);
      alert("Erro ao baixar gráfico");
    } finally {
      document.body.style.cursor = 'default';
      setIsDownloading(false);
    }
  };

  return (
    <div className="chart-menu-container" style={{ position: 'relative', display: 'inline-block' }}>
      <span className="more-options" onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }} style={{ cursor: 'pointer', padding: '0 5px' }}>⋮</span>
      {isOpen && (
        <>
          <div className="chart-menu-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9 }} onClick={() => setIsOpen(false)}></div>
          <div className="chart-menu-dropdown" style={{
            position: 'absolute', top: '100%', right: 0,
            background: 'white', border: '1px solid #ccc', borderRadius: '8px',
            zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', minWidth: '160px',
            overflow: 'hidden'
          }}>
            <div className="menu-item" onClick={() => handleDownload('png')} style={{ padding: '10px 15px', cursor: 'pointer', borderBottom: '1px solid #eee', fontSize: '14px', fontFamily: 'Manrope', color: '#333' }}>
              Download PNG
            </div>
            <div className="menu-item" onClick={() => handleDownload('jpeg')} style={{ padding: '10px 15px', cursor: 'pointer', fontSize: '14px', fontFamily: 'Manrope', color: '#333' }}>
              Download JPEG
            </div>
            {onViewDetails && (
              <div className="menu-item" onClick={() => { setIsOpen(false); onViewDetails(); }} style={{ padding: '10px 15px', cursor: 'pointer', fontSize: '14px', fontFamily: 'Manrope', color: '#333', borderTop: '1px solid #eee' }}>
                Ver detalhes
              </div>
            )}
          </div>
        </>
      )}
      {isDownloading && (
        <div style={{ position: 'absolute', top: 0, right: 30, fontSize: '12px', color: '#278837', fontWeight: 'bold' }}>Baixando...</div>
      )}
    </div>
  );
};

const Modal = ({ content, onClose }: { content: React.ReactNode, onClose: () => void }) => {
  if (!content) return null;
  return (
    <div className="modal-overlay" onClick={onClose} style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1000,
      display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{
        backgroundColor: 'white', padding: '20px', borderRadius: '8px',
        width: '80%', height: '80%', overflow: 'auto', position: 'relative',
        display: 'flex', justifyContent: 'center', alignItems: 'center'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '10px', right: '10px',
          background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', zIndex: 1001
        }}>×</button>
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {content}
        </div>
      </div>
    </div>
  );
};

const DetailsTable = ({ data, title, extraColumns }: { data: ActionDetail[], title: string, extraColumns?: { key: keyof ActionDetail, label: string }[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [sortConfig, setSortConfig] = useState<{ key: keyof ActionDetail, direction: 'ascending' | 'descending' } | null>(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const filteredData = sortedData.filter(item =>
    (item.titulo_projeto || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const requestSort = (key: keyof ActionDetail) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const downloadCSV = () => {
    const headers = ['Título', 'Campus', 'Modalidade', 'Área Temática', 'Área Conhecimento', 'Linha Temática', 'Situação', 'Ano', 'Resumo'];
    if (extraColumns) {
      extraColumns.forEach(col => headers.push(col.label));
    }

    const csvRows = [
      headers.join(';'),
      ...filteredData.map(row => {
        const values = [
          `"${row.titulo_projeto.replace(/"/g, '""')}"`,
          row.campus,
          row.modalidade,
          row.area_tematica,
          row.area_conhecimento,
          row.linha_tematica,
          row.situacao,
          row.ano,
          `"${(row.resumo || "").replace(/"/g, '""')}"`
        ];
        if (extraColumns) {
          extraColumns.forEach(col => {
            values.push(String(row[col.key] || 0));
          });
        }
        return values.join(';');
      })
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, fontFamily: 'Manrope', color: '#333' }}>{title}</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Buscar por título..."
            value={searchTerm}
            onChange={handleSearch}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '300px' }}
          />
          <button onClick={downloadCSV} style={{ padding: '8px 16px', backgroundColor: '#278837', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Exportar CSV
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '10px', color: '#666' }}>
        Total de registros: {filteredData.length}
      </div>

      <div style={{ flex: 1, overflow: 'auto', border: '1px solid #eee', borderRadius: '4px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead style={{ position: 'sticky', top: 0, backgroundColor: '#f5f5f5' }}>
            <tr>
              <th onClick={() => requestSort('titulo_projeto')} style={{ padding: '12px', textAlign: 'left', cursor: 'pointer', minWidth: '300px' }}>Título {sortConfig?.key === 'titulo_projeto' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}</th>
              <th onClick={() => requestSort('campus')} style={{ padding: '12px', textAlign: 'left', cursor: 'pointer' }}>Campus {sortConfig?.key === 'campus' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}</th>
              <th onClick={() => requestSort('modalidade')} style={{ padding: '12px', textAlign: 'left', cursor: 'pointer' }}>Modalidade {sortConfig?.key === 'modalidade' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}</th>
              <th onClick={() => requestSort('area_tematica')} style={{ padding: '12px', textAlign: 'left', cursor: 'pointer' }}>Área Temática {sortConfig?.key === 'area_tematica' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}</th>
              <th onClick={() => requestSort('situacao')} style={{ padding: '12px', textAlign: 'left', cursor: 'pointer' }}>Situação {sortConfig?.key === 'situacao' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}</th>
              <th onClick={() => requestSort('ano')} style={{ padding: '12px', textAlign: 'left', cursor: 'pointer' }}>Ano {sortConfig?.key === 'ano' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}</th>
              {extraColumns && extraColumns.map(col => (
                <th key={col.key} onClick={() => requestSort(col.key)} style={{ padding: '12px', textAlign: 'left', cursor: 'pointer' }}>{col.label} {sortConfig?.key === col.key && (sortConfig.direction === 'ascending' ? '▲' : '▼')}</th>
              ))}
              <th style={{ padding: '12px', textAlign: 'left', minWidth: '200px' }}>Resumo</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #eee', backgroundColor: index % 2 === 0 ? 'white' : '#f9f9f9' }}>
                  <td style={{ padding: '12px' }}>{item.titulo_projeto}</td>
                  <td style={{ padding: '12px' }}>{item.campus}</td>
                  <td style={{ padding: '12px' }}>{item.modalidade}</td>
                  <td style={{ padding: '12px' }}>{item.area_tematica}</td>
                  <td style={{ padding: '12px' }}>{item.situacao}</td>
                  <td style={{ padding: '12px' }}>{item.ano}</td>
                  {extraColumns && extraColumns.map(col => (
                    <td key={col.key} style={{ padding: '12px' }}>{item[col.key]}</td>
                  ))}
                  <td style={{ padding: '12px' }} title={item.resumo}>
                    <div style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxHeight: '4.5em',
                      lineHeight: '1.5em'
                    }}>
                      {item.resumo}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9 + (extraColumns ? extraColumns.length : 0)} style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                  Nenhum dado disponível
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{ padding: '8px 16px', border: '1px solid #ccc', borderRadius: '4px', background: currentPage === 1 ? '#eee' : 'white', cursor: currentPage === 1 ? 'default' : 'pointer' }}
        >
          Anterior
        </button>
        <span style={{ display: 'flex', alignItems: 'center' }}>
          Página {currentPage} de {totalPages || 1}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
          style={{ padding: '8px 16px', border: '1px solid #ccc', borderRadius: '4px', background: currentPage === totalPages || totalPages === 0 ? '#eee' : 'white', cursor: currentPage === totalPages || totalPages === 0 ? 'default' : 'pointer' }}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [filters, setFilters] = useState<any>({});
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    campus: [],
    modalidade: [],
    area_tematica: [],
    linha_tematica: [],
    situacao: [],
    ano: [],
    area_conhecimento: []
  });

  useEffect(() => {
    const storedLastUpdate = localStorage.getItem('lastUploadTime');
    if (storedLastUpdate) {
      setLastUpdate(storedLastUpdate);
    }
  }, []);

  const fetchDetails = async (title: string, filterFn?: (item: ActionDetail) => boolean, extraColumns?: { key: keyof ActionDetail, label: string }[]) => {
    setCurrentDetailsTitle(title);
    setIsDetailsModalOpen(true);
    try {
      openModal(<div style={{ padding: '40px', textAlign: 'center', fontSize: '18px', color: '#666' }}>Carregando detalhes...</div>);
      const details = await getActionsDetails(filters);

      let filteredDetails = details;
      if (filterFn) {
        filteredDetails = details.filter(filterFn);
      }

      openModal(<DetailsTable data={filteredDetails} title={title} extraColumns={extraColumns} />);
    } catch (error) {
      console.error("Erro ao buscar detalhes:", error);
      openModal(<div style={{ padding: '40px', textAlign: 'center', color: '#d32f2f' }}>Erro ao carregar detalhes. Tente novamente.</div>);
    }
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);


    setTimeout(async () => {
      try {
        const element = document.querySelector('.dashboard-main') as HTMLElement;
        if (!element) {
          setIsGeneratingPDF(false);
          return;
        }

        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          logging: false
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pdfHeight;
        }

        pdf.save('dashboard-indicadores.pdf');
      } catch (error) {
        console.error("Erro ao gerar PDF:", error);
        alert("Ocorreu um erro ao gerar o PDF. Tente novamente.");
      } finally {
        setIsGeneratingPDF(false);
      }
    }, 100);
  };

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
  };

  const handleFilterChange = (newFilters: any) => {
    console.log("Filtros atualizados:", newFilters);
    setFilters(newFilters);
  };

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [currentDetailsTitle, setCurrentDetailsTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data with filters:", filters);

      try {
        const apiData = await getIndicators(filters);


        const acoesPorCampus = apiData.acoes_por_campus.map((item: any) => ({
          name: item.campus,
          value: item.quantidade,
          color: '#1565C0'
        }));

        const acoesPorModalidade = apiData.acoes_por_modalidade.map((item: any) => ({
          name: item.modalidade,
          value: item.quantidade,
          color: '#278837'
        }));

        const acoesPorArea = apiData.acoes_por_area_tematica.map((item: any) => ({
          name: item.area_tematica,
          value: item.quantidade,
          color: '#278837'
        }));

        const dashboardData: DashboardData = {
          acoesPorCidade: acoesPorCampus,
          acoesExecucao: apiData.acoes_em_execucao,
          acoesExecutadas: apiData.acoes_executadas,
          eventosAcademicos: apiData.eventos_academicos,
          pessoasEnvolvidas: [
            { name: 'Discentes', value: apiData.numero_discentes_envolvidos, color: '#FFC107' },
            { name: 'Docentes', value: apiData.numero_docentes_envolvidos, color: '#1565C0' },
            { name: 'TAEs', value: apiData.total_tecnicos_envolvidos, color: '#E64A19' },
            { name: 'Comunidade Externa', value: apiData.pessoas_comunidade_externa, color: '#F4511E' },
          ],
          totalPessoas: apiData.pessoas_comunidade_externa,
          totalEnvolvidos: apiData.numero_discentes_envolvidos + apiData.numero_docentes_envolvidos + apiData.total_tecnicos_envolvidos + apiData.pessoas_comunidade_externa,
          acoesPorModalidade: acoesPorModalidade,
          acoesPorArea: acoesPorArea,
          discentes: {
            percentual: apiData.percentual_discentes,
            total: apiData.total_matriculas_graduacao,
            envolvidos: apiData.numero_discentes_envolvidos,
            bolsistas: apiData.numero_discentes_bolsistas
          },
          docentes: {
            percentual: apiData.percentual_docentes,
            percentualCoordenadores: apiData.percentual_coordenadores_docentes,
            total: apiData.total_docentes,
            envolvidos: apiData.numero_docentes_envolvidos,
            coordenadores: apiData.numero_coordenadores_docentes
          },
          taes: {
            percentual: apiData.percentual_taes || (apiData.total_taes ? (apiData.total_tecnicos_envolvidos / apiData.total_taes) * 100 : 0),
            percentualCoordenadores: apiData.percentual_coordenadores_taes,
            total: apiData.total_taes,
            envolvidos: apiData.total_tecnicos_envolvidos,
            coordenadores: apiData.numero_coordenadores_taes
          }
        };

        setData(dashboardData);
      } catch (error) {
        console.error("Erro ao buscar indicadores:", error);
      }
    };

    fetchData();

    if (isDetailsModalOpen) {
      fetchDetails(currentDetailsTitle);
    }
  }, [filters]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const options = await getFilterOptions();
        setFilterOptions(options);
      } catch (error) {
        console.error("Erro ao buscar opções de filtro:", error);
      }
    };
    fetchOptions();
  }, []);

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
        {isGeneratingPDF && (
          <div className="pdf-loading-overlay">
            <div className="pdf-loading-spinner"></div>
            <p>Gerando PDF, aguarde...</p>
          </div>
        )}

        {/* Main grafcos Area */}
        <div className="dashboard-main">
          <div className="stats-section-vertical" style={{ position: 'relative' }}>
            {!isGeneratingPDF && (
              <button className="download-pdf" onClick={handleDownloadPDF}>Download PDF</button>
            )}
            <div className="chart-decoration-wrapper">
              <div className="chart-dec-tab tab-yellow"></div>
              <div className="chart-dec-tab tab-red"></div>
              <div className="chart-dec-tab tab-blue"></div>
              <div className="chart-dec-tab tab-green"></div>
              <div className="chart-dec-tab tab-yellow-bottom"></div>
              <div id="chart-acoes-extensao" className="bar-chart-container" style={{ margin: 0, width: '100%', minHeight: '350px', position: 'relative', zIndex: 2 }}>
                <div className="bar-chart-content">
                  <div className="chart-header" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    <h3>Número de Ações de Extensão</h3>
                    <ChartActionMenu chartId="chart-acoes-extensao" title="Numero de Acoes de Extensao" onViewDetails={() => fetchDetails("Detalhes: Número de Ações de Extensão")} />
                  </div>
                  <CustomBarChart data={data.acoesPorCidade} height={300} />
                  <div className="expand-icon-container" onClick={() => openModal(
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <h3 style={{ marginBottom: '20px', fontFamily: 'Manrope', fontWeight: 800, color: '#333' }}>Número de Ações de Extensão</h3>
                      <CustomBarChart data={data.acoesPorCidade} height={500} />
                    </div>
                  )} style={{ cursor: 'pointer' }}>
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
            <div id="chart-pessoas-envolvidas" className="bar-chart-container" style={{ flex: 2, margin: 0, width: 'auto', minHeight: '350px', position: 'relative' }}>
              <div className="bar-chart-content">
                <div className="chart-header" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                  <h3 style={{ maxWidth: '90%' }}>Número de pessoas envolvidas nos projetos de extensão executados (Equipe executora)</h3>
                  <ChartActionMenu chartId="chart-pessoas-envolvidas" title="Pessoas Envolvidas" onViewDetails={() => fetchDetails("Detalhes: Pessoas Envolvidas", undefined, [
                    { key: 'numero_discentes_envolvidos', label: 'Discentes' },
                    { key: 'numero_docentes_envolvidos', label: 'Docentes' },
                    { key: 'total_tecnicos_envolvidos', label: 'TAEs' },
                    { key: 'pessoas_comunidade_externa', label: 'Comunidade Externa' }
                  ])} />
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
                <div className="expand-icon-container" onClick={() => openModal(
                  <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <h3 style={{ margin: 0, fontFamily: 'Manrope', fontWeight: 800, color: '#333', textAlign: 'center', flex: 1 }}>Número de pessoas envolvidas nos projetos de extensão executados</h3>
                      <ChartActionMenu chartId="chart-pessoas-envolvidas" title="Pessoas Envolvidas" onViewDetails={() => fetchDetails("Detalhes: Pessoas Envolvidas", undefined, [
                        { key: 'numero_discentes_envolvidos', label: 'Discentes' },
                        { key: 'numero_docentes_envolvidos', label: 'Docentes' },
                        { key: 'total_tecnicos_envolvidos', label: 'TAEs' },
                        { key: 'pessoas_comunidade_externa', label: 'Comunidade Externa' }
                      ])} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '40px', width: '100%' }}>
                      <div className="chart-legend-left">
                        {data.pessoasEnvolvidas.map((item, idx) => (
                          <div key={idx} className="legend-item" style={{ marginBottom: '12px', fontSize: '16px' }}>
                            <span className="legend-dot" style={{ backgroundColor: item.color, width: '20px', height: '20px' }}></span>
                            {item.name}
                          </div>
                        ))}
                      </div>
                      <CustomPieChart data={data.pessoasEnvolvidas} size={500} />
                    </div>
                  </div>
                )} style={{ cursor: 'pointer' }}>
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
            <div id="chart-modalidade" className="bar-chart-container" style={{ margin: 0, width: '100%', minHeight: '300px', position: 'relative' }}>
              <div className="bar-chart-content">
                <div className="chart-header" style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <h3>Ações por modalidade</h3>
                  <ChartActionMenu chartId="chart-modalidade" title="Acoes por Modalidade" onViewDetails={() => fetchDetails("Detalhes: Ações por Modalidade")} />
                </div>
                <CustomBarChart data={data.acoesPorModalidade} height={250} barColor="#278837" />
                <div className="expand-icon-container" onClick={() => openModal(
                  <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h3 style={{ marginBottom: '20px', fontFamily: 'Manrope', fontWeight: 800, color: '#333' }}>Ações por modalidade</h3>
                    <CustomBarChart data={data.acoesPorModalidade} height={500} barColor="#278837" />
                  </div>
                )} style={{ cursor: 'pointer' }}>
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
            <div id="chart-area-tematica" className="bar-chart-container" style={{ margin: 0, width: '100%', minHeight: '300px', position: 'relative' }}>
              <div className="bar-chart-content">
                <div className="chart-header" style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <h3>Ações por Área Temática</h3>
                  <ChartActionMenu chartId="chart-area-tematica" title="Acoes por Area Tematica" onViewDetails={() => fetchDetails("Detalhes: Ações por Área Temática")} />
                </div>
                <CustomBarChart data={data.acoesPorArea} height={300} barColor="#278837" />
                <div className="expand-icon-container" onClick={() => openModal(
                  <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h3 style={{ marginBottom: '20px', fontFamily: 'Manrope', fontWeight: 800, color: '#333' }}>Ações por Área Temática</h3>
                    <CustomBarChart data={data.acoesPorArea} height={500} barColor="#278837" />
                  </div>
                )} style={{ cursor: 'pointer' }}>
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
            <div id="chart-discentes-percentual" className="bar-chart-container" style={{ margin: 0, width: '100%', marginBottom: '30px' }}>
              <div className="bar-chart-content" style={{ alignItems: 'center' }}>
                <div className="chart-header" style={{ width: '100%', marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                  <h3>Percentual de discentes envolvidos em atividades de extensão</h3>
                  <ChartActionMenu chartId="chart-discentes-percentual" title="Percentual Discentes" onViewDetails={() => fetchDetails("Detalhes: Percentual de Discentes", (item) => (item.numero_discentes_envolvidos || 0) > 0, [{ key: 'numero_discentes_envolvidos', label: 'Discentes Envolvidos' }])} />
                </div>
                <SemiCircleChart percentage={data.discentes.percentual} label="Discente" color="#FFC107" value={data.discentes.envolvidos} total={data.discentes.total} />
                <div className="expand-icon-container" onClick={() => openModal(
                  <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h3 style={{ marginBottom: '20px', fontFamily: 'Manrope', fontWeight: 800, color: '#333' }}>Percentual de discentes envolvidos em atividades de extensão</h3>
                    <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666', maxWidth: '80%' }}>
                      Este gráfico mostra o percentual de discentes envolvidos em atividades de extensão, calculado como o total de discentes participantes dividido pelo total de discentes da universidade.
                    </p>
                    <SemiCircleChart percentage={data.discentes.percentual} label="Discente" color="#FFC107" size={400} value={data.discentes.envolvidos} total={data.discentes.total} showLegend={true} />
                  </div>
                )} style={{ cursor: 'pointer' }}>
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
              <div id="chart-docentes-percentual" className="bar-chart-container" style={{ margin: 0, flex: 1, position: 'relative' }}>
                <div className="chart-header" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
                  <h3 style={{ maxWidth: '80%' }}>Percentual de docentes envolvidos em atividades de extensão</h3>
                  <ChartActionMenu chartId="chart-docentes-percentual" title="Percentual Docentes" onViewDetails={() => fetchDetails("Detalhes: Percentual de Docentes", (item) => (item.numero_docentes_envolvidos || 0) > 0, [{ key: 'numero_docentes_envolvidos', label: 'Docentes Envolvidos' }])} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <SemiCircleChart percentage={data.docentes.percentual} label="Docente" color="#FFC107" size={200} value={data.docentes.envolvidos} total={data.docentes.total} />
                </div>
                <div className="expand-icon-container" onClick={() => openModal(
                  <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h3 style={{ marginBottom: '20px', fontFamily: 'Manrope', fontWeight: 800, color: '#333' }}>Percentual de docentes envolvidos em atividades de extensão</h3>
                    <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666', maxWidth: '80%' }}>
                      Este gráfico mostra o percentual de docentes envolvidos em atividades de extensão, calculado como o total de docentes participantes dividido pelo total de docentes da universidade.
                    </p>
                    <SemiCircleChart percentage={data.docentes.percentual} label="Docente" color="#FFC107" size={400} value={data.docentes.envolvidos} total={data.docentes.total} showLegend={true} />
                  </div>
                )} style={{ cursor: 'pointer' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 3V5H19.59L14.29 10.29L15.71 11.71L21 6.41V11H23V3H15Z" fill="#333" />
                    <path d="M3 15V21H9V19H4.41L9.71 13.71L8.29 12.29L3 17.59V13H1V15H3Z" fill="#333" />
                    <path d="M21 13V17.59L15.71 12.29L14.29 13.71L19.59 19H15V21H23V13H21Z" fill="#333" />
                    <path d="M9 3H1V11H3V6.41L8.29 11.71L9.71 10.29L4.41 5H9V3Z" fill="#333" />
                  </svg>
                </div>
              </div>
              {/*Coordenadores */}
              <div id="chart-docentes-coordenadores" className="bar-chart-container" style={{ margin: 0, flex: 1, position: 'relative' }}>
                <div className="chart-header" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
                  <h3 style={{ maxWidth: '80%' }}>Percentual de coordenadores docentes</h3>
                  <ChartActionMenu chartId="chart-docentes-coordenadores" title="Percentual Coordenadores Docentes" onViewDetails={() => fetchDetails("Detalhes: Percentual de Coordenadores Docentes", (item) => item.numero_coordenadores_docentes === 1, [{ key: 'numero_coordenadores_docentes', label: 'Coordenadores Docentes' }])} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <SemiCircleChart percentage={data.docentes.percentualCoordenadores} label="Docente" color="#FFC107" size={200} value={data.docentes.coordenadores} total={data.docentes.total} />
                </div>
                <div className="expand-icon-container" onClick={() => openModal(
                  <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h3 style={{ marginBottom: '20px', fontFamily: 'Manrope', fontWeight: 800, color: '#333' }}>Percentual de coordenadores docentes</h3>
                    <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666', maxWidth: '80%' }}>
                      Este gráfico mostra o percentual de docentes que coordenam atividades de extensão, calculado como o total de coordenadores dividido pelo total de docentes.
                    </p>
                    <SemiCircleChart percentage={data.docentes.percentualCoordenadores} label="Docente" color="#FFC107" size={400} value={data.docentes.coordenadores} total={data.docentes.total} showLegend={true} />
                  </div>
                )} style={{ cursor: 'pointer' }}>
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
              <div id="chart-taes-percentual" className="bar-chart-container" style={{ margin: 0, flex: 1, position: 'relative' }}>
                <div className="chart-header" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
                  <h3 style={{ maxWidth: '80%' }}>Percentual TAEs envolvidos em atividades de extensão</h3>
                  <ChartActionMenu chartId="chart-taes-percentual" title="Percentual TAEs" onViewDetails={() => fetchDetails("Detalhes: Percentual de TAEs", (item) => (item.total_tecnicos_envolvidos || 0) > 0, [{ key: 'total_tecnicos_envolvidos', label: 'TAEs Envolvidos' }])} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <SemiCircleChart percentage={data.taes.percentual} label="TAEs" color="#FFC107" size={200} value={data.taes.envolvidos} total={data.taes.total} />
                </div>
                <div className="expand-icon-container" onClick={() => openModal(
                  <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h3 style={{ marginBottom: '20px', fontFamily: 'Manrope', fontWeight: 800, color: '#333' }}>Percentual TAEs envolvidos em atividades de extensão</h3>
                    <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666', maxWidth: '80%' }}>
                      Este gráfico mostra o percentual de TAEs envolvidos em atividades de extensão, calculado como o total de TAEs participantes dividido pelo total de TAEs da universidade.
                    </p>
                    <SemiCircleChart percentage={data.taes.percentual} label="TAEs" color="#FFC107" size={400} value={data.taes.envolvidos} total={data.taes.total} showLegend={true} />
                  </div>
                )} style={{ cursor: 'pointer' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 3V5H19.59L14.29 10.29L15.71 11.71L21 6.41V11H23V3H15Z" fill="#333" />
                    <path d="M3 15V21H9V19H4.41L9.71 13.71L8.29 12.29L3 17.59V13H1V15H3Z" fill="#333" />
                    <path d="M21 13V17.59L15.71 12.29L14.29 13.71L19.59 19H15V21H23V13H21Z" fill="#333" />
                    <path d="M9 3H1V11H3V6.41L8.29 11.71L9.71 10.29L4.41 5H9V3Z" fill="#333" />
                  </svg>
                </div>
              </div>

              {/* tAE Coordenadores */}
              <div id="chart-taes-coordenadores" className="bar-chart-container" style={{ margin: 0, flex: 1, position: 'relative' }}>
                <div className="chart-header" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
                  <h3 style={{ maxWidth: '80%' }}>Percentual TAEs coordenadores</h3>
                  <ChartActionMenu chartId="chart-taes-coordenadores" title="Percentual Coordenadores TAEs" onViewDetails={() => fetchDetails("Detalhes: Percentual de Coordenadores TAEs", (item) => item.numero_coordenadores_taes === 1, [{ key: 'numero_coordenadores_taes', label: 'Coordenadores TAEs' }])} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <SemiCircleChart percentage={data.taes.percentualCoordenadores} label="Docente" color="#FFC107" size={200} value={data.taes.coordenadores} total={data.taes.total} />
                </div>
                <div className="expand-icon-container" onClick={() => openModal(
                  <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h3 style={{ marginBottom: '20px', fontFamily: 'Manrope', fontWeight: 800, color: '#333' }}>Percentual TAEs coordenadores</h3>
                    <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666', maxWidth: '80%' }}>
                      Este gráfico mostra o percentual de TAEs que coordenam atividades de extensão, calculado como o total de coordenadores dividido pelo total de TAEs.
                    </p>
                    <SemiCircleChart percentage={data.taes.percentualCoordenadores} label="Docente" color="#FFC107" size={400} value={data.taes.coordenadores} total={data.taes.total} showLegend={true} />
                  </div>
                )} style={{ cursor: 'pointer' }}>
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


          {lastUpdate && (
            <div className="update-badge">
              Atualizado em: {lastUpdate}
            </div>
          )}


        </div>

        {/* Sidebar */}
        <div className="dashboard-sidebar">
          <FilterSidebar filters={filters} onFilterChange={handleFilterChange} options={filterOptions} />
        </div>

      </div>

      <Footer />
      <Modal content={modalContent} onClose={() => { setModalContent(null); setIsDetailsModalOpen(false); }} />
    </div>
  );
};

export default Dashboard;
