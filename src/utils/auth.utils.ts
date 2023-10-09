import { doFetchRequest } from "@/api/fetch";

export const isUserLogged = async (token: string): Promise<boolean> => {
  try {
    const res = await doFetchRequest({
      method: "GET",
      url: "/auth/verifToken",
      token,
    });

    if (res.success) return true;
  } catch (error) {
    console.log(error);
  }
  return false;
};
