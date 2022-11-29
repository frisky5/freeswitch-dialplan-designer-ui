import { IconButton } from "@mui/material";
import React from "react";
import {
  getBezierPath,

} from "reactflow";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
const foreignObjectSize = 40;

const onEdgeClick = (evt, id) => {
  evt.stopPropagation();
  alert(`remove ${id}`);
};

export default function EdgeWithDeleteButton(props) {
  const edgePath = getBezierPath(props);

  const [path, labelX, labelY] = getBezierPath(props);

  return (
    <>
      <path
        id={props.id}
        style={props.style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={props.markerEnd}
      />
      <foreignObject
        width={50}
        height={50}
        x={labelX}
        y={labelY - 12}
      >
        <HighlightOffIcon
          onClick={() => {
            props.data.askDeleteEdge(props.id);
          }}

          style={{ color: "#e74c3c" }} />
      </foreignObject>
    </>
  );
}
