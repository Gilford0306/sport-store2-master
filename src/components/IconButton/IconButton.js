import React from "react";

function IconButton({ icon, onClick, size = "37px", color = "red" }) {
  return (
    <button
      className="icon-button"
      onClick={onClick}
      style={{ fontSize: size, color }}
    >
      <i className={`fa fa-${icon}`}></i>
    </button>
  );
}

export default IconButton;
