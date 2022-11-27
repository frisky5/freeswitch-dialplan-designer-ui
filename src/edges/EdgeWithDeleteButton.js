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
        x={labelX - foreignObjectSize / 2}
        y={labelY - foreignObjectSize / 2}
      >
        <IconButton
          size="small"
          style={{ color: "#000", background: "#FFF", marginTop: 5 }}
          onClick={() => {
            props.data.askDeleteEdge(props.id);
          }}
        >
          <HighlightOffIcon fontSize="small" />
        </IconButton>
      </foreignObject>
    </>
  );
}
