import React, { FC, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../redux/actions/todoActions";
import { ITodoUpdateRequest, TodoItemProps } from "../types/todos";
import cl from "classnames";
import Popover from "./Popover";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useLocation } from "react-router";

const TodoItem: FC<TodoItemProps> = ({
  id,
  userID,
  complete,
  createdAt,
  updatedAt,
  folderID,
  name,
}: TodoItemProps) => {
  const normalizeDate = useCallback((dateType: Date): string => {
    const createdDate = new Date(dateType).toLocaleString();
    const [date, time] = createdDate.split(",");
    const normalizedTime = time.slice(0, -3);
    return `${date} - ${normalizedTime}`;
  }, []);
  let location = useLocation();
  const [checked, setChecked] = useState<boolean>(complete);
  const [popup, setPopup] = useState<boolean>(false);
  const dispatch = useDispatch();
  const folders = useTypedSelector((state) => state.folderReducer.folders);
  const currentFolderName = folders.find((f) => f.id === folderID)?.name;
  const onComplete = (): void => {
    setChecked(!checked);
    const payload: ITodoUpdateRequest = {
      complete: !checked,
    };
    dispatch(updateTodo(payload, userID, id));
  };

  const onRenameTitle = (name: string): void => {
    if (!name.length) {
      alert("Поле не должно быть пустым");
      return;
    }
    const payload: ITodoUpdateRequest = {
      name,
      updatedAt: new Date(),
    };
    dispatch(updateTodo(payload, userID, id));
    setPopup(false);
  };
  const onDeleteTodo = (): void => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="relative">
      <span className="font-bold">
        {location.pathname === "/home" && `Folder: ${currentFolderName}`}
      </span>
      <li className="flex justify-between w-1/1 p-4 items-center hover:bg-green-400 cursor-pointer m-3 rounded-md hover:text-white transition ease-in-out duration-300">
        {" "}
        <div className="items-center flex font-bold w-32">
          <input
            type="checkbox"
            onChange={onComplete}
            checked={checked}
            className="mr-5"
          />
          <span className={cl({ "line-through": checked })}>{name}</span>
        </div>
        <div className="relative">
          <span className="font-bold mr-2">
            Created: {normalizeDate(createdAt)}
          </span>
          <span className="font-bold">
            {updatedAt && `Updated: ${normalizeDate(updatedAt)}`}
          </span>
        </div>
        <div className="w-16 flex justify-between">
          <button onClick={() => setPopup(true)}>
            <svg
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              width="16px"
              height="16px"
              viewBox="0 0 217.855 217.855"
              xlinkHref="data:image/png;base64,"
              xmlSpace="preserve"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              className="transform hover:scale-125 transition linear stroke-current text-red-400 "
            >
              <path
                fill="#000"
                d="M215.658,53.55L164.305,2.196C162.899,0.79,160.991,0,159.002,0c-1.989,0-3.897,0.79-5.303,2.196L3.809,152.086c-1.35,1.352-2.135,3.166-2.193,5.075l-1.611,52.966c-0.063,2.067,0.731,4.069,2.193,5.532c1.409,1.408,3.317,2.196,5.303,2.196c0.076,0,0.152-0.001,0.229-0.004l52.964-1.613c1.909-0.058,3.724-0.842,5.075-2.192l149.89-149.889C218.587,61.228,218.587,56.479,215.658,53.55z M57.264,201.336l-42.024,1.28l1.279-42.026l91.124-91.125l40.75,40.743L57.264,201.336z M159,99.602l-40.751-40.742l40.752-40.753l40.746,40.747L159,99.602z"
              />
            </svg>
          </button>
          <button onClick={onDeleteTodo}>
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="16px"
              height="16px"
              viewBox="0 0 330 330"
              xmlSpace="preserve"
              className="transform hover:scale-125 transition linear"
            >
              <path
                d="M240,121.076H30V275c0,8.284,6.716,15,15,15h60h37.596c19.246,24.348,49.031,40,82.404,40c57.897,0,105-47.103,105-105
          C330,172.195,290.816,128.377,240,121.076z M225,300c-41.355,0-75-33.645-75-75s33.645-75,75-75s75,33.645,75,75
          S266.355,300,225,300z"
              />

              <path
                d="M240,90h15c8.284,0,15-6.716,15-15s-6.716-15-15-15h-30h-15V15c0-8.284-6.716-15-15-15H75c-8.284,0-15,6.716-15,15v45H45
          H15C6.716,60,0,66.716,0,75s6.716,15,15,15h15H240z M90,30h90v30h-15h-60H90V30z"
              />

              <path
                d="M256.819,193.181c-5.857-5.858-15.355-5.858-21.213,0L225,203.787l-10.606-10.606c-5.857-5.858-15.355-5.858-21.213,0
          c-5.858,5.858-5.858,15.355,0,21.213L203.787,225l-10.606,10.606c-5.858,5.858-5.858,15.355,0,21.213
          c2.929,2.929,6.768,4.394,10.606,4.394c3.839,0,7.678-1.465,10.607-4.394L225,246.213l10.606,10.606
          c2.929,2.929,6.768,4.394,10.607,4.394c3.839,0,7.678-1.465,10.606-4.394c5.858-5.858,5.858-15.355,0-21.213L246.       213,225
          l10.606-10.606C262.678,208.535,262.678,199.039,256.819,193.181z"
              />
            </svg>
          </button>
        </div>
      </li>
      <Popover
        isOpen={popup}
        handleOnClick={onRenameTitle}
        setOpen={setPopup}
        top="6"
        right="32"
        width="13"
      />
    </div>
  );
};

export default TodoItem;
