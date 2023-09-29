"use client"

import React from "react"
import "@/styles/auth.css"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AuthProperties } from "@/types/auth"
import axios from "@/api/axios"
import { useForm } from "react-hook-form"

const auth_register = "/auth/register"

const Register = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthProperties>()
  const onSubmit = async (data: AuthProperties) => {
    try {
      const response = await axios.post(auth_register, data)
      if (response.statusText === "OK") router.push("/login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>Créer votre compte</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="first_name">Prénom</label>
          <input
            type="text"
            autoComplete="off"
            placeholder="Entrez votre prénom"
            {...register("first_name", {
              required: 'Ce champ ne peut être vide',
              pattern: /^[a-z ,.'-]+$/i,
            })}
          />
          {errors.first_name && <p>{errors.first_name.message}</p>}
        </div>
        <div>
          <label htmlFor="last_name">Nom de famille</label>
          <input
            type="text"
            autoComplete="off"
            placeholder="Entrez votre nom de famille"
            {...register("last_name", {
              required: 'Ce champ ne peut être vide',
              pattern: /^[a-z ,.'-]+$/i,
            })}
          />
          {errors.last_name && <p>{errors.last_name.message}</p>}
        </div>
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
          <input type="submit" value={`Créer un compte`} />
        </div>
        <div>
          <span>{"Vous possédez déjà un compte ?"}</span>
          <Link href="/login">{"Se connecter"}</Link>
        </div>
      </form>
    </div>
  )
}

export default Register
