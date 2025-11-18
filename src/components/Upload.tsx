import React, { useState } from 'react';

const Upload: React.FC = () => {
  const [fileData, setFileData] = useState<string[][] | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
   
      const rows = text
        .split('\n')
        .map(row => row.split(',').slice(0, 3)); 
      setFileData(rows);
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Upload CSV</h2>
      <p>Aqui você pode enviar seus arquivos CSV.</p>

      <input type="file" accept=".csv" onChange={handleFileChange} />

      {fileName && <p><strong>Arquivo selecionado:</strong> {fileName}</p>}

      {fileData && (
        <div style={{ marginTop: '20px' }}>
          <h3>Conteúdo do CSV (3 primeiras colunas):</h3>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <tbody>
              {fileData.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      style={{
                        border: '1px solid #ccc',
                        padding: '5px',
                        textAlign: 'left',
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Upload;
