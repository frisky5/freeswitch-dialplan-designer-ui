import React from "react";

export default () => {
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
    </aside>
  );
};
