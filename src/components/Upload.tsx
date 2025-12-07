import React, { useState, useEffect } from 'react';
import '../css/Upload.css';
import {
  clearData,
  uploadProjetos,
  uploadDocentes,
  uploadTaes,
  uploadParticipantes,
  uploadBolsistas,
  uploadTotalAlunos,
  processData
} from '../services/api';

interface UploadMessage {
  type: 'success' | 'error';
  text: string;
}

interface UploadResponse {
  message: string;
  files: string[];
}

interface HistoryItem {
  timestamp: string;
  files: string[];
}

const SPREADSHEET_INFO = [
  {
    name: "Projetos",
    file: "16004_SAP",
    columns: ["id_projeto", "modalidade", "unidade origem", "titulo", "area conhecimento", "area tematica", "linha tematica", "pessoas atendidas", "coord. projeto", "e-mail coord. projeto", "dt. início proj.", "dt. fim proj.", "situacao", "Últ. alter. proj.", "palavras chave", "resumo", "parcerias", "autoriza publicação resumo"]
  },
  {
    name: "Total de Alunos",
    file: "17044_SAP",
    columns: ["campus", "nível", "turno", "código", "curso", "modalidade", "tipo curso", "alunos"]
  },
  {
    name: "Bolsistas",
    file: "15684_SAP",
    columns: ["nome do bolsista", "curso do bolsista", "Área de conhecimento", "edital", "ano"]
  },
  {
    name: "Participantes",
    file: "14955_SAP",
    columns: ["campus", "curso", "projeto", "nr. docentes", "docentes", "nr. discentes", "discentes", "nr. técnicos", "técnicos", "nr. colaboradores externos", "colaboradores externos", "nr. entidades/instituições parceiras", "entidades/instituições parceiras"]
  },
  {
    name: "Docentes",
    file: "13284_docentes",
    columns: ["docente", "mail", "cursos", "escolaridade", "data de ingresso", "data de saida"]
  },
  {
    name: "TAEs",
    file: "17444_SAP",
    columns: ["nome", "e-mail", "campus", "data_ingresso", "data_saida"]
  }
];

