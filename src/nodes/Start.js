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
          transform: "translate(70px, -43px)"
        }}
      />
    </React.Fragment>
  );
});
