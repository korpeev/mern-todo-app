import React from "react";
import { Routes, Route } from "react-router";
import LoaderComponent from "../components/Loader";
import { useTypedSelector } from "../hooks/useTypedSelector";
import Login from "./Login";
import Register from "./Register";

const Landing = () => {
  const isLoading = useTypedSelector((state) => state.userReducer.isLoading);

  if (isLoading) {
    return <LoaderComponent />;
  }

  return (
    <div className="w-full h-screen flex">
      <div className="items-center flex w-1/2 max-w-sm mx-auto">
        <div
          className="absolute inset-auto m-auto "
          style={{ height: "300px" }}
        >
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Routes>
        </div>
      </div>
      <div className="w-1/2 bg-green-400"></div>
    </div>
  );
};

export default Landing;
