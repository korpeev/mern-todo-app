import { useState } from 'react';
import IFormUserState from '../types/IFormUserState';
import IUserInputData from '../types/IUserInputData';

const validateEmail = (email: string): Boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const useForm = (callback: (user: IUserInputData) => void) => {
  const [user, setUser] = useState<IFormUserState>({
    username: {
      value: '',
      errorText: '',
      dirty: false,
    },
    email: {
      value: '',
      errorText: 'Поле не должен быть пустым',
      dirty: false,
    },
    password: {
      value: '',
      errorText: 'Поле не должен быть пустым',
      dirty: false
    }
  })
  const blurHandler = (event: React.FocusEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    switch (name) {
      case 'username':
        setUser(prev => ({ ...prev, [name]: { ...prev[name], dirty: value.trim().length === 0 } }))
        break
      case 'email':
        setUser(prev => ({ ...prev, [name]: { ...prev[name], dirty: !validateEmail(value), errorText: 'Ошибка валидаций' } }))
        break
      case 'password':
        setUser(prev => ({ ...prev, [name]: { ...prev[name], dirty: value.trim().length === 0 || value.length <= 3 } }))
        break
    }
  }
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    switch (name) {
      case 'username': {
        console.log(value)
        setUser(prev => ({ ...prev, [name]: { value, dirty: false, errorText: '' } }))
        if (value.length < 3) {
          setUser(prev => ({ ...prev, [name]: { ...prev[name], dirty: true, errorText: 'Должно быть больше 3 символов' } }))
        }
        break
      }
      case 'email': {
        if (value.length) {
          setUser(prev => ({ ...prev, [name]: { value, dirty: false, errorText: '' } }))
        }
        if (!validateEmail(value)) {
          setUser(prev => ({ ...prev, [name]: { value, dirty: true, errorText: 'Ошибка валидаций' } }))
        }
        break
      }
      case 'password': {
        setUser(prev => ({ ...prev, [name]: { value: value, dirty: false, errorText: '' } }))
        if (value.trim().length <= 3) {
          setUser(prev => ({ ...prev, [name]: { ...prev[name], dirty: true, errorText: 'Должно быть больше 3 символов' } }))
        }


        break
      }
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload: IUserInputData = {
      username: user.username.value,
      email: user.email.value,
      password: user.password.value
    }
    callback(payload)
  }
  return { blurHandler, user, onChangeHandler, handleSubmit }
}

export default useForm