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
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import React, { memo, useEffect, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import { Handle } from "react-flow-renderer";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import { Stack } from "@mui/system";
import TextFieldWithConfirmationButton from "../components/TextFieldWithConfirmationButton";
import TextField from "../components/TextField";

const handleWrapperStyle = {
  display: "flex",
  position: "absolute",
  height: "100%",
  right: 0,
  top: 0,
  flexDirection: "column",
  justifyContent: "space-between",
};

const handleStyle = {
  position: "relative",
  transform: "none",
  top: "auto",
  color: "red",
};

export default memo(({ data, id }) => {
  const [expandedConfig, setExpandedConfig] = useState(false);
  const [expanded, setExpanded] = useState("");
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  const [name, setName] = useState(data.name);
  const [noOfOutput, setNoOfOutput] = useState(0);
  const [timeout, setTimeout] = useState(0);
  const [interDigitTimeout, setInterDigitTimeout] = useState(0);
  const [maxFailure, setMaxFailure] = useState(0);
  const [digitLength, setDigitLength] = useState(0);

  return (
    <React.Fragment>
      <Dialog
        open={openDeleteConfirmation}
        onClose={() => {
          setOpenDeleteConfirmation(false);
        }}
      >
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete IVR Menu with the ID {id} ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            onClick={() => {
              data.onNodeDelete(id);
              setOpenDeleteConfirmation(false);
            }}
          >
            Yes
          </Button>
          <Button
            variant="text"
            color="secondary"
            onClick={() => {
              setOpenDeleteConfirmation(false);
            }}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
      <Box
        ml={2}
        mr={2}
        mt={1}
        mb={1}
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "space-between",
        }}
      >
        <Typography style={{ float: "left" }}>Menu</Typography>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "flex-end",
            alignItems: "baseline",
          }}
        >
          <div className="custom-drag-handle">
            <OpenWithIcon fontSize="medium" />
          </div>

          <IconButton
            onClick={() => {
              setOpenDeleteConfirmation(true);
            }}
          >
            <DeleteIcon fontSize="medium" style={{ color: "#000000" }} />
          </IconButton>
        </Box>
      </Box>
      <Box>
        <Box pl={2} pr={2} mb={2}>
          <Accordion
            style={{ marginBottom: 5 }}
            TransitionProps={{ unmountOnExit: true }}
            expanded={expandedConfig}
            onChange={() => {
              setExpandedConfig(!expandedConfig);
            }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandCircleDownIcon style={{ color: "darkBlue" }} />
              }
            >
              <Typography>Configuration</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Accordion
                elevation={1}
                TransitionProps={{ unmountOnExit: true }}
                expanded={expanded === "menuConfig"}
                onChange={() => {
                  if (expanded !== "menuConfig") setExpanded("menuConfig");
                  else setExpanded(false);
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandCircleDownIcon style={{ color: "darkBlue" }} />
                  }
                >
                  <Typography>Menu Configuration</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={2}>
                    <TextFieldWithConfirmationButton
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
                    <TextFieldWithConfirmationButton
                      id={"b" + id}
                      label="Number of output ports"
                      type="number"
                      value={noOfOutput}
                      onChange={(value) => {
                        setNoOfOutput(value);
                      }}
                      error={data.noOfOutput !== noOfOutput}
                    />
                    <TextFieldWithConfirmationButton
                      id={"c" + id}
                      label="timeout"
                      type="number"
                      value={timeout}
                      onChange={(value) => {
                        setTimeout(value);
                      }}
                      error={timeout !== data.timeout}
                    />
                    <TextFieldWithConfirmationButton
                      id={"d" + id}
                      label="inter-digit-timeout"
                      type="number"
                      value={interDigitTimeout}
                      onChange={(value) => {
                        setInterDigitTimeout(Number(value));
                      }}
                      error={interDigitTimeout !== data.interDigitTimeout}
                    />
                    <TextFieldWithConfirmationButton
                      id={"e" + id}
                      label="max-failure"
                      type="number"
                      value={maxFailure}
                      onChange={(value) => {
                        setMaxFailure(value);
                      }}
                      error={maxFailure !== data.maxFailure}
                    />
                    <TextFieldWithConfirmationButton
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
                </AccordionDetails>
              </Accordion>
              <Accordion
                elevation={1}
                TransitionProps={{ unmountOnExit: true }}
                expanded={expanded === "audioConfig"}
                onChange={() => {
                  if (expanded !== "audioConfig") setExpanded("audioConfig");
                  else setExpanded(false);
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandCircleDownIcon style={{ color: "darkBlue" }} />
                  }
                >
                  <Typography>Audio Configuration</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container direction={"row"} spacing={1}>
                    <Grid item xs={12}>
                      <TextField
                        label={"greet-long"}
                        size={"small"}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label={"gree-short"}
                        size={"small"}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label={"invalid-sound"}
                        size={"small"}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label={"exit-sound"}
                        size={"small"}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Tooltip title="Input">
          <Handle
            type="target"
            position="left"
            style={{
              background: "green",
              height: "15px",
              width: "15px",
              border: "none",
              transform: "translate(-11px,0px)",
            }}
          ></Handle>
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
