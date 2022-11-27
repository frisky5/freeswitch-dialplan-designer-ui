import { Box, Tooltip, Typography } from "@mui/material";
import React, { memo, useEffect, useState } from "react";

import { Handle, useUpdateNodeInternals } from "reactflow";
import GenericAccordion from "../components/GenericAccordion";
import TextField from "../components/TextField";

export default memo(({ id, selected, data }) => {
  const [expandedConfig, setExpandedConfig] = useState(false);
  const [name, setName] = useState(data.name);

  return (
    <div
      style={{
        height: "100%",
        boxShadow: selected
          ? "rgba(90,255,21,1) 0px 2px 4px 0px, rgba(90,255,21,1) 0px 2px 16px 0px"
          : "",
        borderRadius: "7px 7px",
        border: "none",
      }}
    >
      <Box
        className="custom-drag-handle"
        style={{
          borderTopLeftRadius: "7px",
          borderTopRightRadius: "7px",
          background: "#2ecc71",
          height: "35px",
        }}
      >
        <Typography
          style={{ padding: "5px", paddingLeft: "15px", color: "black" }}
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
              transform: "translate(-1px,0px)",
              border: "solid",
              borderWidth: "1px",
              borderColor: "#e74c3c",
              background: "#FFFFFF",
              height: "10px",
              width: "10px",
            }}
          />
        </Tooltip>
        <Tooltip title="Output" arrow disableInteractive>
          <Handle
            id={data.outputHandleId}
            position="right"
            style={{
              transform: "translate(1px,0px)",
              border: "solid",
              borderWidth: "1px",
              borderColor: "#e74c3c",
              background: "#FFFFFF",
              height: "10px",
              width: "10px",
            }}
          />
        </Tooltip>
      </Box>
    </div>
  );
});
