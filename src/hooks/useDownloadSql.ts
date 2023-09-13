import { ConvertedData } from '@/types/convertedData';
import { saveAs } from 'file-saver';
import { useCallback, useEffect } from 'react';

export const useDownloadSql = (convertedData: ConvertedData | null) => {

  const downloadSql = useCallback(() => {

    console.log(convertedData)

    // Create the SQL content (replace with your data)
    const sqlContent = `
    INSERT INTO users (name, email) VALUES ('John Doe', 'johndoe@example.com');
    INSERT INTO users (name, email) VALUES ('Jane Smith', 'janesmith@example.com');
    -- Add more SQL statements as needed
    `;

    // Convert the content to a Blob
    const blob = new Blob([sqlContent], { type: 'text/plain;charset=utf-8' });

    // Trigger the file download
    saveAs(blob, 'data.sql');
  }, [convertedData])

  return { downloadSql }
};