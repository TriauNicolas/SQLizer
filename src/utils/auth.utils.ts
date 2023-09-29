import { getAxiosInstance } from "@/api/axios";

export const setToken = (token: string) => {
    localStorage.setItem('token', token)
}

export const getToken = (): string | null => {
    const token = localStorage.getItem('token')
    return token || null;
}

export const isUserLogged = async (): Promise<boolean> => {
    try {
        const res = await getAxiosInstance().get('/auth/verifToken')
        console.log(res);
        return true;
    } catch (error) {
        console.log('error: ');
        console.log(error);
    }

    return false;
}

export const deleteToken = () => {
    localStorage.clear();
}