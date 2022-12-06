import React, { memo, useEffect } from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { Handle, useUpdateNodeInternals, } from "reactflow";
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
            EXTENSION
          </Typography>
        </div>
      </Tooltip>
      <Box style={{ paddingTop: 20, paddingBottom: 20, paddingLeft: 35, paddingRight: 35, display: "flex", justifyContent: "center" }}>
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

          }}
        />
      </Tooltip>
    </div>

  );
});
