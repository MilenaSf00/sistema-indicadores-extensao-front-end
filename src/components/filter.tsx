import React from 'react';
import '../css/Filter.css';

const FilterSidebar: React.FC = () => {
  const handleClearFilters = () => {
    const selects = document.querySelectorAll<HTMLSelectElement>('.filter-sidebar select');
    selects.forEach(select => select.value = '');
  };

  return (
    <div className="filter-sidebar">
   
      <button className="clear-filters" onClick={handleClearFilters}>
        Limpar
      </button>

   
      <div className="filter-group">
        <label htmlFor="area-tematica">Área Temática</label>
        <select id="area-tematica">
          <option value="">Todos</option>
          <option value="tema1">Tema 1</option>
          <option value="tema2">Tema 2</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="area-conhecimento">Área de Conhecimento</label>
        <select id="area-conhecimento">
          <option value="">Todos</option>
          <option value="exatas">Exatas</option>
          <option value="humanas">Humanas</option>
          <option value="saude">Saúde</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="linha-tematica">Linha Temática</label>
        <select id="linha-tematica">
          <option value="">Todos</option>
          <option value="linha1">Linha 1</option>
          <option value="linha2">Linha 2</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="modalidade">Modalidade</label>
        <select id="modalidade">
          <option value="">Todos</option>
          <option value="presencial">Presencial</option>
          <option value="remoto">Remoto</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="situacao">Situação</label>
        <select id="situacao">
          <option value="">Todos</option>
          <option value="ativa">Ativa</option>
          <option value="concluida">Concluída</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="ano">Ano</label>
        <select id="ano">
          <option value="">Todos</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="campus">Campus</label>
        <select id="campus">
          <option value="">Todos</option>
          <option value="alegrete">Alegrete</option>
          <option value="bagé">Bagé</option>
        </select>
      </div>

      
    </div>
  );
};

export default FilterSidebar;
