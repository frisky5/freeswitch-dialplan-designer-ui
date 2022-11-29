import React, { memo } from "react";
import { Handle } from "reactflow";
import startIcon from "../assests/start.png"
export default memo(({ data, isConnectable }) => {
  return (
    <React.Fragment>
      <div
        style={{
          height: "75px",
          width: "75px",
        }}
      >
        <img width={"100%"} src={startIcon} alt="start" />
      </div>
      <Handle
        id={data.handleId}
        type="source"
        position="right"
        isConnectable={isConnectable}
        style={{
          position: "relative",
          top: "auto",
          border: "none",
          width: "8px",
          height: "8px",
          background: "#fd1c03",
          transform: "translate(68px, -41.5px)"
        }}
      />
    </React.Fragment>
  );
});
