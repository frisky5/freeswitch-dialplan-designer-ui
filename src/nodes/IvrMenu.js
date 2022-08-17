import {
  Accordion,
  AccordionDetails,
  Box,
  Grid,
  TextField,
  Typography,
  AccordionSummary,
  Tooltip,
  Button,
  InputAdornment,
  OutlinedInput,
  FormControl,
  InputLabel,
} from "@mui/material";
import React, { memo, useEffect, useState } from "react";

import { Handle } from "react-flow-renderer";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import { Stack } from "@mui/system";

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

export default memo(({ data, isConnectable }) => {
  const [expanded, setExpanded] = useState("");
  const [numberOfPorts, setNumberOfPorts] = useState(0);
  useEffect(() => {
    console.log(data);
    console.log(isConnectable);
  }, [data]);

  return (
    <React.Fragment>
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
        <OpenWithIcon fontSize="medium" className="custom-drag-handle" />
      </Box>
      <Box>
        <Box pl={2} pr={2} mb={2}>
          <Accordion
            style={{ marginBottom: 5 }}
            TransitionProps={{ unmountOnExit: true }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandCircleDownIcon style={{ color: "darkBlue" }} />
              }
            >
              Configuration
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
                  Menu Configuration
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={1}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel>Name</InputLabel>
                      <OutlinedInput
                        label={"number of output ports"}
                        fullWidth
                        endAdornment={
                          <InputAdornment position="end">
                            <Button size={"small"} variant="text">
                              Confirm
                            </Button>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel>Number of output ports</InputLabel>
                      <OutlinedInput
                        value={numberOfPorts}
                        onChange={(e) => {
                          if (!isNaN(e.target.value.trim()))
                            setNumberOfPorts(e.target.value.trim());
                        }}
                        label={"number of output ports"}
                        fullWidth
                        endAdornment={
                          <InputAdornment position="end">
                            <Button size={"small"} variant="text">
                              Confirm
                            </Button>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                    <TextField label={"timeout"} size={"small"} fullWidth />
                    <TextField
                      label={"inter-digit-timeout"}
                      size={"small"}
                      fullWidth
                    />
                    <TextField label={"max-failure"} size={"small"} fullWidth />
                    <TextField
                      label={"digit-length"}
                      size={"small"}
                      fullWidth
                    />
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
                  Audio Configuration
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
            style={{ background: "green" }}
            isConnectable={isConnectable}
          >
            <div
              style={{
                float: "left",
                position: "relative",
                transform: "translate(-70px, -11x)",
                pointerEvents: "none",
              }}
            ></div>
          </Handle>
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
