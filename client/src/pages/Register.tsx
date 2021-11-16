import React from 'react'
import useForm from '../hooks/useForm'
import cl from 'classnames'
import { useDispatch } from 'react-redux'
import IUserInputData from '../types/IUserInputData'
import { userAuth } from '../redux/actions/userActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { Link } from 'react-router-dom'

const Register = () => {
  const dispath = useDispatch()
  const error = useTypedSelector(state => state.userReducer.error)
  const register = (userData: IUserInputData) => {
    dispath(userAuth(userData, '/register'))
  }
  const { blurHandler, user, onChangeHandler, handleSubmit } = useForm(register)

  return (
    <form onSubmit={(e) => handleSubmit(e)} style={{ height: '300px' }}>
      <div className="mb-4">
        <div>
          <label className='font-bold'>Email</label>
          <label className='ml-2 font-medium text-red-400'>{(user.email.dirty && user.email.errorText) && user.email.errorText}</label>
        </div>
        <input
          onBlur={blurHandler}
          onChange={onChangeHandler}
          value={user.email.value}
          type='email'
          name='email'
          className={cl('w-full p-1 border-2 border-gray-400 rounded',
            { 'border-red-400': user.email.dirty })
          }
        />
      </div>
      <div className="mb-4">
        <div>
          <label className='font-bold'>Username</label>
          <label className='ml-2 font-medium text-red-400'>{(user.username.dirty && user.username.errorText) && user.username.errorText}</label>
        </div>
        <input
          onBlur={blurHandler}
          onChange={onChangeHandler}
          value={user.username.value}
          name='username'
          className={cl('w-full p-1 border-2 border-gray-400 rounded',
            { 'border-red-400': user.username.dirty })
          }
        />
      </div>
      <div className="mb-4">
        <div>
          <label className='font-bold'>Password</label>
          <label className='ml-2 font-medium text-red-400'>{(user.password.dirty && user.password.errorText) && user.password.errorText}</label>
        </div>
        <input
          onBlur={blurHandler}
          onChange={onChangeHandler}
          value={user.password.value}
          name='password'
          type='password'
          className={cl('w-full p-1 border-2 border-gray-400 rounded',
            { 'border-red-400': user.password.dirty })
          }
        />
      </div>
      <div className='flex justify-between items-center'>
        <button className='w-1/2 font-bold text-white bg-green-400 p-2 rounded-md'>Register</button>
        <Link to='/auth/login' className='cursor-pointer'>{'Have Account ?'}</Link>
      </div>
      <div className='mt-5 p-2 text-center'>
        {error && error.length > 0 && <span className='font-medium text-red-500'>{error}</span>}
      </div>
    </form>
  )
}

export default Register
