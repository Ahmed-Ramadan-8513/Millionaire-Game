import { useRef } from "react"
import "./Start.css"

const Start = ({ setUserName }) => {
  const inputRef = useRef();
  const handelClick = () => {
    inputRef.current.value && setUserName(inputRef.current.value);
  };

  return (
    <div className="start">
      <input
        className="startInput"
        placeholder="Enter Your Name"
        ref={inputRef}
      />
      <button
        onClick={handelClick}
        className="startButton"
        title="start"
        type="button"
      >
        Start
      </button>
    </div>
  );
};

export default Start
