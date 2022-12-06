import { Box, IconButton, Typography, Tooltip } from "@mui/material";
import React, { memo } from "react";
import { Handle } from "reactflow";
import EditIcon from '@mui/icons-material/Edit';
export default memo(({ id, type, data }) => {
  return (
    <div
      className="default_node"
      style={{ borderColor: "#2ecc71" }}
    >
      <Handle
        id={data.inputHandleId}
        type="target"
        position="left"
        className={"red_left_handle"}
        style={{
          top: "55%",

        }}
      />
      <Tooltip title={data.name} arrow>
        <div
          className="custom-drag-handle"
          style={{
            borderBottom: "2px solid",
            borderColor: "inherit",
            padding: 5
          }}
        >
          <Typography align="center" variant="h6">
            ACTION
          </Typography>
        </div>
      </Tooltip>

      <Box style={{ paddingTop: 20, paddingBottom: 20, paddingLeft: 35, paddingRight: 35, display: "flex", gap: 15, justifyContent: "center" }}>
        <IconButton
          variant={"contained"}
          style={{ background: "#2ecc71", color: 'white' }}
          onClick={() => {
            data.openConfig(id, type);
          }}
        >
          <EditIcon />
        </IconButton>

      </Box>

      <Handle
        id={data.nextExtensionHandleId}
        className={"red_right_handle"}
        position="right"
        style={{
          top: "55%",

        }}
      />

    </div>
  );
});
