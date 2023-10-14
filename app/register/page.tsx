"use client";
import Image from 'next/image';
import logo from '../../public/logosqlizer.svg';
import React from "react"
import styles from "../../src/styles/auth.module.css"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AuthProperties } from "@/types/auth"
import { getAxiosInstance } from "@/api/axios"
import { useForm } from "react-hook-form"

const auth_register = "/auth/register";

const Register = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthProperties>();
  const onSubmit = async (data: AuthProperties) => {
    try {
      const response = await doFetchRequest({
        method: "POST",
        url: auth_register,
        data,
      });
      if (response.statusText === "OK") router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

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
        <h1 className={styles.title_t1} >Créer votre compte</h1>
          <form className={styles.form_main} onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className={styles.title_label} htmlFor="first_name">Prénom</label>
              <input
                className={styles.input_block}
                type="text"
                autoComplete="off"
                placeholder="Entrez votre prénom"
                {...register("first_name", {
                  required: "Ce champ ne peut être vide",
                  pattern: /^[a-z ,.'-]+$/i,
                })}
              />
              {errors.first_name && <p>{errors.first_name.message}</p>}
            </div>
            <div>
              <label className={styles.title_label}  htmlFor="last_name">Nom de famille</label>
              <input
                className={styles.input_block}
                type="text"
                autoComplete="off"
                placeholder="Entrez votre nom de famille"
                {...register("last_name", {
                  required: "Ce champ ne peut être vide",
                  pattern: /^[a-z ,.'-]+$/i,
                })}
              />
              {errors.last_name && <p className={styles.writing}>{errors.last_name.message}</p>}
            </div>
            <div>
              <label className={styles.title_label}  htmlFor="email">Email</label>
              <input
                className={styles.input_block}
                type="email"
                autoComplete="off"
                placeholder="Entrez votre email"
                {...register("email", {
                  required: "Ce champ ne peut être vide",
                  pattern: /^\S+@\S+$/i,
                })}
              />
              {errors.email && <p className={styles.writing}>{errors.email.message}</p>}
            </div>
            <div>
              <label className={styles.title_label}  htmlFor="password">Mot de passe</label>
              <input
                className={styles.input_block}
                type="password"
                autoComplete="off"
                placeholder="Entrez votre mot de passe"
                {...register("password", {
                  required: "Ce champ ne peut être vide",
                  max: 32,
                  min: 8,
                })}
              />
              {errors.password && <p className={styles.writing}>{errors.password.message}</p>}
            </div>
            <div>
              <input className={styles.input_block} type="submit" value={`Créer un compte`} />
            </div>
            <div>
              <span className={styles.subtitle}>{"Vous possédez déjà un compte ?"}</span>
              <Link href="/login">{"Se connecter"}</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
