import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { memo, useEffect, useState } from "react";
import GenericAccordion from "../components/GenericAccordion";
import TextField from "../components/TextField";

import { Handle, useUpdateNodeInternals } from "reactflow";
import { v4 as uuidv4 } from "uuid";

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

const handleStyle = {
  position: "relative",
  transform: "none",
  top: "auto",
  color: "red",
};

const inputHandleId = uuidv4();
export default memo(({ data, id }) => {
  const [expandedConfig, setExpandedConfig] = useState(false);
  const [expanded, setExpanded] = useState("");
  const [name, setName] = useState(data.name);
  const [noOfOutput, setNoOfOutput] = useState(0);
  const [timeout, setTimeout] = useState(0);
  const [interDigitTimeout, setInterDigitTimeout] = useState(0);
  const [maxFailure, setMaxFailure] = useState(0);
  const [digitLength, setDigitLength] = useState(0);
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    updateNodeInternals(id);
  }, []);

  return (
    <React.Fragment>
      <Box
        mb={1}
        className="custom-drag-handle"
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "flex-start",
          borderBottom: "solid",
          borderWidth: "1px",
        }}
      >
        <Typography style={{ marginTop: "5px", marginLeft: "15px" }}>
          Menu
        </Typography>
        <IconButton
          size="small"
          style={{ marginRight: "20px" }}
          onClick={() => {
            data.askDeleteNode(id);
          }}
        >
          <DeleteOutlineIcon fontSize="medium" />
        </IconButton>
      </Box>
      <Box>
        <Box pl={2} pr={2} mb={2}>
          <GenericAccordion
            expanded={expandedConfig}
            onChange={() => {
              setExpandedConfig(!expandedConfig);
            }}
            title={"Configuration"}
          >
            <GenericAccordion
              expanded={expanded === "menuConfig"}
              onChange={() => {
                if (expanded !== "menuConfig") setExpanded("menuConfig");
                else setExpanded(false);
              }}
              title={"Menu Configuration"}
            >
              <Stack spacing={2}>
                <TextField
                  id={"a" + id}
                  type="text"
                  label="Name"
                  value={name}
                  onChange={(value) => {
                    setName(value);
                  }}
                  error={data.name !== name}
                  onClick={() => {
                    const temp = data;
                    data.saveChanges(data);
                  }}
                />
                <TextField
                  id={"b" + id}
                  label="Number of output ports"
                  type="number"
                  value={noOfOutput}
                  onChange={(value) => {
                    setNoOfOutput(value);
                  }}
                  error={data.noOfOutput !== noOfOutput}
                />
                <TextField
                  id={"c" + id}
                  label="timeout"
                  type="number"
                  value={timeout}
                  onChange={(value) => {
                    setTimeout(value);
                  }}
                  error={timeout !== data.timeout}
                />
                <TextField
                  id={"d" + id}
                  label="inter-digit-timeout"
                  type="number"
                  value={interDigitTimeout}
                  onChange={(value) => {
                    setInterDigitTimeout(Number(value));
                  }}
                  error={interDigitTimeout !== data.interDigitTimeout}
                />
                <TextField
                  id={"e" + id}
                  label="max-failure"
                  type="number"
                  value={maxFailure}
                  onChange={(value) => {
                    setMaxFailure(value);
                  }}
                  error={maxFailure !== data.maxFailure}
                />
                <TextField
                  id={"f" + id}
                  label="digit-length"
                  type="number"
                  value={digitLength}
                  onChange={(value) => {
                    setDigitLength(value);
                  }}
                  error={digitLength !== data.digitLength}
                />
                <Button>SAVE ALL</Button>
              </Stack>
            </GenericAccordion>
            <GenericAccordion
              expanded={expanded === "audioConfig"}
              onChange={() => {
                if (expanded !== "audioConfig") setExpanded("audioConfig");
                else setExpanded(false);
              }}
              title={"Audio Configuration"}
            >
              <Stack></Stack>
            </GenericAccordion>
          </GenericAccordion>
        </Box>
        <Tooltip title="Input" arrow>
          <Handle
            id={uuidv4()}
            type="target"
            position="left"
            style={{
              border: "none",
              background: "#FF5A33",
              transform: "translate(-1.4px,0px)",
            }}
          />
        </Tooltip>
        {/* <div style={handleWrapperStyle}>
        {data.output.map((handle) => (
          <Handle
            key={handle.id}
            id={handle.id}
            position={"right"}
            style={handleStyle}
          >
            <div
              style={{
                position: "relative",
                transform: `translate(${handle.text.length * -1 - 10}px, -5px)`,
                fontSize: "10px",
                pointerEvents: "none",
                color: "black",
              }}
            >
              {handle.text}
            </div>
          </Handle>
        ))}
      </div> */}
      </Box>
    </React.Fragment>
  );
});
