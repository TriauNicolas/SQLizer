type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

type FetchParams = {
    method: Method;
    headers?: {
        Authorization: string
    }
}

export const doFetchRequest = async (data: {method: Method, url: string, data?: any, token?: string}): Promise<any> => {
    const url = process.env.API_URL;
    if (!url)
        throw new Error('URL is not defined');

        let fetchParams: FetchParams = {
            method: data.method,
        }

        if (data?.token) fetchParams.headers = {Authorization: `Bearer ${data?.token}`}
        try {
            let response = await fetch(url + data.url, fetchParams);
            return response.json()
        } catch (error) {
            console.log({error});
            throw new Error(JSON.stringify(error));
        }


}