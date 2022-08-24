import { Button } from "@mui/material";
import React from "react";

export default function NodesSidebar(props) {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, "extension")}
        draggable
      >
        Extension
      </div>
      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, "condition")}
        draggable
      >
        Condition
      </div>
      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, "action")}
        draggable
      >
        Action
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "ivrMenu")}
        draggable
      >
        IVR Menu Node
      </div>
      <Button onClick={props.export}>Export</Button>
    </aside>
  );
}
