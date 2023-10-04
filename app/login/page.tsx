"use client"

import React from "react"
import "@/styles/auth.css"
import { AuthProperties } from "@/types/auth"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { signIn } from 'next-auth/react'

const Login = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthProperties>()
  const onSubmit = async (data: AuthProperties) => {
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false
      });
        if (response?.ok) {
        router.push("/")
      }

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
