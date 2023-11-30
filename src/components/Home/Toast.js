import React from "react";
import { XCircle } from "lucide-react";

function Toast({ msg = "", closeToast }) {
  return (
    <div
      className="duration-500 transition-all
    ease-in-out bg-orange-500 justify-between flex items-center p-4 rounded-md"
    >
      <h2>{msg}</h2>
      <button className="" onClick={closeToast}>
        <XCircle className="text-[1.5rem] ml-5 text-white" />
      </button>
    </div>
  );
}

export default Toast;
