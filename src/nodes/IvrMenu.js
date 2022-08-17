import {
  Accordion,
  AccordionDetails,
  Box,
  Grid,
  TextField,
  Typography,
  AccordionSummary,
} from "@mui/material";
import React, { memo, useEffect } from "react";

import { Handle } from "react-flow-renderer";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

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
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <React.Fragment>
      <Box ml={1} mb={4}>
        {/* <VolumeUpIcon style={{ float: "left" }} fontSize={"small"} /> */}
        <Typography style={{ float: "left" }}>IVR Menu</Typography>
      </Box>
      <Box>
        <Box pl={6} pr={5} mb={2}>
          <Accordion style={{ marginBottom: 5 }}>
            <AccordionSummary expandIcon={<ExpandCircleDownIcon />}>
              <Typography>Configuration</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container direction={"row"} spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    label={"Audio File Name"}
                    size={"small"}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Handle
          type="target"
          position="left"
          style={{ background: "green" }}
          onConnect={(params) => console.log("handle onConnect", params)}
          isConnectable={isConnectable}
        >
          <div
            style={{
              float: "left",
              position: "relative",
              transform: "translate(-40px, -7px)",
              pointerEvents: "none",
            }}
          >
            Input
          </div>
        </Handle>
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
