/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useForm } from 'react-hook-form'
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
    const [profileName, setName] = useState('');
    const [profileDescription, setDescription] = useState('');
    const currentUser = useContext(CurrentUserContext);
    const {
        register,
        handleSubmit,
        reset,

        formState: {
            errors,
            isValid
        }
    } = useForm({
        mode: "onBlur"
    })

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
        reset();
    }, [currentUser, isOpen])

    function onSubmit() {
        onUpdateUser({
            name: profileName,
            about: profileDescription,
        });
    }

    return (
        <PopupWithForm
            name='edit'
            title='Редактировать профиль'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit(onSubmit)}
            buttonText='Сохранить'
            buttonTextLoading='Сохранение...'
            isLoading={isLoading}
            isValid={isValid}>
            <label htmlFor="popup__input_type_name" className="popup__field">
                <input
                    {...register('name', {
                        required: 'Поле, обязательное к заполнению',
                        minLength: {
                            value: 2,
                            message: 'Минимальная длина текущего значения: 2 символа'
                        },
                        maxLength: {
                            value: 40,
                            message: 'Минимальная длин текущего значения: 40 символов'
                        }
                    })}
                    className="popup__input popup__input_type_name"
                    placeholder="Введите имя профиля" id="name-input"
                    onChange={(e) => { setName(e.target.value) }}
                    value={profileName || ''}
                />
                {errors?.name && <span className="popup__input-error name-input-error popup__error_visible">{errors?.name?.message}</span>}
            </label>
            <label htmlFor="popup__input_type_description" className="popup__field">
                <input
                    {...register('about', {
                        required: 'Поле обязательное к заполнению',
                        minLength: {
                            value: 2,
                            message: 'Минимальная длина текущего значения: 2 символа'
                        },
                        maxLength: {
                            value: 40,
                            message: 'Минимальная длин текущего значения: 40 символов'
                        }
                    })}
                    className="popup__input popup__input_type_description"
                    placeholder="Введите описание профиля"
                    id="description-input"
                    onChange={(e) => { setDescription(e.target.value) }}
                    value={profileDescription || ''} required />
                {errors?.about && <span className="popup__input-error description-input-error popup__error_visible">{errors?.about?.message}</span>}
            </label>
        </PopupWithForm>
    )
}