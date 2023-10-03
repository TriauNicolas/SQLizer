"use client"

import React from "react"
import "@/styles/auth.css"
import { getAxiosInstance } from "@/api/axios"
import { AuthProperties } from "@/types/auth"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { setToken } from "@/utils/auth.utils"
import { signIn, signOut, useSession } from 'next-auth/react'


const auth_login = "/auth/login"


const Login = () => {
  const router = useRouter()

  const { data: session, status } = useSession();
  if (status !== "unauthenticated") {
    console.log('-------------------');
    console.log(session);
  } else {
    signIn()
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthProperties>()
  const onSubmit = async (data: AuthProperties) => {
    try {
      const response = await getAxiosInstance().post(auth_login, data);
      setToken(response.data.token)
      if (response.statusText === "OK") router.push("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <button onClick={async() => {await signOut(); console.log(session);}}>Sign out</button>
      <h1>Connectez-vous</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            autoComplete="off"
            placeholder="Entrez votre email"
            {...register("email", { required: 'Ce champ ne peut être vide', pattern: /^\S+@\S+$/i })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            autoComplete="off"
            placeholder="Entrez votre mot de passe"
            {...register("password", {
              required: 'Ce champ ne peut être vide',
              max: 32,
              min: 8,
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <input type="submit" value={`Se connecter`} />
        </div>
        <div>
          <span>Pas de compte ?</span>
          <Link href="/register">{`Créer un compte`}</Link>
        </div>
      </form>
    </div>
  )
}

export default Login
