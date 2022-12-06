import React, { memo, useEffect } from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { Handle, useUpdateNodeInternals, Position } from "reactflow";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default memo(({ id, type, data }) => {

  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    updateNodeInternals(id);
  }, []);

  return (
    <div
      className="default_node"
      style={{ borderColor: "#3498db" }}
    >
      <Handle
        id={data.inputHandleId}
        type="target"
        position="left"
        className={"red_left_handle"}
        style={{
          top: "55%",
          left: 0
        }} />
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
            Extension
          </Typography>
        </div>
      </Tooltip>
      <Box style={{ paddingTop: 20, paddingBottom: 20, paddingLeft: 25, paddingRight: 25, display: "flex", gap: 15, justifyContent: "center" }}>
        <IconButton
          variant={"contained"}
          style={{ background: "#2ecc71", color: 'white' }}
          onClick={() => {
            data.openConfig(id, type);
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          variant={"contained"}
          style={{ background: "#e74c3c", color: 'white' }}
          onClick={() => {
            data.openDeleteNode(id);
          }}
        >
          <DeleteForeverIcon />
        </IconButton>
      </Box>
      <Tooltip
        title="Extension content"
        arrow
        disableInteractive
      >
        <Handle
          id={data.extensionContentHandleId}
          position="right"
          className={"red_right_handle"}
          style={{
            top: "50%",
            right: 0
          }}
        />
      </Tooltip>
      <Tooltip
        title="Next Extension"
        arrow
        disableInteractive
      >
        <Handle
          id={data.nextExtensionHandleId}
          position="right"
          className={"red_right_handle"}
          style={{
            top: "80%",
            right: 0
          }}
        />
      </Tooltip>
    </div>

  );
});
