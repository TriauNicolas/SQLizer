"use client"

import React from "react"
import "@/styles/home.css"
import canvasDemo from '../../public/canvas.png';
import logo from '../../public/logo.svg';
import Image from "next/image"

const Home = () => {
    return (
        <div className="body">
            <header>
                <div className="logo-holder">
                <Image 
                    src={logo}
                    priority
                    alt="Logo"
                    className="logo"
                />
                </div>
                <div className="navbar">
                    <div className="item"><a className="link" href="/login">Se connecter</a></div>
                    <div className="item alt"><a className="link" href="/register">Commencer Maintenant</a></div>
                </div>
            </header>
            <main>
                <section id="section-1">
                    <div className="wrap">
                        <h1><span className="american">SQLizer</span> est l&apos;éditeur <span className="fat">collaboratif</span> <br/>de SQL que vous attendiez pour venir <br/>à bout de vos projets d&apos;envergure !
                            <button className="cta"><a href="/register">Commencer</a></button>
                        </h1>
                            <Image 
                                src={canvasDemo}
                                priority
                                alt="Demo"
                                className="demo"
                            />
                        <p className="accroche">Rejoignez-nous dès maintenant et augmentez votre productivité !</p>
                    </div>
                </section>
                <section id="section-2">
                    <div className="wrap">
                        <h2>Vous ne <span className="fat">confondrez plus</span> les clées <br/><span className="fat">Primaires</span> et <span className="fat">Secondaires</span> <br/>en un seul clin d&apos;oeil</h2>
                        <div className="wrapper">
                            <p className="side">
                                Grâce à l&apos;interface graphique de <span className="fat">SQLizer</span>, les tables et leurs dépendences deviennent simple et compréhensibles rapidement
                                <button className="cta"><a href="/register">C&apos;est parti</a></button>
                            </p>
                            <Image 
                                src={canvasDemo}
                                priority
                                alt="Demo"
                            />
                        </div>
                    </div>
                </section>
                <section id="section-3">
                    <div className="wrap">
                        <h2><span className="fat">Accélérez</span> et <span className="fat">améliorez</span> la conception <br/>de votre <span className="american">database</span></h2>
                        <div className="wrapper">
                            <Image 
                                src={canvasDemo}
                                priority
                                alt="Demo"
                            />
                            <p className="side alt">
                                Grâce à l&apos;interface graphique de <span className="fat">SQLizer</span>, les erreurs et possibles optimisations sautent littérallement aux yeux !
                                <button className="cta"><a href="/register">Je me lance</a></button>
                            </p>
                        </div>
                        <div className="box">
                            <p>Commencez à <span className="fat">concevoir</span> <br/>votre database <br/>avec <span className="american">SQLizer</span></p>
                            <button className="cta"><a href="/register">Créer un compte</a></button>
                        </div>
                    </div>
                </section>
            </main>
            <footer>

            </footer>
        </div>
        
    )
}


export default Home