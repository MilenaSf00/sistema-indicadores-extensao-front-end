import React from 'react';
import '../css/Filter.css';

import type { FilterOptions } from '../services/api';

interface FilterSidebarProps {
  filters: any;
  onFilterChange: (filters: any) => void;
  options?: FilterOptions;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange, options }) => {
  const handleClearFilters = () => {
    onFilterChange({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    const currentValues = filters[id] ? (Array.isArray(filters[id]) ? filters[id] : [filters[id]]) : [];

    if (!currentValues.includes(value)) {
      onFilterChange({ ...filters, [id]: [...currentValues, value] });
    }
    // Reset select to placeholder
    e.target.value = "";
  };

  const removeFilter = (key: string, valueToRemove: string) => {
    const currentValues = filters[key] as string[];
    const newValues = currentValues.filter(v => v !== valueToRemove);

    const newFilters = { ...filters };
    if (newValues.length > 0) {
      newFilters[key] = newValues;
    } else {
      delete newFilters[key];
    }
    onFilterChange(newFilters);
  };

  const getLabel = (key: string) => {
    const labels: { [key: string]: string } = {
      area_tematica: 'Área Temática',
      area_conhecimento: 'Área de Conhecimento',
      linha_tematica: 'Linha Temática',
      modalidade: 'Modalidade',
      situacao: 'Situação',
      ano: 'Ano',
      campus: 'Campus'
    };
    return labels[key] || key;
  };

  const getPlaceholder = (key: string, defaultText: string) => {
    const values = filters[key];
    if (Array.isArray(values) && values.length > 0) {
      return `${values.length} selecionados`;
    } else if (values && !Array.isArray(values)) {
      return `1 selecionado`;
    }
    return defaultText;
  };

  const isSelected = (key: string, value: string) => {
    const currentValues = filters[key];
    if (Array.isArray(currentValues)) {
      return currentValues.includes(value);
    }
    return currentValues === value;
  };

  const hasFilters = Object.keys(filters).length > 0;

  return (
    <div className="filter-sidebar">
      <div className="filter-header">
        <div className="filter-title">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="#E74B23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" fill="#E74B23" fillOpacity="0.2" />
          </svg>
          FILTROS
        </div>

      </div>

      {hasFilters && (
        <div className="active-filters-container">
          <div className="filter-actions">
            <button className="clear-filters-chip" onClick={handleClearFilters}>
              🗑️ Limpar Filtros
            </button>
          </div>
          {Object.entries(filters).map(([key, values]) => {
            const valArray = Array.isArray(values) ? values : [values];
            return valArray.map((val: string) => (
              <div key={`${key}-${val}`} className="filter-chip">
                <span>{getLabel(key)}: <strong>{val}</strong></span>
                <button
                  className="filter-chip-remove"
                  onClick={() => removeFilter(key, val)}
                  aria-label={`Remover filtro ${getLabel(key)}: ${val}`}
                >
                  ×
                </button>
              </div>
            ));
          })}
        </div>
      )}

      <div className="filter-scroll-container">
        <div className="filter-group">
          <label htmlFor="area_tematica">Área Temática</label>
          <select id="area_tematica" value="" onChange={handleChange}>
            <option value="" disabled>{getPlaceholder('area_tematica', 'Selecione uma área temática...')}</option>
            {(options?.area_tematica || []).map((opt, idx) => (
              <option key={idx} value={opt}>
                {isSelected('area_tematica', opt) ? `✓ ${opt}` : opt}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="area_conhecimento">Área de Conhecimento</label>
          <select id="area_conhecimento" value="" onChange={handleChange}>
            <option value="" disabled>{getPlaceholder('area_conhecimento', 'Selecione uma área de conhecimento...')}</option>
            {(options?.area_conhecimento || []).map((opt, idx) => (
              <option key={idx} value={opt}>
                {isSelected('area_conhecimento', opt) ? `✓ ${opt}` : opt}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="linha_tematica">Linha Temática</label>
          <select id="linha_tematica" value="" onChange={handleChange}>
            <option value="" disabled>{getPlaceholder('linha_tematica', 'Selecione uma linha temática...')}</option>
            {(options?.linha_tematica || []).map((opt, idx) => (
              <option key={idx} value={opt}>
                {isSelected('linha_tematica', opt) ? `✓ ${opt}` : opt}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="modalidade">Modalidade</label>
          <select id="modalidade" value="" onChange={handleChange}>
            <option value="" disabled>{getPlaceholder('modalidade', 'Selecione uma modalidade...')}</option>
            {(options?.modalidade || []).map((opt, idx) => (
              <option key={idx} value={opt}>
                {isSelected('modalidade', opt) ? `✓ ${opt}` : opt}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="situacao">Situação</label>
          <select id="situacao" value="" onChange={handleChange}>
            <option value="" disabled>{getPlaceholder('situacao', 'Selecione uma situação...')}</option>
            {(options?.situacao || []).map((opt, idx) => (
              <option key={idx} value={opt}>
                {isSelected('situacao', opt) ? `✓ ${opt}` : opt}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="ano">Ano</label>
          <select id="ano" value="" onChange={handleChange}>
            <option value="" disabled>{getPlaceholder('ano', 'Selecione um ano...')}</option>
            {(options?.ano || []).map((opt, idx) => (
              <option key={idx} value={opt}>
                {isSelected('ano', opt.toString()) ? `✓ ${opt}` : opt}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="campus">Campus</label>
          <select id="campus" value="" onChange={handleChange}>
            <option value="" disabled>{getPlaceholder('campus', 'Selecione um campus...')}</option>
            {(options?.campus || []).map((opt, idx) => (
              <option key={idx} value={opt}>
                {isSelected('campus', opt) ? `✓ ${opt}` : opt}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
