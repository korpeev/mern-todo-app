import React, { FC, useState } from "react";
import { FolderProps } from "../types/folder";
import cl from "classnames";
import Popover from "./Popover";
import { useDispatch } from "react-redux";
import { deleteFolder, updateFolder } from "../redux/actions/folderAction";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useNavigate } from "react-router";
import {
  fetchTodosByFolder,
  removeTodosByFolder,
} from "../redux/actions/todoActions";

const FolderItem: FC<FolderProps> = ({
  id,
  name,
  activeClassName,
  setActiveClassName,
}) => {
  const [popup, setPopup] = useState<boolean>(false);
  let navigate = useNavigate();
  const userId = useTypedSelector((state) => state.userReducer.id);
  const dispatch = useDispatch();
  const handleDelete = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    dispatch(deleteFolder(userId, id));
    dispatch(removeTodosByFolder(id, userId));
  };
  const onClickFolder = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(fetchTodosByFolder(userId, id));
    setActiveClassName(id);
    navigate(id);
  };
  const handleShowPopup = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setPopup(true);
  };
  const handleUpdate = (input: string) => {
    const payload = {
      id,
      name: input,
      pinned: false,
    };
    if (!input.length) {
      alert("Поле не должно быть пустым!");
      setPopup(false);
      return;
    }
    dispatch(updateFolder(userId, id, payload));

    setPopup(false);
  };

  return (
    <div className="relative">
      <li
        onClick={onClickFolder}
        className={cl(
          " flex mt-2 font-medium cursor-pointer p-2 transition ease-in justify-around z-0 hover:bg-green-100 relative ",
          {
            "bg-green-400 text-white hover:bg-green-400":
              popup || activeClassName === id,
          }
        )}
      >
        <span className="w-40">{name}</span>
        <div className="w-1/4 flex justify-around">
          <button onClick={handleShowPopup}>
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
          <button onClick={handleDelete}>
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
                c2.929,2.929,6.768,4.394,10.607,4.394c3.839,0,7.678-1.465,10.606-4.394c5.858-5.858,5.858-15.355,0-21.213L246.213,225
                l10.606-10.606C262.678,208.535,262.678,199.039,256.819,193.181z"
              />
            </svg>
          </button>
        </div>
      </li>

      <Popover
        isOpen={popup}
        handleOnClick={handleUpdate}
        setOpen={setPopup}
        top="12"
        width="full"
      />
    </div>
  );
};

export default FolderItem;
