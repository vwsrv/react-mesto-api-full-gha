/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react-hook-form'

export default function Input({ className, type, inputName, placeholder, defaultValue, errorMessage, onBlur, onChange }) {
    const [value, setValue] = useState(value || '');

    useEffect(() => {
        setValue(value)
    }, [value])

    return (
        <div htmlFor={`popup__input_type_${className}`} className="popup__field">
            <input
                onBlur={onBlur}
                type={type}
                autoComplete='off'
                name={inputName}
                className={`popup__input popup__input_type_${className}`}
                placeholder={placeholder}
                onChange={onChange}
                value={defaultValue} />
            <span className={`popup__input-error ${inputName}-input-error`}>{errorMessage ? errorMessage : ''}</span>
        </div>
    )
}
