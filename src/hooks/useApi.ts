import { ConvertedData } from '@/types/tables';
import axios from 'axios';
import { useState } from 'react'

export const useApi = () => {
  const [ sqlData, setSqlData ] = useState('');
  const [ isFetching, setIsFetching ] = useState(false);
  
  const fetchSQL = (convertedData: ConvertedData | null) => {
    if (!convertedData) return;
  
    const myJson = JSON.stringify(convertedData);

    setIsFetching(true);

    axios({
      method: 'post',
      url: 'http://localhost:8080/translation/translateJsonToSql',
      headers: {
        'Content-Type': 'application/json'
      },
      data: myJson
    })
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
