import React from 'react';
import '../css/Filter.css';

interface FilterSidebarProps {
  onFilterChange: (filters: any) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFilterChange }) => {
  const handleClearFilters = () => {
    const selects = document.querySelectorAll<HTMLSelectElement>('.filter-sidebar select');
    selects.forEach(select => select.value = '');
    onFilterChange({});
  };

  const handleChange = () => {
    const filters: any = {};
    const selects = document.querySelectorAll<HTMLSelectElement>('.filter-sidebar select');
    selects.forEach(select => {
      if (select.value) {
        filters[select.id] = select.value;
      }
    });
    onFilterChange(filters);
  };

  return (
    <div className="filter-sidebar">

      <div className="filter-header">
        <div className="filter-title">
          {/* Funnel Icon SVG */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="#E74B23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" fill="#E74B23" fillOpacity="0.2" />
          </svg>
          FILTROS
        </div>
        <button className="clear-filters-btn" onClick={handleClearFilters}>
          🗑️ Limpar
        </button>
      </div>

      <div className="filter-group">
        <label htmlFor="area-tematica">Área Temática</label>
        <select id="area-tematica" defaultValue="" onChange={handleChange}>
          <option value="" disabled>Selecione</option>
          <option value="tema1">Educação</option>
          <option value="tema2">Saúde</option>
          <option value="tema3">Tecnologia</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="area-conhecimento">Área de Conhecimento</label>
        <select id="area-conhecimento" defaultValue="" onChange={handleChange}>
          <option value="" disabled>Selecione</option>
          <option value="exatas">Ciências Exatas</option>
          <option value="humanas">Ciências Humanas</option>
          <option value="saude">Ciências da Saúde</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="linha-tematica">Linha Temática</label>
        <select id="linha-tematica" defaultValue="" onChange={handleChange}>
          <option value="" disabled>Selecione</option>
          <option value="linha1">Linha 1</option>
          <option value="linha2">Linha 2</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="modalidade">Modalidade</label>
        <select id="modalidade" defaultValue="" onChange={handleChange}>
          <option value="" disabled>Selecione</option>
          <option value="presencial">Presencial</option>
          <option value="remoto">Remoto</option>
          <option value="hibrido">Híbrido</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="situacao">Situação</label>
        <select id="situacao" defaultValue="" onChange={handleChange}>
          <option value="" disabled>Selecione</option>
          <option value="ativa">Em Execução</option>
          <option value="concluida">Concluída</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="ano">Ano</label>
        <select id="ano" defaultValue="" onChange={handleChange}>
          <option value="" disabled>Selecione</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="campus">Campus</label>
        <select id="campus" defaultValue="" onChange={handleChange}>
          <option value="" disabled>Selecione</option>
          <option value="alegrete">Alegrete</option>
          <option value="bage">Bagé</option>
          <option value="uruguaiana">Uruguaiana</option>
        </select>
      </div>

    </div>
  );
};

export default FilterSidebar;
