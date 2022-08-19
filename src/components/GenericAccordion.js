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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function GenericAccordion(props) {
  return (
    <Accordion
      elevation={0}
      style={{
        border: "solid",
        borderWidth: "1px",
        borderColor: "rgba(75, 82, 95, 0.5)",
        marginBottom: 5,
      }}
      TransitionProps={{ unmountOnExit: true }}
      expanded={props.expanded}
      onChange={props.onChange}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{props.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{props.children}</AccordionDetails>
    </Accordion>
  );
}
