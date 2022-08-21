import { Box, Tooltip, Typography, Button } from "@mui/material";
import React, { memo, useEffect, useState } from "react";

import { Handle } from "react-flow-renderer";

import { useUpdateNodeInternals } from "react-flow-renderer";
import GenericAccordion from "../components/GenericAccordion";
import TextField from "../components/TextField";

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
  const [expandedConfig, setExpandedConfig] = useState(false);
  const [name, setName] = useState(data.name);

  useEffect(() => {
    if (!selected) setExpandedConfig(false);
  }, [selected]);
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
      <Box p={2}>
        <Button
          variant={"outlined"}
          onClick={() => {
            data.openConfig(id, "extension");
          }}
        >
          Configure
        </Button>
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
          onSave={() => {}}
        >
          <TextField
            id={"name" + id}
            label="Name"
            type="text"
            value={name}
            onChange={(value) => {
              setName(value);
            }}
            error={name !== data.name}
            onClick={() => {
              data.saveChanges(id, { name: name });
            }}
          />
        </GenericAccordion>
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
          <Tooltip
            title="Match, connect to Condition or Action"
            arrow
            disableInteractive
          >
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
      </Box>
    </div>
  );
});
