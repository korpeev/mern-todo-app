import React, { FC } from "react";
import Header from "../components/Header";
import LoaderComponent from "../components/Loader";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
const Home: FC = () => {
  const { isLoading } = useTypedSelector((state) => state.userReducer);
  if (isLoading) {
    return <LoaderComponent />;
  }
  return (
    <div>
      <Header />
      <main className="flex justify-between">
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
};

export default Home;
