"use client"

import React from "react"
import "@/styles/auth.css"
import axios from "@/api/axios"
import { AuthProperties } from "@/types/auth"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

const auth_login = "/auth/login"

const Login = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthProperties>()
  const onSubmit = async (data: AuthProperties) => {
    try {
      const response = await axios.post(auth_login, data)
      if (response.statusText === "OK") router.push("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>Connectez-vous</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            autoComplete="off"
            placeholder="Entrez votre email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && <p>{errors.email.type}</p>}
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            autoComplete="off"
            placeholder="Entrez votre mot de passe"
            {...register("password", {
              required: true,
              max: 32,
              min: 8,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/i,
            })}
          />
          {errors.password && <p>{errors.password.type}</p>}
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
