"use client"
import Image from 'next/image';
import logo from '../../public/logosqlizer.svg';
import React from "react"
import styles from "../../src/styles/auth.module.css"
import { getAxiosInstance } from "@/api/axios"
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
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <div className={styles.welcome_container}>
          <h1 className={styles.title_t1}>Bienvenue</h1>
          <Image 
            src={logo}
            height={100}
            width={108}
            priority
            alt="Add a field to the table"
            onClick={() => openModal()}
          />
        </div>
        <div>
        <h1 className={styles.title_t1}>Connectez-vous</h1>
        <form className={styles.form_main} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className={styles.title_label} htmlFor="email">Email</label>
            <input
              className={styles.input_block}
              type="email"
              autoComplete="off"
              placeholder="Entrez votre email"
              {...register("email", { required: 'Ce champ ne peut être vide', pattern: /^\S+@\S+$/i })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div>
            <label className={styles.title_label} htmlFor="password">Mot de passe</label>
            <input
              className={styles.input_block}
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
            <input className={styles.input_block} type="submit" value={`Se connecter`} />
          </div>
          <div>
            <span className={styles.subtitle}>Pas de compte ?</span>
            <Link href="/register">{`Créer un compte`}</Link>
          </div>
        </form>
        </div>
      </div>
    </div>
    
  )
}

export default Login
