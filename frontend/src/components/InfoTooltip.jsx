/* eslint-disable react/prop-types */
import succesLogo from '../images/succec__auth.svg';
import errorLogo from '../images/error__auth.svg';

export default function InfoToolTip({ name, isOpen, onClose, authMessage }) {
    return (
        <div className={`popup popup_form_${name} ${isOpen && 'popup_opened'}`}>
            <div className={`popup__container popup__container-${name}`}>
                <button
                    type="reset"
                    className="popup__close-btn"
                    aria-label="Закрыть"
                    onClick={onClose} />
                <img src={authMessage.status ? succesLogo : errorLogo} alt="Статус авторизации" className="popup__image" />
                <h2 className={`popup__title popup__title_${name}`}>{authMessage.text}</h2>
            </div>
        </div>
    )
}