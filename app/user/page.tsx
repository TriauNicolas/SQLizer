"use client"

import React, { useState, useEffect, use } from "react"
import Image from 'next/image';
import logo from '../../public/logosqlizerwhite.svg';
import add from '../../public/SVGAddField.svg'
import style from "../../src/styles/user.module.css"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { doFetchRequest } from "@/api/fetch"
import { session } from "../SessionProvider"
import Workgroups from "@/components/Workgroups/Workgroups";

interface Data {
  success: boolean,
  groups: Workgroups[]
}

interface Rights {
  create_right: boolean;
  update_right: boolean;
  delete_right: boolean;
}

interface UserType {
  first_name: string,
  last_name: string,
  email: string,
}

const User = () => {
  const { data: session, status } = useSession();

  const [ workgroups, setWorkgroups ] = useState<Workgroups[]>();
  const [ data, setData ] = useState<Data>();
  const [ token, setToken ] = useState("");
  const [ user, setUser ] = useState<UserType>();
  const [ newUserEmail, setNewUserEmail ] = useState('');


  useEffect(() => {
    if (!data) return
    if (!workgroups) setWorkgroups(data.groups);
  }, [data, workgroups])

  useEffect(() => {
    if (status === 'authenticated') {
      // @ts-ignore
      setToken(session?.user?.token)
      setUser({
        // @ts-ignore
        first_name: session?.user?.firstName,
        // @ts-ignore
        last_name: session?.user?.lastName,
        // @ts-ignore
        email: session?.user?.email
      })
      const getData = async() => {
        // @ts-ignore
        return await doFetchRequest({method:"GET", token: session?.user?.token, url:"/workgroups/getUserWorkgroupsDatas"})
      }

      getData().then((response) => {
        setData(response)
      })
      .catch((error) => {
        console.log(error)
      });
    }

    

    if (!data) return
    setWorkgroups(data.groups);

  }, [status, session, newUserEmail, ]);

  return (
    <div className={style.container}>
      <div className={style.userMainTitle}>
        <Image 
            src={logo}
            height={80}
            width={87}
            alt="logo Sqilizer"
            priority
        />
        <h1>Bienvenue {user?.first_name} {user?.last_name}</h1>
      </div>
      <div className={style.groups}>
        <h2>Mes Groupes:</h2>
        {workgroups?.map((group:Workgroups) => (
          <Workgroups status={status} key={group.group_id} token={token} group={group} initialUserEmail={user?.email}/>
        ))}
      </div>
    </div>
  )
}

export default User