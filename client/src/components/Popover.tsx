import React, { FC, useState } from "react";
import cl from "classnames";
type PortalProps = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  handleOnClick: (name: string) => void;
  right?: string;
  left?: string;
  top?: string;
  bottom?: string;
  width?: string;
};

const Popover: FC<PortalProps> = ({
  isOpen,
  handleOnClick,
  setOpen,
  right,
  left,
  top,
  bottom,
  width,
}) => {
  const [input, setInput] = useState<string>("");
  if (!isOpen) {
    return null;
  }
  const handleInput = (): void => {
    handleOnClick(input);
    setInput("");
  };
  return (
    <div
      className={cl(
        "absolute p-2 rounded shadow-2xl z-10 w-1/6 h-30 bg-gray-300 flex flex-col justify-between",
        {
          [`right-${right}`]: right,
          [`left-${left}`]: left,
          [`top-${top}`]: top,
          [`bottom-${bottom}`]: bottom,
          [`w-${width}`]: width,
        }
      )}
    >
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        className="mb-2 rounded p-1"
      />
      <div className="flex justify-between w-1/3">
        <button
          onClick={handleInput}
          className="bg-green-400 font-medium text-white px-4 rounded mr-2"
        >
          Ok
        </button>
        <button
          onClick={() => setOpen(false)}
          className="text-white font-medium bg-red-400 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
export default Popover;
