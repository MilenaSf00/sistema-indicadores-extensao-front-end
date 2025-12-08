import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from 'react-toastify';
import '../css/Dashboard.css';
import FilterSidebar from '../components/filter';
import Footer from '../components/Footer';
import { getIndicators, getFilterOptions, getActionsDetails, type FilterOptions, type ActionDetail } from '../services/api';
import { CustomBarChart, SemiCircleChart, StatCard, CustomDonutChart } from './ChartComponents';
import { SkeletonBarChart, SkeletonCard, SkeletonCircleChart, SkeletonSemiCircle, SkeletonText } from './SkeletonComponents';
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
    ativos: number;
  };
  taes: {
    percentual: number;
    percentualCoordenadores: number;
    total: number;
    envolvidos: number;
    coordenadores: number;
    ativos: number;
  };
  equipeExecutora: {
    data: ChartData[];
    totalUnica: number;
  };
}

const ChartActionMenu = ({ chartId, title, onViewDetails }: { chartId: string, title: string, onViewDetails?: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDownload = async (format: 'png' | 'jpeg') => {
    setIsOpen(false);
    const formatLabel = format.toUpperCase();
    const toastId = toast.loading(`Gerando imagem ${formatLabel}...`);

    const element = document.getElementById(chartId);
    if (!element) {
      toast.update(toastId, { render: 'Elemento não encontrado', type: 'error', isLoading: false, autoClose: 3000 });
      return;
    }

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

      toast.update(toastId, { render: `Download ${formatLabel} concluído!`, type: 'success', isLoading: false, autoClose: 3000 });
    } catch (e) {
      console.error(e);
      toast.update(toastId, { render: `Erro ao exportar ${formatLabel}`, type: 'error', isLoading: false, autoClose: 4000 });
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
    </div>
  );
};
const Modal = ({ content, onClose }: { content: React.ReactNode, onClose: () => void }) => {
  if (!content) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{
          backgroundColor: 'white',
          padding: '50px 20px 20px 20px', // Increased top padding for close button
          borderRadius: '8px',
          width: '95%',         // ocupa 95% da tela
          maxWidth: '1200px',   // largura máxima aumentada
          height: '90%',        // altura da modal
          maxHeight: '90vh',    // altura máxima da viewport
          overflowY: 'auto',    // rolagem vertical se necessário
          overflowX: 'auto',    // rolagem horizontal se necessário
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '20px',
            background: 'none',
            border: 'none',
            fontSize: '32px',
            fontWeight: 'bold',
            cursor: 'pointer',
            zIndex: 1001,
            color: '#333',
            lineHeight: 1,
            padding: '5px',
          }}
        >
          ×
        </button>


        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
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
    const toastId = toast.loading('Gerando arquivo CSV...');

    try {
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

      toast.update(toastId, { render: 'Download CSV concluído!', type: 'success', isLoading: false, autoClose: 3000 });
    } catch (error) {
      console.error('Erro ao gerar CSV:', error);
      toast.update(toastId, { render: 'Erro ao exportar CSV', type: 'error', isLoading: false, autoClose: 4000 });
    }
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
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state for Skeletons

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
      // Show skeleton loading state
      openModal(
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <SkeletonText width="300px" height="28px" />
            <div style={{ display: 'flex', gap: '10px' }}>
              <SkeletonText width="200px" height="36px" />
              <SkeletonText width="120px" height="36px" />
            </div>
          </div>
          <SkeletonText width="150px" height="16px" />
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
              <div key={i} style={{ display: 'flex', gap: '15px' }}>
                <SkeletonText width="25%" height="20px" />
                <SkeletonText width="15%" height="20px" />
                <SkeletonText width="15%" height="20px" />
                <SkeletonText width="15%" height="20px" />
                <SkeletonText width="10%" height="20px" />
                <SkeletonText width="10%" height="20px" />
              </div>
            ))}
          </div>
        </div>
      );
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
    const toastId = toast.loading('Gerando arquivo PDF...');

    await new Promise(r => setTimeout(r, 100));

    try {
      const element = document.querySelector('.dashboard-main') as HTMLElement;
      if (!element) throw new Error('Elemento do dashboard não encontrado.');

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
      console.error('Erro ao gerar PDF:', error);
      toast.update(toastId, { render: 'Erro ao exportar PDF', type: 'error', isLoading: false, autoClose: 4000 });
    } finally {
      setIsGeneratingPDF(false);
    }
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
      setIsLoading(true);

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
            coordenadores: apiData.numero_coordenadores_docentes,
            ativos: apiData.ativo_docentes || apiData.total_docentes
          },
          taes: {
            percentual: apiData.percentual_taes || (apiData.total_taes ? (apiData.total_tecnicos_envolvidos / apiData.total_taes) * 100 : 0),
            percentualCoordenadores: apiData.percentual_coordenadores_taes,
            total: apiData.total_taes,
            envolvidos: apiData.total_tecnicos_envolvidos,
            coordenadores: apiData.numero_coordenadores_taes,
            ativos: apiData.ativo_taes || apiData.total_taes
          },
          equipeExecutora: {
            data: [
              { name: 'Técnicos', value: apiData.equipe_executora_tecnicos || 0, color: '#9C27B0' },
              { name: 'Discentes', value: apiData.equipe_executora_discentes || 0, color: '#FFC107' },
              { name: 'Docentes', value: apiData.equipe_executora_docentes || 0, color: '#1565C0' },
              { name: 'Externos', value: apiData.equipe_executora_externos || 0, color: '#4CAF50' },
            ],
            totalUnica: apiData.equipe_executora_total_unica || 0
          }
        };

        setData(dashboardData);
        setIsLoading(false); // Disable initial generic loading if it was used
      } catch (error) {
        console.error("Erro ao buscar indicadores:", error);
      } finally {
        setIsLoading(false);
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

  // Error state: not loading but no data
  if (!data && !isLoading) return <div style={{ padding: '20px', textAlign: 'center' }}>Erro ao carregar dados. Por favor, recarregue a página.</div>;

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
          {/* ═══════════════════════════════════════════════════════════════
              SEÇÃO: Ações de Extensão
              ═══════════════════════════════════════════════════════════════ */}
          <div className="section-wrapper">
            <div className="section-divider section-divider--acoes">
              <div className="section-divider-label">
                <div className="icon-circle">
                  {/* Ícone: Gráfico de barras - representa métricas/ações */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 3V21H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7 16V12M11 16V8M15 16V14M19 16V10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                Ações de Extensão
              </div>
            </div>
            <div className="section-container">
              <div className="stats-section-vertical" style={{ position: 'relative' }}>
                <button className="download-pdf" onClick={handleDownloadPDF} disabled={isGeneratingPDF}>
                  {isGeneratingPDF ? 'Gerando...' : 'Download PDF'}
                </button>
                <div className="chart-decoration-wrapper">
                  <div className="chart-dec-tab tab-yellow"></div>
                  <div className="chart-dec-tab tab-red"></div>
                  <div className="chart-dec-tab tab-blue"></div>
                  <div className="chart-dec-tab tab-green"></div>
                  <div className="chart-dec-tab tab-yellow-bottom"></div>
                  <div id="chart-acoes-extensao" className="bar-chart-container" style={{ margin: 0, width: '100%', height: '420px', position: 'relative', zIndex: 2 }}>
                    {isLoading ? (
                      <SkeletonBarChart />
                    ) : (
                      <div className="bar-chart-content">
                        <div className="chart-header" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                          <h3>Número de Ações de Extensão</h3>
                          <ChartActionMenu chartId="chart-acoes-extensao" title="Numero de Acoes de Extensao" onViewDetails={() => fetchDetails("Detalhes: Número de Ações de Extensão")} />
                        </div>
                        <CustomBarChart data={data!.acoesPorCidade} height={300} />
                        <div className="expand-icon-container" onClick={() => openModal(
                          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h3 style={{ marginBottom: '20px', fontFamily: 'Manrope', fontWeight: 800, color: '#333' }}>Número de Ações de Extensão</h3>
                            <CustomBarChart data={data!.acoesPorCidade} height={500} />
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
                    )}
                  </div>
                </div>
                <div className="stats-row-horizontal" style={{ marginTop: '20px', display: 'flex', gap: '15px', justifyContent: 'space-between' }}>
                  {isLoading ? (
                    <>
                      <SkeletonCard />
                      <SkeletonCard />
                      <SkeletonCard />
                    </>
                  ) : (
                    <>
                      <StatCard value={data!.acoesExecucao} title="N° de Ações de Extensão em Execução" color="#0D3887" borderColor="#0D3887" />
                      <StatCard value={data!.acoesExecutadas} title="N° de Ações de Extensão Executadas" color="#0D3887" borderColor="#0D3887" />
                      <StatCard value={data!.eventosAcademicos} title="N° de Eventos Acadêmicos" color="#0D3887" borderColor="#0D3887" />
                    </>
                  )}
                </div>
              </div>
              <div className="stats-row-wide" style={{ marginTop: '40px', alignItems: 'stretch' }}>
                <div id="chart-equipe-executora" className="bar-chart-container" style={{ flex: 2, margin: 0, width: 'auto', height: '420px', position: 'relative' }}>
                  {isLoading ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%', height: '100%' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <SkeletonText width="150px" />
                        <SkeletonText width="150px" />
                        <SkeletonText width="150px" />
                        <SkeletonText width="150px" />
                      </div>
                      <SkeletonCircleChart size={280} isDonut={true} />
                    </div>
                  ) : (
                    <div className="bar-chart-content">
                      <div className="chart-header" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                        <h3 style={{ maxWidth: '90%' }}>Número de pessoas participantes de projetos de extensão executados (Equipe executora)</h3>
                        <ChartActionMenu chartId="chart-equipe-executora" title="Equipe Executora" />
                      </div>
                      <div className="row-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                        <div className="chart-legend-left">
                          {data!.equipeExecutora.data.map((item, idx) => (
                            <div key={idx} className="legend-item" style={{ marginBottom: '12px' }}>
                              <span className="legend-dot" style={{ backgroundColor: item.color, width: '15px', height: '15px' }}></span>
                              {item.name}: <strong>{item.value.toLocaleString('pt-BR')}</strong>
                            </div>
                          ))}
                        </div>
                        <div className="donut-chart-wrapper" style={{ marginRight: '50px' }}>
                          <CustomDonutChart
                            data={data!.equipeExecutora.data}
                            size={280}
                          />
                        </div>
                      </div>
                      <div className="expand-icon-container" onClick={() => openModal(
                        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <h3 style={{ marginBottom: '20px', fontFamily: 'Manrope', fontWeight: 800, color: '#333' }}>Número de pessoas participantes de projetos de extensão executados</h3>
                          <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666', maxWidth: '80%' }}>
                            Este gráfico mostra a distribuição da equipe executora de projetos de extensão finalizados. O valor do badge representa o total de pessoas únicas (sem repetição).
                          </p>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '40px', width: '100%' }}>
                            <div className="chart-legend-left">
                              {data!.equipeExecutora.data.map((item, idx) => (
                                <div key={idx} className="legend-item" style={{ marginBottom: '12px', fontSize: '16px' }}>
                                  <span className="legend-dot" style={{ backgroundColor: item.color, width: '20px', height: '20px' }}></span>
                                  {item.name}: <strong>{item.value.toLocaleString('pt-BR')}</strong>
                                </div>
                              ))}
                            </div>
                            <CustomDonutChart
                              data={data!.equipeExecutora.data}
                              size={450}
                            />
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
                  )}
                  {!isLoading && (
                    <div className="pie-total-badge">
                      <span className="total-label">Total Único</span>
                      <span className="total-value">{data!.equipeExecutora.totalUnica.toLocaleString('pt-BR')}</span>
                    </div>
                  )}
                </div>
                <div className="stats-column" style={{ flex: 1, justifyContent: 'center', maxWidth: '300px' }}>
                  {isLoading ? (
                    <SkeletonCard minHeight="250px" />
                  ) : (
                    <div className="stat-card-green">
                      <div className="stat-value">{data!.totalPessoas}</div>
                      <div className="stat-label">N° de pessoas da comunidade externa</div>
                    </div>
                  )}
                </div>
              </div>



              <div className="stats-row-wide" style={{ marginTop: '40px', flexDirection: 'column' }}>
                {/* Modalidade */}
                <div id="chart-modalidade" className="bar-chart-container" style={{ margin: 0, width: '100%', height: '380px', position: 'relative' }}>
                  {isLoading ? (
                    <SkeletonBarChart />
                  ) : (
                    <div className="bar-chart-content">
                      <div className="chart-header" style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                        <h3>Ações por modalidade</h3>
                        <ChartActionMenu chartId="chart-modalidade" title="Acoes por Modalidade" onViewDetails={() => fetchDetails("Detalhes: Ações por Modalidade")} />
                      </div>
                      <CustomBarChart data={data!.acoesPorModalidade} height={250} barColor="#278837" />
                      <div className="expand-icon-container" onClick={() => openModal(
                        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <h3 style={{ marginBottom: '20px', fontFamily: 'Manrope', fontWeight: 800, color: '#333' }}>Ações por modalidade</h3>
                          <CustomBarChart data={data!.acoesPorModalidade} height={500} barColor="#278837" />
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
                  )}
                </div>

                {/* Área Temática */}
                <div id="chart-area-tematica" className="bar-chart-container" style={{ margin: 0, width: '100%', height: '420px', position: 'relative' }}>
                  {isLoading ? (
                    <SkeletonBarChart />
                  ) : (
                    <div className="bar-chart-content">
                      <div className="chart-header" style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                        <h3>Ações por Área Temática</h3>
                        <ChartActionMenu chartId="chart-area-tematica" title="Acoes por Area Tematica" onViewDetails={() => fetchDetails("Detalhes: Ações por Área Temática")} />
                      </div>
                      <CustomBarChart data={data!.acoesPorArea} height={300} barColor="#278837" />
                      <div className="expand-icon-container" onClick={() => openModal(
                        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <h3 style={{ marginBottom: '20px', fontFamily: 'Manrope', fontWeight: 800, color: '#333' }}>Ações por Área Temática</h3>
                          <CustomBarChart data={data!.acoesPorArea} height={500} barColor="#278837" />
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
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* ═══════════════════════════════════════════════════════════════
              SEÇÃO: Indicadores de Discentes
              ═══════════════════════════════════════════════════════════════ */}
          <div className="section-wrapper">
            <div className="section-divider section-divider--discentes">
              <div className="section-divider-label">
                <div className="icon-circle">
                  {/* Ícone: Capelo/Formatura - representa estudantes */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3L1 9L5 11.18V17.18C5 17.18 5 21 12 21C19 21 19 17.18 19 17.18V11.18L21 10.09V17H23V9L12 3Z" stroke="white" strokeWidth="1.5" fill="none" />
                    <path d="M12 3L1 9L12 15L23 9L12 3Z" fill="white" opacity="0.9" />
                  </svg>
                </div>
                Indicadores de Discentes
              </div>
            </div>
            <div className="section-container">
              <div className="stats-section-vertical">
                <div id="chart-discentes-percentual" className="bar-chart-container" style={{ margin: 0, width: '100%', height: '250px', marginBottom: '30px', position: 'relative' }}>
                  {isLoading ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%' }}>
                      <SkeletonText width="60%" height="24px" />
                      <div style={{ margin: '20px 0' }}>
                        <SkeletonSemiCircle />
                      </div>
                    </div>
                  ) : (
                    <div className="bar-chart-content" style={{ alignItems: 'center' }}>
                      <div className="chart-header" style={{ width: '100%', marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                        <h3>Percentual de discentes envolvidos em atividades de extensão</h3>
                        <ChartActionMenu chartId="chart-discentes-percentual" title="Percentual Discentes" onViewDetails={() => fetchDetails("Detalhes: Percentual de Discentes", (item) => (item.numero_discentes_envolvidos || 0) > 0, [{ key: 'numero_discentes_envolvidos', label: 'Discentes Envolvidos' }])} />
                      </div>
                      <SemiCircleChart percentage={data!.discentes.percentual} label="Discente" color="#FFC107" value={data!.discentes.envolvidos} total={data!.discentes.total} />
                      <div className="expand-icon-container" onClick={() => openModal(
                        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <h3 style={{ marginBottom: '20px', fontFamily: 'Manrope', fontWeight: 800, color: '#333' }}>Percentual de discentes envolvidos em atividades de extensão</h3>
                          <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666', maxWidth: '80%' }}>
                            Este gráfico mostra o percentual de discentes envolvidos em atividades de extensão, calculado como o total de discentes participantes dividido pelo total de discentes da universidade.
                          </p>
                          <SemiCircleChart percentage={data!.discentes.percentual} label="Discente" color="#FFC107" size={400} value={data!.discentes.envolvidos} total={data!.discentes.total} showLegend={true} />
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
                  )}
                </div>

                {/* Cards */}
                <div className="stats-row-horizontal" style={{ marginBottom: '40px' }}>
                  {isLoading ? (
                    <>
                      <SkeletonCard />
                      <SkeletonCard />
                      <SkeletonCard />
                    </>
                  ) : (
                    <>
                      <StatCard value={data!.discentes.total} title="Total de Discentes na Universidade" color="#0D3887" borderColor="#0D3887" />
                      <StatCard value={data!.discentes.envolvidos} title="Discentes envolvidos em ações de extensão" color="#0D3887" borderColor="#0D3887" />
                      <StatCard value={data!.discentes.bolsistas} title="N° de Discentes Bolsistas" color="#0D3887" borderColor="#0D3887" />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* ═══════════════════════════════════════════════════════════════
              SEÇÃO: Indicadores de Docentes
              ═══════════════════════════════════════════════════════════════ */}
          <div className="section-wrapper">
            <div className="section-divider section-divider--docentes">
              <div className="section-divider-label">
                <div className="icon-circle">
                  {/* Ícone: Apresentação/Quadro - representa professores */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H20V16H4V4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <path d="M8 20L12 16L16 20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 4H22" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M7 9H12M7 12H17" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                Indicadores de Docentes
              </div>
            </div>
            <div className="section-container">

              <div className="stats-section-vertical">
                <div style={{ display: 'flex', gap: '30px', width: '100%', marginBottom: '30px' }}>
                  {/*Docent Envolvidos */}
                  <div id="chart-docentes-percentual" className="bar-chart-container" style={{ margin: 0, flex: 1, height: '250px', position: 'relative' }}>
                    {isLoading ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%' }}>
                        <SkeletonText width="80%" height="24px" />
                        <div style={{ margin: '20px 0' }}>
                          <SkeletonSemiCircle size={200} />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="chart-header" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
                          <h3 style={{ maxWidth: '80%' }}>Percentual de docentes envolvidos em atividades de extensão</h3>
                          <ChartActionMenu chartId="chart-docentes-percentual" title="Percentual Docentes" onViewDetails={() => fetchDetails("Detalhes: Percentual de Docentes", (item) => (item.numero_docentes_envolvidos || 0) > 0, [{ key: 'numero_docentes_envolvidos', label: 'Docentes Envolvidos' }])} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                          <SemiCircleChart percentage={data!.docentes.percentual} label="Docente" color="#FFC107" size={200} value={data!.docentes.envolvidos} total={data!.docentes.total} />
                        </div>
                        <div className="expand-icon-container" onClick={() => openModal(
                          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h3 style={{ marginBottom: '20px', fontFamily: 'Manrope', fontWeight: 800, color: '#333' }}>Percentual de docentes envolvidos em atividades de extensão</h3>
                            <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666', maxWidth: '80%' }}>
                              Este gráfico mostra o percentual de docentes envolvidos em atividades de extensão, calculado como o total de docentes participantes dividido pelo total de docentes da universidade.
                            </p>
                            <SemiCircleChart percentage={data!.docentes.percentual} label="Docente" color="#FFC107" size={400} value={data!.docentes.envolvidos} total={data!.docentes.total} showLegend={true} />
                          </div>
                        )} style={{ cursor: 'pointer' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 3V5H19.59L14.29 10.29L15.71 11.71L21 6.41V11H23V3H15Z" fill="#333" />
                            <path d="M3 15V21H9V19H4.41L9.71 13.71L8.29 12.29L3 17.59V13H1V15H3Z" fill="#333" />
                            <path d="M21 13V17.59L15.71 12.29L14.29 13.71L19.59 19H15V21H23V13H21Z" fill="#333" />
                            <path d="M9 3H1V11H3V6.41L8.29 11.71L9.71 10.29L4.41 5H9V3Z" fill="#333" />
                          </svg>
                        </div>
                      </>
                    )}
                  </div>
                  {/*Coordenadores */}
                  <div id="chart-docentes-coordenadores" className="bar-chart-container" style={{ margin: 0, flex: 1, height: '250px', position: 'relative' }}>
                    {isLoading ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%' }}>
                        <SkeletonText width="80%" height="24px" />
                        <div style={{ margin: '20px 0' }}>
                          <SkeletonSemiCircle size={200} />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="chart-header" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
                          <h3 style={{ maxWidth: '80%' }}>Percentual de coordenadores docentes</h3>
                          <ChartActionMenu chartId="chart-docentes-coordenadores" title="Percentual Coordenadores Docentes" onViewDetails={() => fetchDetails("Detalhes: Percentual de Coordenadores Docentes", (item) => item.numero_coordenadores_docentes === 1, [{ key: 'numero_coordenadores_docentes', label: 'Coordenadores Docentes' }])} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                          <SemiCircleChart percentage={data!.docentes.percentualCoordenadores} label="Docente" color="#FFC107" size={200} value={data!.docentes.coordenadores} total={data!.docentes.total} />
                        </div>
                        <div className="expand-icon-container" onClick={() => openModal(
                          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h3 style={{ marginBottom: '20px', fontFamily: 'Manrope', fontWeight: 800, color: '#333' }}>Percentual de coordenadores docentes</h3>
                            <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666', maxWidth: '80%' }}>
                              Este gráfico mostra o percentual de docentes que coordenam atividades de extensão, calculado como o total de coordenadores dividido pelo total de docentes.
                            </p>
                            <SemiCircleChart percentage={data!.docentes.percentualCoordenadores} label="Docente" color="#FFC107" size={400} value={data!.docentes.coordenadores} total={data!.docentes.total} showLegend={true} />
                          </div>
                        )} style={{ cursor: 'pointer' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 3V5H19.59L14.29 10.29L15.71 11.71L21 6.41V11H23V3H15Z" fill="#333" />
                            <path d="M3 15V21H9V19H4.41L9.71 13.71L8.29 12.29L3 17.59V13H1V15H3Z" fill="#333" />
                            <path d="M21 13V17.59L15.71 12.29L14.29 13.71L19.59 19H15V21H23V13H21Z" fill="#333" />
                            <path d="M9 3H1V11H3V6.41L8.29 11.71L9.71 10.29L4.41 5H9V3Z" fill="#333" />
                          </svg>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                {/* Cards */}
                <div className="stats-row-horizontal" style={{ marginBottom: '40px' }}>
                  {isLoading ? (
                    <>
                      <SkeletonCard />
                      <SkeletonCard />
                      <SkeletonCard />
                    </>
                  ) : (
                    <>
                      <StatCard value={data!.docentes.ativos} title="Total de Docentes na Universidade" color="#278837" borderColor="#278837" />
                      <StatCard value={data!.docentes.envolvidos} title="Docentes envolvidos em ações de extensão" color="#0D3887" borderColor="#0D3887" />
                      <StatCard value={data!.docentes.coordenadores} title="N° de Docentes Coordenadores de Projetos" color="#0D3887" borderColor="#0D3887" />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* ═══════════════════════════════════════════════════════════════
              SEÇÃO: Indicadores de TAEs (Técnicos Administrativos)
              ═══════════════════════════════════════════════════════════════ */}
          <div className="section-wrapper">
            <div className="section-divider section-divider--taes">
              <div className="section-divider-label">
                <div className="icon-circle">
                  {/* Ícone: Crachá/Badge - representa funcionários */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="4" width="16" height="18" rx="2" stroke="white" strokeWidth="2" fill="none" />
                    <circle cx="12" cy="10" r="3" stroke="white" strokeWidth="1.5" fill="none" />
                    <path d="M7 18C7 15.5 9 14 12 14C15 14 17 15.5 17 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M9 2V4M15 2V4" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                Indicadores de TAEs
              </div>
            </div>
            <div className="section-container">

              <div className="stats-section-vertical">
                <div style={{ display: 'flex', gap: '30px', width: '100%', marginBottom: '30px' }}>
                  {/*TAe nvolvidos */}
                  <div id="chart-taes-percentual" className="bar-chart-container" style={{ margin: 0, flex: 1, height: '250px', position: 'relative' }}>
                    {isLoading ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%' }}>
                        <SkeletonText width="80%" height="24px" />
                        <div style={{ margin: '20px 0' }}>
                          <SkeletonSemiCircle size={200} />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="chart-header" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
                          <h3 style={{ maxWidth: '80%' }}>Percentual TAEs envolvidos em atividades de extensão</h3>
                          <ChartActionMenu chartId="chart-taes-percentual" title="Percentual TAEs" onViewDetails={() => fetchDetails("Detalhes: Percentual de TAEs", (item) => (item.total_tecnicos_envolvidos || 0) > 0, [{ key: 'total_tecnicos_envolvidos', label: 'TAEs Envolvidos' }])} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                          <SemiCircleChart percentage={data!.taes.percentual} label="TAEs" color="#FFC107" size={200} value={data!.taes.envolvidos} total={data!.taes.total} />
                        </div>
                        <div className="expand-icon-container" onClick={() => openModal(
                          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h3 style={{ marginBottom: '20px', fontFamily: 'Manrope', fontWeight: 800, color: '#333' }}>Percentual TAEs envolvidos em atividades de extensão</h3>
                            <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666', maxWidth: '80%' }}>
                              Este gráfico mostra o percentual de TAEs envolvidos em atividades de extensão, calculado como o total de TAEs participantes dividido pelo total de TAEs da universidade.
                            </p>
                            <SemiCircleChart percentage={data!.taes.percentual} label="TAEs" color="#FFC107" size={400} value={data!.taes.envolvidos} total={data!.taes.total} showLegend={true} />
                          </div>
                        )} style={{ cursor: 'pointer' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 3V5H19.59L14.29 10.29L15.71 11.71L21 6.41V11H23V3H15Z" fill="#333" />
                            <path d="M3 15V21H9V19H4.41L9.71 13.71L8.29 12.29L3 17.59V13H1V15H3Z" fill="#333" />
                            <path d="M21 13V17.59L15.71 12.29L14.29 13.71L19.59 19H15V21H23V13H21Z" fill="#333" />
                            <path d="M9 3H1V11H3V6.41L8.29 11.71L9.71 10.29L4.41 5H9V3Z" fill="#333" />
                          </svg>
                        </div>
                      </>
                    )}
                  </div>

                  {/* tAE Coordenadores */}
                  <div id="chart-taes-coordenadores" className="bar-chart-container" style={{ margin: 0, flex: 1, height: '250px', position: 'relative' }}>
                    {isLoading ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%' }}>
                        <SkeletonText width="80%" height="24px" />
                        <div style={{ margin: '20px 0' }}>
                          <SkeletonSemiCircle size={200} />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="chart-header" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
                          <h3 style={{ maxWidth: '80%' }}>Percentual TAEs coordenadores</h3>
                          <ChartActionMenu chartId="chart-taes-coordenadores" title="Percentual Coordenadores TAEs" onViewDetails={() => fetchDetails("Detalhes: Percentual de Coordenadores TAEs", (item) => item.numero_coordenadores_taes === 1, [{ key: 'numero_coordenadores_taes', label: 'Coordenadores TAEs' }])} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                          <SemiCircleChart percentage={data!.taes.percentualCoordenadores} label="Docente" color="#FFC107" size={200} value={data!.taes.coordenadores} total={data!.taes.total} />
                        </div>
                        <div className="expand-icon-container" onClick={() => openModal(
                          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h3 style={{ marginBottom: '20px', fontFamily: 'Manrope', fontWeight: 800, color: '#333' }}>Percentual TAEs coordenadores</h3>
                            <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666', maxWidth: '80%' }}>
                              Este gráfico mostra o percentual de TAEs que coordenam atividades de extensão, calculado como o total de coordenadores dividido pelo total de TAEs.
                            </p>
                            <SemiCircleChart percentage={data!.taes.percentualCoordenadores} label="Docente" color="#FFC107" size={400} value={data!.taes.coordenadores} total={data!.taes.total} showLegend={true} />
                          </div>
                        )} style={{ cursor: 'pointer' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 3V5H19.59L14.29 10.29L15.71 11.71L21 6.41V11H23V3H15Z" fill="#333" />
                            <path d="M3 15V21H9V19H4.41L9.71 13.71L8.29 12.29L3 17.59V13H1V15H3Z" fill="#333" />
                            <path d="M21 13V17.59L15.71 12.29L14.29 13.71L19.59 19H15V21H23V13H21Z" fill="#333" />
                            <path d="M9 3H1V11H3V6.41L8.29 11.71L9.71 10.29L4.41 5H9V3Z" fill="#333" />
                          </svg>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Cards */}
                <div className="stats-row-horizontal" style={{ marginBottom: '40px' }}>
                  {isLoading ? (
                    <>
                      <SkeletonCard />
                      <SkeletonCard />
                      <SkeletonCard />
                    </>
                  ) : (
                    <>
                      <StatCard value={data!.taes.ativos} title="Total de TAEs na Universidade" color="#278837" borderColor="#278837" />
                      <StatCard value={data!.taes.envolvidos} title="TAEs envolvidos em ações de extensão" color="#0D3887" borderColor="#0D3887" />
                      <StatCard value={data!.taes.coordenadores} title="N° de TAEs coordenadores" color="#0D3887" borderColor="#0D3887" />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* ═══ FIM DAS SEÇÕES ═══ */}
          {lastUpdate && (
            <div className="update-badge" style={{ marginTop: '30px' }}>
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
