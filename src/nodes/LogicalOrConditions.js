import React, { memo } from "react";
import {
  Box,
  Tooltip,
  Typography,
  IconButton,
} from "@mui/material";
import { Handle, } from "reactflow";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default memo(({ data, id, type, selected }) => {

  return (
    <React.Fragment>
      <Box
        className="custom-drag-handle"
        style={{
          height: "27px",
          borderBottom: "2px solid",
          borderColor: "inherit",
          marginRight: "10px",
          marginLeft: "10px"
        }}
      >
        <Typography align="center">
          Single Condition
        </Typography>
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
        <Tooltip title="Match" arrow disableInteractive>
          <Handle
            id={data.matchHandleId}
            position="right"
            style={{ backgroundColor: "#2ecc71" }}
          />
        </Tooltip>
        <Tooltip title="No Match" arrow disableInteractive>
          <Handle
            id={data.noMatchHandleId}
            position="right"

          />
        </Tooltip>
      </div>
    </React.Fragment>
  );
});
