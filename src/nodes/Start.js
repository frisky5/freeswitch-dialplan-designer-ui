import React, { memo } from "react";
import { Handle } from "react-flow-renderer";

export default memo(({ data, isConnectable }) => {
  return (
    <Handle
      id={data.handleId}
      type="source"
      position="right"
      isConnectable={isConnectable}
      style={{
        border: "none",
        background: "#59CE8F",
        minHeight: "39px",
        minWidth: "39px",
        transform: "translate(-3px,-20px)",
      }}
    />
  );
});
