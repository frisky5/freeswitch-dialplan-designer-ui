import { Box, Tooltip, Typography } from "@mui/material";
import React, { memo, useEffect, useState } from "react";

import { Handle, useUpdateNodeInternals } from "react-flow-renderer";
import GenericAccordion from "../components/GenericAccordion";
import TextField from "../components/TextField";

export default memo(({ id, selected, data }) => {
  const [expandedConfig, setExpandedConfig] = useState(false);
  const [name, setName] = useState(data.name);

  return (
    <div
      style={{
        borderRadius: "9px 9px",
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
          background: "#44803F",
          height: "35px",
        }}
      >
        <Typography
          style={{ padding: "5px", paddingLeft: "15px", color: "white" }}
        >
          Action
        </Typography>
      </Box>
      <Box p={2}>
        <GenericAccordion
          expanded={expandedConfig}
          onChange={() => {
            setExpandedConfig(!expandedConfig);
          }}
          title={"Configuration"}
          config
          onDelete={() => {
            data.askDeleteNode(id);
          }}
          onSave={() => {
            data.saveActionChanges();
          }}
        >
          <TextField
            id={"a" + id}
            label="Name"
            type="text"
            value={name}
            onChange={(value) => {
              setName(value);
            }}
            error={name !== data.name}
          />
        </GenericAccordion>
        <Tooltip title="Input" arrow disableInteractive>
          <Handle
            id={data.inputHandleId}
            type="target"
            position="left"
            style={{
              transform: "translate(-2px,0px)",
              border: "none",
              background: "#FF5A33",
            }}
          />
        </Tooltip>
        <Tooltip title="Output" arrow disableInteractive>
          <Handle
            id={data.outputHandleId}
            position="right"
            style={{
              transform: "translate(2px,0px)",
              border: "none",
              background: "#FF5A33",
            }}
          />
        </Tooltip>
      </Box>
    </div>
  );
});
