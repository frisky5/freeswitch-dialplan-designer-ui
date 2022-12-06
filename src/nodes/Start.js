import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { memo } from "react";
import { Handle } from "reactflow";


export default memo(({ data, isConnectable }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ecf0f1",
        border: "solid 2px",
        borderRadius: "9px",
        borderColor: "#27ae60",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Handle
        id={data.handleId}
        type="source"
        position="right"
        isConnectable={isConnectable}
        className={"red_right_handle"}
        style={{
          right: 0
        }}
      />
      <Typography align="center" variant="h6" style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 25, paddingRight: 25 }}>
        Start
      </Typography>
    </div>
  );
});
