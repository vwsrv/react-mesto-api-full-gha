/* eslint-disable react/prop-types */
export default function PopupWithForm({ name, title, children, isOpen, onClose, onSubmit, buttonText, buttonTextLoading, isLoading, isValid }) {

    return (
        <div className={`popup popup_form_${name} ${isOpen && 'popup_opened'}`}>
            <div className={`popup__container popup__container-${name}`}>
                <button
                    type="reset"
                    className="popup__close-btn"
                    aria-label="Закрыть"
                    onClick={onClose} />
                <h2 className={`popup__title popup__title_${name}`}>{title}</h2>
                <form
                    className="popup__form"
                    name={name}
                    onSubmit={onSubmit}>
                    <fieldset className="popup__set">
                        {children}
                        <button
                            type="submit"
                            className={isValid ? `popup__submit-btn` : `popup__submit-btn_inactive`}
                            aria-label="Сохранить"
                        >{isLoading ? `${buttonTextLoading}` : `${buttonText}`}</button>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}