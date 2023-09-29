import axios, { Axios } from "axios";

export const getAxiosInstance = (): Axios => {
    const url = process.env.API_URL;
    console.log(url);
    if (!url)
        throw new Error('URL is not defined');

    const token = localStorage.getItem('token')
    const config: {baseURL: string, headers: { "Content-Type": string, Authorization?: string } } = {
        baseURL: url,
        headers: {
            "Content-Type": 'application/json'
        }
    }

    if (token) config.headers.Authorization = `Bearer ${token}`
        return axios.create(config)
}