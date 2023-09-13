import { ConvertedData } from '@/types/convertedData';
import axios from 'axios';
import { useEffect, useState } from 'react'

export const useApi = (convertedData: ConvertedData | null) => {
  const [ sqlData, setSqlData ] = useState('')
  const myJson = JSON.stringify(convertedData)

  useEffect(() => {
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
    })
    .catch(function (error) {
      console.error(error);
    });
  }, [myJson])

  return sqlData
}
