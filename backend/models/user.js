import mongoose from 'mongoose';
import validate from 'validator';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Минимальная длина - 2 сивмола'],
    maxlength: [40, 'Максимальная длина - 40 символов'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, 'Минимальная длина - 2 сивмола'],
    maxlength: [30, 'Максимальная длина - 40 символов'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return validate.isURL(v);
      },
      message: (props) => `${props.value} укажите корректную ссылку на изображение`,
    },
  },
  email: {
    type: String,
    unique: true,
    required: {
      value: true,
      message: 'Поле email является обязательным',
    },
    validate: {
      validator(v) {
        return validate.isEmail(v);
      },
      message: (props) => `${props.value} не является действительной почтой!`,
    },
  },
  password: {
    type: String,
    required: {
      value: true,
      message: 'Поле password является обязательным',
    },
    select: false,
  },
}, { versionKey: false, timestamps: true });

const User = mongoose.model('user', userSchema);

export default User;
