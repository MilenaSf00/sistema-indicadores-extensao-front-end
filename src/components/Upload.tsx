import React, { useState } from 'react';
import '../css/Upload.css';
import { uploadProjects } from '../services/api';

interface UploadMessage {
  type: 'success' | 'error';
  text: string;
}

interface FileResult {
  file: string;
  inserted: number;
  errors?: string[];
}

const Upload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState<UploadMessage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileResults, setFileResults] = useState<FileResult[]>([]);

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


  };

  const handleUpload = async () => {
    if (files.length === 0) return;


    setIsLoading(true);
    setMessage(null);
    setFileResults([]);

    try {
      const result = await uploadProjects(files);
      // Atualiza relatório resumido
      setMessage({
        type: 'success',
        text: `Upload concluído! Arquivos processados: ${result.processedFiles || files.length}. Inseridos: ${result.inserted || 0}, Erros: ${result.errors?.length || 0}`
      });

      // Salva resultados detalhados
      setFileResults(result.fileResults || []);
      setFiles([]);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.response?.data?.detail || error.message || 'Erro ao enviar arquivos.' });
    } finally {
      setIsLoading(false);
    }


  };

  return (<div className="upload-container"> <div className="upload-card"> <h2 className="upload-title">Upload de Projetos</h2> <p className="upload-description">
    Envie os arquivos CSV com os dados dos projetos de extensão. O backend vai normalizar automaticamente os cabeçalhos. </p>


    <input
      type="file"
      accept=".csv"
      multiple
      onChange={handleFileChange}
    />

    {files.length > 0 && (
      <ul>
        {files.map((f, idx) => <li key={idx}>{f.name}</li>)}
      </ul>
    )}

    <button onClick={handleUpload} disabled={files.length === 0 || isLoading}>
      {isLoading ? 'Enviando...' : 'Enviar Arquivos'}
    </button>

    {message && <div className={`message ${message.type}`}>{message.text}</div>}

    {fileResults.length > 0 && (
      <div className="file-results">
        <h3>Relatório detalhado:</h3>
        {fileResults.map((res, idx) => (
          <div key={idx} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '5px' }}>
            <strong>{res.file}</strong> - Inseridos: {res.inserted}
            {res.errors && res.errors.length > 0 && (
              <ul>
                {res.errors.map((e, i) => <li key={i} style={{ color: 'red' }}>{e}</li>)}
              </ul>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
  </div>


  );
};

export default Upload;
