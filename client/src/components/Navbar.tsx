import React, { useEffect, useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import FolderItem from "./FolderItem";
import { createFolder, fetchFolders } from "../redux/actions/folderAction";
import { useDispatch } from "react-redux";
import Popover from "./Popover";
import { FolderResponse } from "../types/folder";
import cl from "classnames";
import { useLocation, useNavigate } from "react-router";
import { fetchTodos } from "../redux/actions/todoActions";
const Navbar = () => {
  const [popup, setPopup] = useState<boolean>(false);
  const [activeClass, setActiveClass] = useState<null | string>(null);
  const { folders } = useTypedSelector((state) => state.folderReducer);
  const userId = useTypedSelector((state) => state.userReducer.id);
  let location = useLocation();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFolders(userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleCreate = (name: string) => {
    const payload: FolderResponse = {
      name,
      pinned: false,
    };
    dispatch(createFolder(userId, payload));
    setPopup(false);
  };
  const handleAllFolders = (): void => {
    navigate("/home/*");
    setActiveClass(null);
    dispatch(fetchTodos(userId));
  };
  return (
    <aside className="aside w-1/6 mt-5 rounded-md shadow-2xl border-gray-300 h-screen">
      <h1
        className=" border-t
    rounded-t p-2 text-white text-center
    font-bold bg-green-400"
      >
        Folders
      </h1>
      <ul>
        <li
          onClick={handleAllFolders}
          className={cl(
            "flex my-2  font-medium cursor-pointer p-2 transition ease-in z-0 hover:bg-green-100",
            {
              "bg-green-400 text-white hover:bg-green-400":
                location.pathname === "/home/*",
            }
          )}
        >
          <span className="pl-2 font-bold">All</span>
        </li>
        <hr />
        {folders.length > 0 &&
          folders.map((folder) => (
            <FolderItem
              key={folder.id}
              {...folder}
              activeClassName={activeClass}
              setActiveClassName={setActiveClass}
            />
          ))}

        <div className="flex flex-col items-center relative">
          {folders.length === 0 && (
            <span className="mt-5 text-xl font-bold">Folders not Found</span>
          )}
          <div className="text-center mt-5">
            <button
              className="font-medium text-xl"
              onClick={() => setPopup(true)}
            >
              +
            </button>
          </div>
          <Popover
            handleOnClick={handleCreate}
            isOpen={popup}
            setOpen={setPopup}
            left="0"
            top="12"
            width="full"
          />
        </div>
      </ul>
    </aside>
  );
};

export default Navbar;
