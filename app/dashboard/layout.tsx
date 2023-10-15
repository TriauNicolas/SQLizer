"use client";
import { useSession } from "next-auth/react";
import {
  useEffect,
  useState,
  createContext,
  useContext,
  SetStateAction,
  Dispatch,
} from "react";
import { doFetchRequest } from "@/api/fetch";
import SideBar from "@/components/SideBar/Sidebar";
import Header from "@/components/Header/Header";
import styles from "./page.module.scss";

export interface UserType {
  first_name: string;
  last_name: string;
  email: string;
}
interface Props {
  children: React.ReactNode;
}

interface DashboardContextProps {
  token: string;
  user: UserType | undefined;
  data: any;
  setToken: Dispatch<SetStateAction<string>>;
  setData: Dispatch<SetStateAction<any>>;
  selectedGroupId: string;
  setSelectedGroupId: Dispatch<SetStateAction<string>>;
}

export const DashboardContext = createContext<DashboardContextProps>({
  token: "",
  user: { first_name: "", last_name: "", email: "" },
  data: {},
  setToken: () => {},
  setData: () => {},
  selectedGroupId: "",
  setSelectedGroupId: () => {},
});

const DashboardLayout = ({ children }: Props) => {
  const { data: session, status } = useSession();
  const [token, setToken] = useState("");
  const [data, setData] = useState<{}>();
  const [user, setUser] = useState<UserType>();
  const [selectedGroupId, setSelectedGroupId] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      // @ts-ignore
      setToken(session?.user?.token);
      const getData = async () => {
        // @ts-ignore
        return await doFetchRequest({
          method: "GET",
          // @ts-ignore
          token: session?.user?.token,
          url: "/workgroups",
        });
      };

      setUser({
        // @ts-ignore
        first_name: session?.user?.firstName,
        // @ts-ignore
        last_name: session?.user?.lastName,
        // @ts-ignore
        email: session?.user?.email,
      });

      getData()
        .then((response) => {
          setData(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [session, status]);

  return (
    token &&
    user &&
    data && (
      <DashboardContext.Provider
        value={{
          token,
          user,
          data,
          setToken,
          setData,
          selectedGroupId,
          setSelectedGroupId,
        }}
      >
        <div className={styles.dashboard}>
          <SideBar />
          <div className={styles.mainContent}>
            <Header />
            <div className={styles.contentWrapper}>{children}</div>
          </div>
        </div>
      </DashboardContext.Provider>
    )
  );
};

export default DashboardLayout;
