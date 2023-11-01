/* eslint-disable react/prop-types */
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props) {
    const { card, onCardClick, onCardLike, onCardDelete } = props;
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = (
        `element__like-btn ${isLiked && 'element__like-btn_active'}`
    );

    function handleCardClick() {
        onCardClick(card);
    }

    function handleCardLike() {
        onCardLike(card);
    }

    function handleDeleteCard() {
        onCardDelete(card);
    }

    return (
        <article className="element">
            {isOwn && <button
                type="button"
                className="element__delete-btn"
                aria-label="Удалить"
                onClick={handleDeleteCard} />}
            <img src={card.link}
                alt={card.title}
                className="element__image"
                onClick={handleCardClick} />
            <div className="element__info">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__button">
                    <button type="button"
                        className={cardLikeButtonClassName}
                        aria-label="Нравится"
                        onClick={handleCardLike}></button>
                    <p className="element__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </article>
    )
}