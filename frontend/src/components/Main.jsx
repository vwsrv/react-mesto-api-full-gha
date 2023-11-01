/* eslint-disable react/prop-types */
import React from "react";
import Card from '../components/Card.jsx';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar">
                    <img alt="Фотография профиля"
                        className="profile__avatar-image"
                        src={currentUser.avatar} />
                    <button
                        className="profile__avatar-btn"
                        onClick={onEditAvatar}></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button type="button"
                        className="profile__button-edit"
                        aria-label="Редактировать"
                        onClick={onEditProfile}></button>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button type="button"
                    className="profile__button-add"
                    aria-label="Добавить"
                    onClick={onAddPlace} />
            </section>
            <section className="elements">
                {cards.map(card => (
                    <Card
                        key={card._id}
                        card={card}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                    />))}
            </section>
        </main>
    );
}