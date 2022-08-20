import React from 'react';
import style from './card.module.scss'

export interface CardProps{
    children: JSX.Element[] | JSX.Element
    title : string
}

const Card = ({title,children}:CardProps) => {
    return (
        <section className={style.card_container}>
            <div className={style.card_title}>
                <h3>{title}</h3>
            </div>
            <article className={style.card_body}>
                {children}
            </article>

        </section>
    );
};

export default Card;
