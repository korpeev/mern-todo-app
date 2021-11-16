import React from "react";
import Loader from "react-loader-spinner";
const LoaderComponent = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Loader
        type="Bars"
        color="#34D399"
        height={100}
        width={100}
        timeout={3000}
      />
    </div>
  );
};

export default LoaderComponent;
