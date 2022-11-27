import React, { memo, useEffect, useState } from "react";
import {
  Box,
  Tooltip,
  Typography,
  Divider,
  Chip,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import { Handle, useUpdateNodeInternals } from "reactflow";
import GenericAccordion from "../components/GenericAccordion";
import TextField from "../components/TextField";
import Dropdown from "../components/Dropdown";
import { conditionLogicTypes } from "../constants";
import { v4 as uuidv4 } from "uuid";
import SingleCondition from "../components/SingleCondition";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

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

export default memo(({ data, id, selected }) => {
  const updateNodeInternals = useUpdateNodeInternals();
  const [expandedConfig, setExpandedConfig] = useState(false);

  const [logic, setLogic] = useState(1);

  useEffect(() => {
    updateNodeInternals(id);
  }, []);

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
          background: "#FFEC5C",
          height: "35px",
        }}
      >
        <Typography style={{ padding: "5px", paddingLeft: "15px" }}>
          Condition
        </Typography>
      </Box>
      <Box p={2}>
        <Button
          fullWidth
          variant={"outlined"}
          style={{ color: "black", background: "#FFEC5C", border: "none" }}
          onClick={() => {
            data.openConfig(id, "condition");
          }}
        >
          Configure
        </Button>
      </Box>
      <Tooltip title="Input" arrow>
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
        <Tooltip title="Match" arrow disableInteractive>
          <Handle
            id={data.matchHandleId}
            position="right"
            style={{
              top: "auto",
              position: "relative",
              border: "none",
              background: "#FF5A33",
              transform: "translate(1.4px,0px)",
            }}
          />
        </Tooltip>
        <Tooltip title="No Match" arrow disableInteractive>
          <Handle
            id={data.noMatchHandleId}
            position="right"
            style={{
              top: "auto",
              position: "relative",
              border: "none",
              background: "#FF5A33",
              transform: "translate(1.4px,0px)",
            }}
          />
        </Tooltip>
      </div>
    </div>
  );
});
