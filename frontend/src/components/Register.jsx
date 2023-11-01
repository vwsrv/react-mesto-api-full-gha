/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";

export default function Register({ onRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isValid
        }
    } = useForm({
        mode: "onBlur"
    });

    function onSubmit() {
        onRegister({ password, email })
    }

    return (
        <div className="auth">
            <p className="auth__title">Регистрация</p>
            <form className="auth__form"
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
            >
                <fieldset className="popup__set">
                    <label className="popup__field" htmlFor="user-email">
                        <input
                            {...register('email', {
                                required: 'Поле, обязательное к заполнению',
                                errors: 'Введите Email'
                            })}
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email"
                            className="auth__input auth__input_type-email"
                            placeholder="Email"
                            autoComplete="off" />
                        {errors?.email && <span className="popup__input-error name-input-error popup__error_visible">{errors?.email?.message}</span>}
                    </label>
                    <label className="popup__field" htmlFor="user-password">
                        <input
                            {...register('password', {
                                required: 'Поле, обязательное к заполнению',
                                minLength: {
                                    value: 8,
                                    message: 'Минимальная длина пароля: 8 символов'
                                }
                            })}
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password"
                            className="auth__input auth__input_type-password"
                            placeholder="Пароль"
                            autoComplete="off" />
                        {errors?.password && <span className="popup__input-error name-input-error popup__error_visible">{errors?.password?.message}</span>}
                    </label>
                </fieldset>
                <button type="submit" className={isValid ? `auth__submit-btn` : `auth__submit-btn_inactive`}>Регистрация</button>
                <div className="auth__signin">
                    <p>Уже зарегистрированы?</p>
                    <NavLink to='/signin' className="auth__login-link">Войти</NavLink>
                </div>
            </form>
        </div>
    )
}

