import React, { useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Routes, Route, Navigate } from "react-router";
import Landing from "../pages/Landing";
import Home from "../pages/Home";
import { checkAuth } from "../redux/actions/userActions";
import { useDispatch } from "react-redux";
import TodoList from "./TodoList";

const App = () => {
  const { isAuth } = useTypedSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Routes>
        <Route
          path="/auth/*"
          element={!isAuth ? <Landing /> : <Navigate to={`/home/*`} />}
        />
        <Route
          path={`/home/*`}
          element={isAuth ? <Home /> : <Navigate to="/auth/login" />}
        >
          <Route path=":folderId" element={<TodoList />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
