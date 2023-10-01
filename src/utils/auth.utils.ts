import { getAxiosInstance } from "@/api/axios";

export const setToken = (token: string) => {
    localStorage.removeItem('token')
    localStorage.setItem('token', token)
}

export const getToken = (): string | null => {
    const token = localStorage.getItem('token')
    return token || null;
}

export const isUserLogged = async (): Promise<boolean> => {
    try {
        await getAxiosInstance().get('/auth/verifToken')
        return true;
    } catch (error) {
        console.log(error);
    }

    return false;
}

export const deleteToken = () => {
    localStorage.clear();
}