import { Button, Box, Typography } from "@mui/material";
import React from "react";

export default function NodesSidebar(props) {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      <div style={{ display: 'flex', flexDirection: "column", gap: "10px" }}>
        <Typography variant="body" noWrap>
          Drag and Drop nodes on the draw board
        </Typography>
        <div
          className="react-flow__node-extension"
          style={{ height: "50px", cursor: "grab" }}
          onDragStart={(event) => onDragStart(event, "extension")}
          draggable
        >
          <Typography
            align="center"
            onDragStart={(event) => onDragStart(event, "extension")}
          >
            Extension
          </Typography>
        </div>

        <div
          className="react-flow__node-condition"
          style={{ height: "50px", cursor: "grab" }}
          onDragStart={(event) => onDragStart(event, "condition")}
          draggable
        >
          <Typography
            align="center"
            onDragStart={(event) => onDragStart(event, "condition")}
          >
            Condition
          </Typography>
        </div>
        <div
          className="react-flow__node-action"
          style={{ height: "50px", cursor: "grab" }}
          onDragStart={(event) => onDragStart(event, "action")}
          draggable
        >
          <Typography
            align="center"
            onDragStart={(event) => onDragStart(event, "action")}
          >
            Action
          </Typography>
        </div>
        <div
          className="dndnode"
          onDragStart={(event) => onDragStart(event, "ivrMenu")}
          draggable
        >
          IVR Menu Node
        </div>
      </div>

      <Button onClick={props.export}>Export</Button>
    </aside>
  );
}
