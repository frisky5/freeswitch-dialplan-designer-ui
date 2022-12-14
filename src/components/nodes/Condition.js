import React, { memo } from "react";
import { Box, Tooltip, Typography, IconButton } from "@mui/material";
import { Handle } from "reactflow";
import EditIcon from "@mui/icons-material/Edit";

export default memo(({ data, id, type, selected }) => {
  return (
    <div className="default_node" style={{ borderColor: "#f1c40f" }}>
      <Handle
        id={data.inputHID}
        type="target"
        position="left"
        className={"red_left_handle"}
        style={{ top: "55%" }}
      />
      <Tooltip title={data.name} arrow>
        <div
          className="custom-drag-handle"
          style={{
            borderBottom: "2px solid",
            borderColor: "inherit",
            padding: 5,
          }}
        >
          <Typography align="center" variant="h6">
            CONDITION
          </Typography>
        </div>
      </Tooltip>
      <Box
        style={{
          paddingTop: 20,
          paddingBottom: 20,
          paddingLeft: 25,
          paddingRight: 25,
          display: "flex",
          gap: 15,
          justifyContent: "center",
        }}
      >
        <IconButton
          variant={"contained"}
          style={{ background: "#2ecc71", color: "white" }}
          onClick={() => {
            data.openConfig(id, type);
          }}
        >
          <EditIcon />
        </IconButton>
      </Box>
      <Tooltip title="Actions" arrow disableInteractive>
        <Handle
          id={data.actionsHID}
          position="right"
          className={"red_right_handle"}
          style={{ top: "50%" }}
        />
      </Tooltip>
      <Tooltip title="Anti Actions" arrow disableInteractive>
        <Handle
          id={data.antiActionsHID}
          position="right"
          className={"red_right_handle"}
          style={{ top: "65%" }}
        />
      </Tooltip>
      <Tooltip title="No Match" arrow disableInteractive>
        <Handle
          id={data.noMatchHID}
          position="right"
          className={"red_right_handle"}
          style={{ top: "80%" }}
        />
      </Tooltip>
    </div>
  );
});
