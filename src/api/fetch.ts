type Method = "GET" | "POST" | "PUT" | "DELETE";

type FetchParams = {
  method: Method;
  headers: {
    authorization?: string;
    "Content-Type": string;
  };
  body?: string;
};

export const doFetchRequest = async (data: {
  method: Method;
  url: string;
  data?: any;
  token?: string;
}): Promise<any> => {
  const url = process.env.API_URL;
  if (!url) throw new Error("URL is not defined");

  let fetchParams: FetchParams = {
    headers: {
      "Content-Type": "application/json",
    },
    method: data.method,
  };
  if (data?.token) fetchParams.headers.authorization = `Bearer ${data?.token}`;

  if (data?.data) fetchParams.body = JSON.stringify(data?.data);

  try {
    let response = await fetch(url + data.url, fetchParams);
    return response.json();
  } catch (error) {
    console.log({ error });
    throw new Error(JSON.stringify(error));
  }
};
