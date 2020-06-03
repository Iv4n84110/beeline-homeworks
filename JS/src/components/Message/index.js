import React from "react";
import Avatar from "../Avatar";

import "./index.css";

const Message = (props) => (
  <div className="message-wrapper">
    <Avatar by={props.by} />
<p className={"massage " + props.by + "-message"}>{props.text}</p>
  </div>
);

export default Message;
