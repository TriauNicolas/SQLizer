import { ConvertedData } from '@/types/tables';
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
    .catch((error: unknown) => {
      if (error instanceof Error) {
        return `Things exploded (${error.message})`
      }
    });
  }, [myJson])

  return sqlData
}
