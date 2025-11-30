import React from 'react';
import '../css/Filter.css';

import type { FilterOptions } from '../services/api';

interface FilterSidebarProps {
  onFilterChange: (filters: any) => void;
  options?: FilterOptions;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFilterChange, options }) => {
  const handleClearFilters = () => {
    const selects = document.querySelectorAll<HTMLSelectElement>('.filter-sidebar select');
    selects.forEach(select => (select.value = ''));
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

  return (<div className="filter-sidebar">


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
      <select id="area_tematica" defaultValue="" onChange={handleChange}>
        <option value="" disabled>Selecione</option>
        {(options?.area_tematica || []).map((opt, idx) => (
          <option key={idx} value={opt}>{opt}</option>
        ))}
      </select>
    </div>

    <div className="filter-group">
      <label htmlFor="area-conhecimento">Área de Conhecimento</label>
      <select id="area_conhecimento" defaultValue="" onChange={handleChange}>
        <option value="" disabled>Selecione</option>
        {(options?.area_conhecimento || []).map((opt, idx) => (
          <option key={idx} value={opt}>{opt}</option>
        ))}
      </select>
    </div>

    <div className="filter-group">
      <label htmlFor="linha-tematica">Linha Temática</label>
      <select id="linha_tematica" defaultValue="" onChange={handleChange}>
        <option value="" disabled>Selecione</option>
        {(options?.linha_tematica || []).map((opt, idx) => (
          <option key={idx} value={opt}>{opt}</option>
        ))}
      </select>
    </div>

    <div className="filter-group">
      <label htmlFor="modalidade">Modalidade</label>
      <select id="modalidade" defaultValue="" onChange={handleChange}>
        <option value="" disabled>Selecione</option>
        {(options?.modalidade || []).map((opt, idx) => (
          <option key={idx} value={opt}>{opt}</option>
        ))}
      </select>
    </div>

    <div className="filter-group">
      <label htmlFor="situacao">Situação</label>
      <select id="situacao" defaultValue="" onChange={handleChange}>
        <option value="" disabled>Selecione</option>
        {(options?.situacao || []).map((opt, idx) => (
          <option key={idx} value={opt}>{opt}</option>
        ))}
      </select>
    </div>

    <div className="filter-group">
      <label htmlFor="ano">Ano</label>
      <select id="ano" defaultValue="" onChange={handleChange}>
        <option value="" disabled>Selecione</option>
        {(options?.ano || []).map((opt, idx) => (
          <option key={idx} value={opt}>{opt}</option>
        ))}
      </select>
    </div>

    <div className="filter-group">
      <label htmlFor="campus">Campus</label>
      <select id="campus" defaultValue="" onChange={handleChange}>
        <option value="" disabled>Selecione</option>
        {(options?.campus || []).map((opt, idx) => (
          <option key={idx} value={opt}>{opt}</option>
        ))}
      </select>
    </div>

  </div>


  );
};

export default FilterSidebar;
