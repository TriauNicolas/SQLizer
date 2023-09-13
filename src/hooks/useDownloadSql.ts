import { ConvertedData } from '@/types/convertedData';
import { saveAs } from 'file-saver';
import { useCallback } from 'react';
import { useApi } from '@/hooks/useApi';

export const useDownloadSql = (convertedData: ConvertedData | null) => {
  const apiCall = useApi(convertedData);

  const downloadSql = useCallback(() => {

    console.log(apiCall)

    // Create the SQL content (replace with your data)
    const sqlContent = apiCall;

    // Convert the content to a Blob
    const blob = new Blob([sqlContent], { type: 'text/plain;charset=utf-8' });

    // Trigger the file download
    saveAs(blob, 'data.sql');
  }, [apiCall])

  return { downloadSql }
};