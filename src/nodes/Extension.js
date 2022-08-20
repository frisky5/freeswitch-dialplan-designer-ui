import { Box, Button, Tooltip, Typography } from "@mui/material";
import React, { memo, useEffect, useState } from "react";

import { Handle } from "react-flow-renderer";
import { v4 as uuidv4 } from "uuid";

import { Stack } from "@mui/system";
import { useUpdateNodeInternals } from "react-flow-renderer";
import GenericAccordion from "../components/GenericAccordion";
import TextFieldWithConfirmationButton from "../components/TextFieldWithConfirmationButton";

const handleWrapperStyle = {
  display: "flex",
  position: "absolute",
  height: "100%",
  right: 0,
  top: 0,
  flexDirection: "column",
  justifyContent: "space-between",
  paddingTop: "40px",
  paddingBottom: "40px",
};

const inputHandleId = uuidv4();
const matchHandleId = uuidv4();
const noMatchHandleId = uuidv4();

export default memo(({ data, id, selected }) => {
  const updateNodeInternals = useUpdateNodeInternals();
  const [expandedConfig, setExpandedConfig] = useState(false);

  const [name, setName] = useState(data.name);

  useEffect(() => {
    updateNodeInternals(id);
  }, []);

  return (
    <div
      style={{
        borderRadius: "9px",
        height: "100%",
        boxShadow: selected
          ? "rgba(194, 249, 112,1) 0px 2px 4px 0px, rgba(194, 249, 112,1) 0px 2px 16px 0px"
          : "",
      }}
    >
      <Box
        className="custom-drag-handle"
        style={{
          borderTopLeftRadius: "9px",
          borderTopRightRadius: "9px",
          background: "#0096ff",
        }}
      >
        <Typography style={{ marginLeft: "15px" }}>Extension</Typography>
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
        >
          <Stack spacing={2}>
            <TextFieldWithConfirmationButton
              id={"a" + id}
              label="Name"
              type="text"
              value={name}
              onChange={(value) => {
                setName(value);
              }}
              error={name !== data.name}
            />
            <Button
              variant="outlined"
              style={{ color: "green", borderColor: "green" }}
            >
              SAVE ALL
            </Button>
          </Stack>
        </GenericAccordion>
        <Tooltip title="Input" arrow disableInteractive>
          <Handle
            id={inputHandleId}
            type="target"
            position="left"
            style={{
              border: "none",
              background: "#3120E0",
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
              id={data.extensionMatch}
              position="right"
              style={{
                position: "relative",
                top: "auto",
                border: "none",
                background: "#3120E0",
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
                background: "#3120E0",
                transform: "translate(1.4px,0px)",
              }}
            />
          </Tooltip>
        </div>
      </Box>
    </div>
  );
});
