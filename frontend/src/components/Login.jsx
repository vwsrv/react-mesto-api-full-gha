/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from 'react-hook-form'

export default function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isValid
        }
    } = useForm({
        mode: "onBlur"
    })

    function onSubmit() {
        onLogin({ email, password })
    }

    return (
        <div className="auth">
            <p className="auth__title">Вход</p>
            <form className="auth__form"
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off">
                <fieldset className="popup__set">
                    <label className="popup__field" htmlFor="user-email">
                        <input
                            {...register('email', {
                                required: 'Поле, обязательное к заполнению',
                            })}
                            onChange={(e) => { setEmail(e.target.value) }}
                            value={email}
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
                            })}
                            onChange={(e) => { setPassword(e.target.value) }}
                            value={password}
                            type="password"
                            className="auth__input auth__input_type-password"
                            placeholder="Пароль"
                            autoComplete="off" />
                        {errors?.password && <span className="popup__input-error name-input-error popup__error_visible">{errors?.password?.message}</span>}
                    </label>
                    <button type="submit" className={isValid ? `auth__submit-btn` : `auth__submit-btn_inactive`}>Войти</button>
                </fieldset>
            </form>
        </div>
    )
}