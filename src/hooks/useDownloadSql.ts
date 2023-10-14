import { ConvertedData } from '@/types/tables';
import { saveAs } from 'file-saver';
import { useCallback, useEffect } from 'react';
import { useApi } from '@/hooks/useApi';

export const useDownloadSql = () => {
  const { sqlData, fetchSQL } = useApi();

  const triggerSqlFetch = useCallback((convertedData: ConvertedData | null) => {
    fetchSQL(convertedData);
  }, [fetchSQL]);

  // Trigger the download when sqlData is updated
  useEffect(() => {
    if (sqlData) {
        const sqlContent = sqlData;

        // Convert the content to a Blob
        const blob = new Blob([sqlContent], { type: 'text/plain;charset=utf-8' });

        // Trigger the file download
        saveAs(blob, 'data.sql');
    }
  }, [sqlData]);

  return { triggerSqlFetch };
};