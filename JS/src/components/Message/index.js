import React from "react";
import Avatar from "../Avatar";

import "./index.css";

const Message = (props) => (
  <div className="message-wrapper">
    <Avatar by={props.by} />
    <div className={"message " + props.by + "-message"}>{props.text}</div>
  </div>
);

export default Message;
