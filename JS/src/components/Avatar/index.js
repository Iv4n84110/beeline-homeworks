import React from "react";

import "./index.css";

function Avatar(props) {
  return (
    <div className="avatar-wrapper">
      <div className={"avatar " + props.by + "-avatar"}></div>
    </div>
  );
}

export default Avatar;
