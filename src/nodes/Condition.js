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

export default memo(({ data, id, selected }) => {
  const updateNodeInternals = useUpdateNodeInternals();
  const [expandedConfig, setExpandedConfig] = useState(false);

  const [logic, setLogic] = useState(1);

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
          borderColor: "inherit"
        }}
      >
        <Typography align="center">
          Condition
        </Typography>
      </Box>
      <Box p={2}>
        <Button
          variant={"contained"}
          style={{ color: "white", background: "#f1c40f" }}
          onClick={() => {
            data.openConfig(id, "condition");
          }}
        >
          Edit
        </Button>
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
