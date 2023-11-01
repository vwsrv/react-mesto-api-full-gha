/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "react-hook-form"
import { UrlPattern } from "../utils/UrlPattern";

export default function AddPlacePopup({ cards, isOpen, onClose, onAddPlace, isLoading }) {
    const [cardTitle, setCardTiltle] = useState('');
    const [cardLink, setCardLink] = useState('');
    const {
        register,
        reset,
        handleSubmit,
        formState: {
            errors,
            isValid }
    } = useForm({
        mode: "onBlur"
    })

    useEffect(() => {
        if (isOpen, cardLink, cardTitle) {
            setCardLink('');
            setCardTiltle('');
        }
        reset();
    }, [cards, isOpen])

    function onSubmit() {
        onAddPlace({
            link: cardLink,
            name: cardTitle
        })
    }

    return (
        <PopupWithForm
            cards={cards}
            name='add'
            title='Добавить новое место'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit(onSubmit)}
            buttonText='Добавить'
            buttonTextLoading='Подождите...'
            isLoading={isLoading}
            isValid={isValid}>
            <label htmlFor="popup__input_type_title" className="popup__field">
                <input
                    {...register("name", {
                        required: 'Поле, обязательное к заполнению',
                        minLength: {
                            value: 2,
                            message: 'Минимальная длина текущего значения: 2 символа'
                        },
                        maxLength: {
                            value: 40,
                            message: 'Минимальная длина текущего значения: 40 символов'
                        }
                    })}
                    className="popup__input popup__input_type_title"
                    placeholder="Название"
                    id="title-input"
                    onChange={(e) => { setCardTiltle(e.target.value) }}
                    value={cardTitle}
                />
                {errors?.name && <span className="popup__input-error title-input-error popup__error_visible">{errors?.name?.message}</span>}
            </label>
            <label htmlFor="popup__input_type_link" className="popup__field">
                <input type="url"
                    {...register("link", {
                        required: 'Поле, обязательное к заполнению.',
                        pattern: {
                            value: UrlPattern,
                            message: 'Введите корректную ссылку на изображение.'
                        }
                    })}
                    name="link"
                    className="popup__input popup__input_type_link"
                    placeholder="Ссылка на картинку"
                    id="link-input"
                    onChange={(e) => { setCardLink(e.target.value) }}
                    value={cardLink} />
                {errors?.link && <span className="popup__input-error link-input-error popup__error_visible">{errors?.link?.message}</span>}
            </label>
        </PopupWithForm>
    )
}