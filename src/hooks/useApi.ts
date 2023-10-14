import { doFetchRequest } from '@/api/fetch';
import { ConvertedData } from '@/types/tables';
import { useState } from 'react'

export const useApi = () => {
  const [ sqlData, setSqlData ] = useState('');
  const [ isFetching, setIsFetching ] = useState(false);
  
  const fetchSQL = async (convertedData: ConvertedData | null) => {
    if (!convertedData) return;
  
    const myJson = JSON.stringify(convertedData);

    setIsFetching(true);

    await doFetchRequest({method: 'POST', url: '/translation/translateJsonToSql', data: myJson})
    .then(response => {
      if (response.data) setSqlData(response.data.sql);
      setIsFetching(false);
    })
    .catch((error: unknown) => {
      setIsFetching(false);
      if (error instanceof Error) {
        return `Things exploded (${error.message})`
      }
    });
  }

  return { sqlData, isFetching, fetchSQL }
}
