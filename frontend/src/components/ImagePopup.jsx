/* eslint-disable react/prop-types */
export default function ImagePopup({ card, onClose }) {

    return (
        <div className={`popup popup_form_image ${card ? 'popup_opened' : ''}`}>
            <div className="popup__container-image">
                <button type="reset"
                    className="popup__close-btn"
                    aria-label="Закрыть"
                    onClick={onClose} />
                <img src={card?.link}
                    alt={card?.name}
                    className="popup__picture" />
                <p className="popup__caption">{card?.name}</p>
            </div>
        </div>
    )
}