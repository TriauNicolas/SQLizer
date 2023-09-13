import axios from 'axios';
import { useCallback, useEffect, useState } from 'react'

export const useApi = () => {
  const [ sqlData, setSqlData ] = useState('')
  const myJson = JSON.stringify({
    "dbName": "EcommerceDB",
    "tables": [
        {
            "name": "SaaS",
            "posX": 100,
            "posY": 100,
            "fields": [
                {
                    "name": "id",
                    "type": "int",
                    "autoIncrement": true,
                    "pk": true,
                    "fk": false,
                    "nullable": false
                },
                {
                    "name": "username",
                    "type": "varchar(256)",
                    "autoIncrement": false,
                    "pk": false,
                    "fk": false,
                    "nullable": false
                }
            ]
        },
        {
            "name": "products",
            "posX": 300,
            "posY": 100,
            "fields": [
                {
                    "name": "id",
                    "type": "int",
                    "autoIncrement": true,
                    "pk": true,
                    "fk": false,
                    "nullable": false
                },
                {
                    "name": "name",
                    "type": "varchar(256)",
                    "autoIncrement": false,
                    "pk": false,
                    "fk": false,
                    "nullable": false
                },
                {
                    "name": "price",
                    "type": "decimal(10,2)",
                    "autoIncrement": false,
                    "pk": false,
                    "fk": false,
                    "nullable": false
                }
            ]
        },
        {
            "name": "rders",
            "posX": 500,
            "posY": 100,
            "fields": [
                {
                    "name": "id",
                    "type": "int",
                    "autoIncrement": true,
                    "pk": true,
                    "fk": false,
                    "nullable": false
                },
                {
                    "name": "userId",
                    "type": "int",
                    "autoIncrement": false,
                    "pk": false,
                    "fk": true,
                    "nullable": false
                }
            ]
        },
        {
            "name": "rder_items",
            "posX": 700,
            "posY": 100,
            "fields": [
                {
                    "name": "rderId",
                    "type": "int",
                    "autoIncrement": false,
                    "pk": true,
                    "fk": true,
                    "nullable": false
                },
                {
                    "name": "productId",
                    "type": "int",
                    "autoIncrement": false,
                    "pk": true,
                    "fk": true,
                    "nullable": false
                }
            ]
        },
        {
            "name": "reviews",
            "posX": 900,
            "posY": 100,
            "fields": [
                {
                    "name": "id",
                    "type": "int",
                    "autoIncrement": true,
                    "pk": true,
                    "fk": false,
                    "nullable": false
                },
                {
                    "name": "userId",
                    "type": "int",
                    "autoIncrement": false,
                    "pk": false,
                    "fk": true,
                    "nullable": false
                },
                {
                    "name": "productId",
                    "type": "int",
                    "autoIncrement": false,
                    "pk": false,
                    "fk": true,
                    "nullable": false
                },
                {
                    "name": "text",
                    "type": "varchar(512)",
                    "autoIncrement": false,
                    "pk": false,
                    "fk": false,
                    "nullable": false
                }
            ]
        }
    ],
    "relations": [
        {
            "from": { "table": "users", "field": "id" },
            "to": { "table": "rders", "field": "userId" }
        },
        {
            "from": { "table": "rders", "field": "id" },
            "to": { "table": "rder_items", "field": "rderId" }
        },
        {
            "from": { "table": "products", "field": "id" },
            "to": { "table": "rder_items", "field": "productId" }
        },
        {
            "from": { "table": "users", "field": "id" },
            "to": { "table": "reviews", "field": "userId" }
        },
        {
            "from": { "table": "products", "field": "id" },
            "to": { "table": "reviews", "field": "productId" }
        }
    ]
  })

  const callApi = useEffect(() => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/translation/translateJsonToSql',
      headers: {
        'Content-Type': 'application/json'
      },
      data: myJson
    })
    .then(response => {
      console.log(response.data);
      if (response.data) setSqlData(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  }, [myJson])

  return sqlData
}
