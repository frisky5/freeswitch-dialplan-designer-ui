import { Box, Button, Tooltip, Typography } from "@mui/material";
import { memo } from "react";

import { Handle } from "react-flow-renderer";

const handleWrapperStyle = {
  display: "flex",
  position: "absolute",
  height: "100%",
  right: 0,
  top: 0,
  flexDirection: "column",
  justifyContent: "space-between",
  paddingTop: "45px",
  paddingBottom: "20px",
};

export default memo(({ id, selected, data }) => {
  return (
    <div
      style={{
        borderRadius: "9px",
        height: "100%",
        boxShadow: selected
          ? "#B4CF66 0px 2px 4px 0px, #B4CF66 0px 2px 16px 0px"
          : "",
      }}
    >
      <Box
        className="custom-drag-handle"
        style={{
          borderTopLeftRadius: "9px",
          borderTopRightRadius: "9px",
          background: "#146152",
          height: "35px",
        }}
      >
        <Typography
          style={{ padding: "5px", paddingLeft: "15px", color: "white" }}
        >
          Extension
        </Typography>
      </Box>
      <Box padding={2}>
        <Tooltip title={data.name} arrow disableInteractive>
          <Button
            fullWidth
            variant={"outlined"}
            style={{ color: "white", background: "#146152", border: "none" }}
            onClick={() => {
              data.openConfig(id, "extension");
            }}
          >
            Configure
          </Button>
        </Tooltip>
      </Box>
      <Tooltip title="Input" arrow disableInteractive>
        <Handle
          id={data.inputHandleId}
          type="target"
          position="left"
          style={{
            border: "none",
            background: "#FF5A33",
            transform: "translate(-1.4px,0px)",
          }}
        />
      </Tooltip>
      <div style={handleWrapperStyle}>
        <Tooltip title="Extension content" arrow disableInteractive>
          <Handle
            id={data.extensionContentHandleId}
            position="right"
            style={{
              position: "relative",
              top: "auto",
              border: "none",
              background: "#FF5A33",
              transform: "translate(1.4px,0px)",
            }}
          />
        </Tooltip>
        <Tooltip
          title="No Match, Connect to Extension"
          arrow
          disableInteractive
        >
          <Handle
            id={data.nextExtensionHandleId}
            position="right"
            style={{
              position: "relative",
              top: "auto",
              border: "none",
              background: "#FF5A33",
              transform: "translate(1.4px,0px)",
            }}
          />
        </Tooltip>
      </div>
    </div>
  );
});
