/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "react-hook-form"
import { UrlPattern } from '../utils/UrlPattern.js'

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
    const [profileAvatar, setUserAvatar] = useState('');
    const currentUser = useContext(CurrentUserContext);

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset,
    } = useForm({
        mode: "onBlur",
    })

    useEffect(() => {
        if (isOpen && currentUser) {
            setUserAvatar('');
            reset();
        }
    }, [currentUser, isOpen]);

    function onChange(e) {
        setUserAvatar(e.target.value);
    }

    function onSubmit() {
        onUpdateAvatar({
            avatar: profileAvatar
        });
    }

    return (
        <PopupWithForm
            name='update'
            title='Обновить аватар'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit(onSubmit)}
            buttonText='Изменить'
            buttonTextLoading='Изменение...'
            isLoading={isLoading}
            isValid={isValid}
        >
            <label htmlFor="popup__input_type_link" className="popup__field">
                <input
                    type='url'
                    {...register('avatar', {
                        required: 'Поле, обязательноe к заполнению.',
                        pattern: {
                            value: UrlPattern,
                            message: 'Введите корректную ссылку на изображение.'
                        }
                    })}
                    className={`popup__input popup__input_type_link`}
                    placeholder="Ссылка на картинку"
                    id="avatar-input"
                    onChange={onChange}
                    value={profileAvatar || ''}
                />
                {errors?.avatar && <span className="popup__input-error avatar-input-error popup__error_visible">{errors?.avatar?.message}</span>}
            </label>
        </PopupWithForm>
    )
}