import { ConvertedData } from '@/types/tables';
import { saveAs } from 'file-saver';
import { useCallback, useEffect, useState } from 'react';
import { useApi } from '@/hooks/useApi';

export const useDownloadSql = (convertedData: ConvertedData | null) => {
  const [ apiSql, setApiSql ] = useState('');
  const { sqlData, isFetching, fetchSQL } = useApi();

  // Attribute the value when the call is finished
  useEffect(() => {
    if (!isFetching) setApiSql(sqlData)
  }, [sqlData, isFetching])

  // Download callback
  const downloadSql = useCallback(() => {

    // Api Call
    fetchSQL(convertedData);

    // Create the SQL content (replace with your data)
    const sqlContent = apiSql;

    // Convert the content to a Blob
    const blob = new Blob([sqlContent], { type: 'text/plain;charset=utf-8' });

    // Trigger the file download
    saveAs(blob, 'data.sql');
  }, [apiSql, fetchSQL, convertedData])

  return { downloadSql }
};