const Upload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState<UploadMessage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [processedFiles, setProcessedFiles] = useState<string[]>([]);
  const [uploadHistory, setUploadHistory] = useState<HistoryItem[]>([]);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const [expandedInfo, setExpandedInfo] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    // Recupera histórico do localStorage ao carregar a página
    const storedHistory = localStorage.getItem('uploadHistory');
    if (storedHistory) {
      setUploadHistory(JSON.parse(storedHistory));
    }

    const storedLastUpdate = localStorage.getItem('lastUploadTime');
    if (storedLastUpdate) {
      setLastUpdate(storedLastUpdate);
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const fileList = Array.from(selectedFiles);
    const invalidFiles = fileList.filter(file => !file.name.endsWith('.csv'));

    if (invalidFiles.length > 0) {
      setMessage({ type: 'error', text: 'Por favor, selecione apenas arquivos CSV.' });
      setFiles([]);
      return;
    }

    setFiles(fileList);
    setMessage(null);
    setProcessedFiles([]);
  };

  const handleCancel = () => {
    setFiles([]);
    setMessage(null);
    setProcessedFiles([]);

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleUpload = () => {
    if (files.length === 0) return;
    setShowConfirmModal(true);
  };

  const executeUpload = async (clearExisting: boolean) => {
    setShowConfirmModal(false);
    setIsLoading(true);
    setMessage(null);
    setProcessedFiles([]);

    try {
      if (clearExisting) {
        setMessage({ type: 'success', text: 'Limpando dados antigos...' });
        await clearData();
      }

      // Identificar arquivos
      const fileMap: { [key: string]: File } = {};
      files.forEach(file => {
        const name = file.name.toLowerCase();
        if (name.includes('16004') || name.includes('projetos')) fileMap['projetos'] = file;
        else if (name.includes('13284') || name.includes('docentes')) fileMap['docentes'] = file;
        else if (name.includes('17444') || name.includes('taes')) fileMap['taes'] = file;
        else if (name.includes('14955') || name.includes('participantes')) fileMap['participantes'] = file;
        else if (name.includes('15684') || name.includes('bolsistas')) fileMap['bolsistas'] = file;
        else if (name.includes('17044') || name.includes('total_alunos') || name.includes('total-alunos')) fileMap['total_alunos'] = file;
      });

      const uploadedFilesList: string[] = [];

      // Sequência de Upload
      if (fileMap['projetos']) {
        setMessage({ type: 'success', text: 'Enviando Projetos...' });
        await uploadProjetos(fileMap['projetos']);
        uploadedFilesList.push(fileMap['projetos'].name);
      }

      if (fileMap['docentes']) {
        setMessage({ type: 'success', text: 'Enviando Docentes...' });
        await uploadDocentes(fileMap['docentes']);
        uploadedFilesList.push(fileMap['docentes'].name);
      }

      if (fileMap['taes']) {
        setMessage({ type: 'success', text: 'Enviando TAEs...' });
        await uploadTaes(fileMap['taes']);
        uploadedFilesList.push(fileMap['taes'].name);
      }

      if (fileMap['participantes']) {
        setMessage({ type: 'success', text: 'Enviando Participantes...' });
        await uploadParticipantes(fileMap['participantes']);
        uploadedFilesList.push(fileMap['participantes'].name);
      }

      if (fileMap['bolsistas']) {
        setMessage({ type: 'success', text: 'Enviando Bolsistas...' });
        await uploadBolsistas(fileMap['bolsistas']);
        uploadedFilesList.push(fileMap['bolsistas'].name);
      }

      if (fileMap['total_alunos']) {
        setMessage({ type: 'success', text: 'Enviando Total de Alunos...' });
        await uploadTotalAlunos(fileMap['total_alunos']);
        uploadedFilesList.push(fileMap['total_alunos'].name);
      }

      // Processamento Final
      setMessage({ type: 'success', text: 'Processando dados e gerando indicadores...' });
      const result = await processData();

      const now = new Date();
      const timestamp = now.toLocaleString('pt-BR');

      setMessage({
        type: 'success',
        text: result.message || 'Todos os arquivos foram processados com sucesso!'
      });

      if (uploadedFilesList.length > 0) {
        setProcessedFiles(uploadedFilesList);

        // Atualiza histórico
        const newHistory = [{ timestamp, files: uploadedFilesList }, ...uploadHistory];
        setUploadHistory(newHistory);

        // Salva no localStorage para persistência
        localStorage.setItem('uploadHistory', JSON.stringify(newHistory));

        // Atualiza último upload
        setLastUpdate(timestamp);
        localStorage.setItem('lastUploadTime', timestamp);
      }

      setFiles([]);

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error: any) {
      console.error(error);
      setMessage({
        type: 'error',
        text: error.response?.data?.detail || error.message || 'Erro durante o processo de upload.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleInfo = (name: string) => {
    if (expandedInfo === name) {
      setExpandedInfo(null);
    } else {
      setExpandedInfo(name);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2 className="upload-title">Upload de Projetos</h2>
        <p className="upload-description">
          Envie os arquivos CSV com os dados dos projetos de extensão. O backend vai normalizar automaticamente os cabeçalhos.
        </p>

        {lastUpdate && (
          <div className="update-badge">
            Atualizado em: {lastUpdate}
          </div>
        )}

        <div className="spreadsheet-info-section">
          <h3>Planilhas Aceitas</h3>
          <div className="spreadsheet-list">
            {SPREADSHEET_INFO.map((item, index) => (
              <div key={index} className="spreadsheet-item">
                <div className="spreadsheet-header">
                  <span className="spreadsheet-name">{item.name}</span>
                  <span className="spreadsheet-file">({item.file})</span>
                  <button
                    className="info-icon"
                    onClick={() => toggleInfo(item.name)}
                    title="Ver colunas obrigatórias"
                  >
                    i
                  </button>
                </div>
                {expandedInfo === item.name && (
                  <div className="spreadsheet-details">
                    <strong>Colunas Obrigatórias:</strong>
                    <p>{item.columns.join(', ')}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <input
          type="file"
          accept=".csv"
          multiple
          onChange={handleFileChange}
        />

        {files.length > 0 && (
          <>
            <ul className="file-list">
              {files.map((f, idx) => <li key={idx}>{f.name}</li>)}
            </ul>
            <button className="cancel-button" onClick={handleCancel} disabled={isLoading}>
              Cancelar Upload
            </button>
          </>
        )}

        <button
          className="upload-button"
          onClick={handleUpload}
          disabled={files.length === 0 || isLoading}
        >
          {isLoading ? 'Enviando...' : 'Enviar Arquivos'}
        </button>

        {message && <div className={`message ${message.type}`}>{message.text}</div>}

        {processedFiles.length > 0 && (
          <div className="file-results">
            <h3>Arquivos Processados:</h3>
            <ul>
              {processedFiles.map((file, idx) => (
                <li key={idx} className="processed-file-item">
                  OK {file}
                </li>
              ))}
            </ul>
          </div>
        )}

        {uploadHistory.length > 0 && (
          <div className="upload-history">
            <h3>Histórico de Uploads (Sessão Atual)</h3>
            {uploadHistory.map((item, idx) => (
              <div key={idx} className="history-item">
                <span className="history-time">{item.timestamp}</span>
                <span className="history-files">{item.files.join(', ')}</span>
              </div>
            ))}
          </div>
        )}

        {showConfirmModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Confirmação de Upload</h3>
              <p>Você deseja atualizar os dados existentes? Isso irá remover os dados antigos.</p>
              <div className="modal-actions">
                <button
                  className="modal-button cancel"
                  onClick={() => setShowConfirmModal(false)}
                >
                  Cancelar
                </button>
                <button
                  className="modal-button confirm"
                  onClick={() => executeUpload(true)}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
