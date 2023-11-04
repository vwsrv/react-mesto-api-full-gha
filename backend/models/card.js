import mongoose from 'mongoose';
import validate from 'validator';

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: {
      value: true,
      message: 'Поле name является обязательным',
    },
    minlength: [2, 'Минимальная длина - 2 сивмола'],
    maxlength: [30, 'Максимальная длина - 30 символов'],
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validate.isURL(v);
      },
      message: (props) => `${props.value} укажите корректную ссылку на изображение`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false, timestamps: true });

const Card = mongoose.model('card', cardSchema);

export default Card;
