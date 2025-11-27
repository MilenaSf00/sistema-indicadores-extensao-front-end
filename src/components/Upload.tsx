import React, { useState } from 'react';
import '../css/Upload.css';
import { uploadProjects } from '../services/api';

const Upload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith('.csv')) {
      setMessage({ type: 'error', text: 'Por favor, selecione um arquivo CSV.' });
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setMessage(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsLoading(true);
    setMessage(null);

    try {
      await uploadProjects(file);
      setMessage({ type: 'success', text: 'Arquivo enviado com sucesso!' });
      setFile(null);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.response?.data?.detail || error.message || 'Erro ao enviar arquivo.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2 className="upload-title">Upload de Projetos</h2>
        <p className="upload-description">
          Envie o arquivo CSV com os dados dos projetos de extensão. O backend vai normalizar automaticamente os cabeçalhos.
        </p>

        <div className="info-box">
          <span className="info-icon">ℹ️</span>
          <div>
            <strong>Formato Obrigatório:</strong> CSV. Não é necessário se preocupar com o nome exato das colunas.
          </div>
        </div>

        <div className="file-drop-area">
          <input
            type="file"
            className="file-input"
            accept=".csv"
            onChange={handleFileChange}
          />
          <span className="upload-icon">📁</span>
          <p>{file ? file.name : 'Arraste e solte ou clique para selecionar um arquivo CSV'}</p>
        </div>

        <button
          className="upload-button"
          onClick={handleUpload}
          disabled={!file || isLoading}
        >
          {isLoading ? 'Enviando...' : 'Enviar Arquivo'}
        </button>

        {message && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
