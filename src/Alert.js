import React from "react";

function Alert({ message, status="danger" }) {
  return (
    <div className={`alert alert-${status}`}>
      {message}
    </div>
  );
}

export default Alert;