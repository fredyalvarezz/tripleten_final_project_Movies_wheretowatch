import React from "react";
import "./About.css";
import profileImage from "../../images/Me.svg"; 

export default function About() {
    return (
        <section className="about">
            <div className="about__container">
                <img
                    src={profileImage}
                    alt="Foto del autor"
                    className="about__image"
                />

                <div className="about__text">
                    <h1 className="about__title">Sobre el proyecto</h1>
                    <p className="about__description">
                        Este proyecto es una aplicación de película y series que permite
                        buscar títulos, ver un poco de la sinopsis y las plataformas en las cuales estan disponibles para streaming, crear tu propia cuenta para
                        poder crear tu lista guardando en favoritos y llevar un control de las peliculas o series marcandolas
                        con un proceso de por ver, viendo y visto.
                    </p>

                    <h2 className="about__subtitle">Sobre mí</h2>
                    <p className="about__description">
                        Hola, soy Fredy Alvarez, Ingeniero en Sistemas Computacionales y  desarrollador web full-stack en formación en TripleTen.
                        Disfruto el poder crear interfaces limpias, funcionales y modulares, basadas en
                        buenas prácticas aprendidas a travez del curso, he aprendido bastante sobre React hooks, BEM y muchas otras cosas que me han ayudado
                        a poder superarme y poder crear aplicaciones más funcionales ademas de perfeccional el frontend para que el usuario pueda
                        utilizar una interfaz más amigable.
                        soy muy fan de las peliculas y series, creo que paso el mayor tiempo descubriendo nuevo contenido y que mejor de utilizar lo aprendido
                        que creando una pagina que nos puede ayudar a todos a tener un control de listado de contendio todo junto.
                    </p>
                    <a
                        href="https://github.com/fredyalvarezz?tab=repositories"
                        className="about__github"
                    >
                        <span className="about__github-icon">💻</span>
                        Mi GitHub
                    </a>
                </div>
            </div>
        </section>
    );
}
