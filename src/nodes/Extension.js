import React, { memo, useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  Box,
  Grid,
  Typography,
  AccordionSummary,
  Tooltip,
  Button,
  IconButton,
} from "@mui/material";

import { v4 as uuidv4 } from "uuid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Handle } from "react-flow-renderer";
import PanToolIcon from "@mui/icons-material/PanTool";
import { Stack } from "@mui/system";
import TextFieldWithConfirmationButton from "../components/TextFieldWithConfirmationButton";
import TextField from "../components/TextField";
import DeleteConfirmation from "../components/DeleteConfirmation";
import GenericAccordion from "../components/GenericAccordion";
import { useUpdateNodeInternals } from "react-flow-renderer";

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

export default memo(({ data, id }) => {
  const updateNodeInternals = useUpdateNodeInternals();
  const [expandedConfig, setExpandedConfig] = useState(false);
  const [expanded, setExpanded] = useState("");
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  const [name, setName] = useState(data.name);

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
          Extension
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
              <Button>SAVE ALL</Button>
            </Stack>
          </GenericAccordion>
        </Box>
        <Tooltip title="Input" arrow>
          <Handle
            id={inputHandleId}
            type="target"
            position="left"
            style={{
              background: "green",
              border: "none",
              transform: "translate(-1.4px,0px)",
            }}
          />
        </Tooltip>
        <div style={handleWrapperStyle}>
          <Tooltip title="Match" arrow>
            <Handle
              id={matchHandleId}
              position="right"
              style={{
                position: "relative",
                transform: "none",
                top: "auto",
                background: "green",
                border: "none",
                transform: "translate(1.4px,0px)",
              }}
            />
          </Tooltip>
          <Tooltip title="No Match" arrow>
            <Handle
              id={noMatchHandleId}
              position="right"
              style={{
                position: "relative",
                transform: "none",
                top: "auto",
                background: "red",
                border: "none",
                transform: "translate(1.4px,0px)",
              }}
            />
          </Tooltip>
        </div>
      </Box>
    </React.Fragment>
  );
});
