import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { createTodo, fetchTodos } from "../redux/actions/todoActions";
import { ITodoData } from "../types/todos";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const dispatch = useDispatch();
  const userId = useTypedSelector((state) => state.userReducer.id);
  const { todos } = useTypedSelector((state) => state.todoReducer);
  const folders = useTypedSelector((state) => state.folderReducer.folders);
  const [inputText, setInputText] = useState<string>("");
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const { folderId } = useParams();
  const currentFolder = folders.find((f) => f.id === folderId);
  const handleCreateTodo = () => {
    if (inputText.length === 0) {
      alert("Поле не должно быть пустым");
      return;
    }
    const payload: ITodoData = {
      name: inputText,
      userID: userId,
      folderID: currentFolder?.id,
    };
    dispatch(createTodo(payload));
    setInputText("");
  };
  useEffect(() => {
    dispatch(fetchTodos(userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="w-max flex-1">
      <div className="rounded-xl p-5 m-5 shadow-2xl border flex flex-col h-screen">
        <h1 className="text-center text-2xl">
          {currentFolder ? currentFolder.name : "All"}
        </h1>
        <ul>
          {todos.length > 0 ? (
            todos.map((todo) => (
              <TodoItem key={todo.id} currentFolder={currentFolder} {...todo} />
            ))
          ) : (
            <div className="text-2xl text-center m-5 font-bold ">
              List not found
            </div>
          )}
        </ul>
        <div className="flex justify-between px-6">
          <input
            value={inputText}
            onChange={handleOnChange}
            type="text"
            className="w-11/12 border border-gray-300 rounded-md focus:outline-"
          />
          <button
            onClick={handleCreateTodo}
            className="transition ease-in hover:text-4xl text-2xl rounded bg-green-400 py-2 px-5 text-white font-bold transform hover:scale-110"
          >
            +
          </button>
        </div>
      </div>
    </section>
  );
};

export default TodoList;
