import React, { memo, useEffect } from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { Handle, useUpdateNodeInternals } from "reactflow";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default memo(({ id, type, data }) => {

  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    updateNodeInternals(id);
  }, []);

  return (
    <React.Fragment>
      <Box
        className="custom-drag-handle"
        style={{
          height: "27px",
          borderBottom: "2px solid",
          borderColor: "inherit",
          marginRight: "5px",
          marginLeft: "5px"
        }}
      >
        <Tooltip title={data.name} arrow>
          <Typography
            align="center"
          >
            Extension
          </Typography>
        </Tooltip>
      </Box>
      <Box padding={2} style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <IconButton
          variant={"contained"}
          style={{ background: "#2ecc71", color: 'white' }}
          size="small"
          onClick={() => {
            data.openConfig(id, type);
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          variant={"contained"}
          style={{ background: "#e74c3c", color: 'white' }}
          size="small"
          onClick={() => {
            data.openDeleteNode(id);
          }}
        >
          <DeleteForeverIcon fontSize="small" />
        </IconButton>
      </Box>
      <Handle
        id={data.inputHandleId}
        type="target"
        position="left"
      />
      <div className="right_handles_wrapper">
        <Tooltip
          title="Extension content"
          arrow
          disableInteractive
        >
          <Handle
            id={data.extensionContentHandleId}
            position="right"
            style={{ backgroundColor: "#2ecc71" }}
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
          />
        </Tooltip>
      </div>
    </React.Fragment>
  );
});
