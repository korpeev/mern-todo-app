import React from "react";
import useForm from "../hooks/useForm";
import cl from "classnames";
import { useDispatch } from "react-redux";
import { userAuth } from "../redux/actions/userActions";
import IUserInputData from "../types/IUserInputData";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Link } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const error = useTypedSelector((state) => state.userReducer.error);
  const login = (userData: IUserInputData) => {
    dispatch(userAuth(userData, "/login"));
  };
  const { blurHandler, user, onChangeHandler, handleSubmit } = useForm(login);

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} style={{ height: "300px" }}>
        <div className="mb-4">
          <div>
            <label className="font-bold">Email</label>
            <label className="ml-2 font-medium text-red-400">
              {user.email.dirty && user.email.errorText && user.email.errorText}
            </label>
          </div>
          <input
            onBlur={blurHandler}
            onChange={onChangeHandler}
            value={user.email.value}
            type="email"
            name="email"
            className={cl("w-full p-1 border-2 border-gray-400 rounded", {
              "border-red-400": user.email.dirty,
            })}
          />
        </div>
        <div className="mb-4">
          <div>
            <label className="font-bold">Passowrd</label>
            <label className="ml-2 font-medium text-red-400">
              {user.password.dirty &&
                user.password.errorText &&
                user.password.errorText}
            </label>
          </div>
          <input
            onBlur={blurHandler}
            className={cl("w-full p-1 border-2 border-gray-400 rounded", {
              "border-red-400 border-2": user.password.dirty,
            })}
            value={user.password.value}
            onChange={onChangeHandler}
            type="password"
            name="password"
          />
        </div>
        <div
          className="flex justify-between items-center"
          style={{ width: "300px" }}
        >
          <button
            type="submit"
            className="w-1/2 font-bold text-white bg-green-400 p-2 rounded-md"
          >
            Login
          </button>

          <Link to="/auth/register" className="cursor-pointer">
            {"Not have account?"}
          </Link>
        </div>
        <div className="mt-5 p-2 text-center">
          {error && error.length > 0 && (
            <span className="font-medium text-red-500">{error}</span>
          )}
        </div>
      </form>
    </>
  );
};

export default Login;
