/* eslint-disable react/prop-types */
import PopupWithForm from "./PopupWithForm.jsx";

export default function ConfirmPopup({ isOpen, isLoading, onClose, handleSubmit }) {

    function handleSubmitt(e) {
        e.preventDefault()
        handleSubmit()
    }

    return (
        <PopupWithForm
            isValid={true}
            name='confirm'
            title='Вы уверены'
            isOpen={isOpen}
            onClose={onClose}
            buttonText='Да'
            buttonTextLoading='Удаление...'
            isLoading={isLoading}
            onSubmit={handleSubmitt}
        >
        </PopupWithForm>
    )
}