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
  AccordionActions,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SaveIcon from "@mui/icons-material/Save";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
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
      <AccordionDetails>
        <Stack spacing={2} alignItems="center">
          {props.children}
          <Button
            size="small"
            variant="contained"
            style={{
              width: "20%",
              color: "white",
              background: "#44803F",
            }}
            onClick={props.onSave}
            startIcon={<SaveIcon />}
          >
            save
          </Button>
        </Stack>
      </AccordionDetails>
      {props.config && (
        <AccordionActions>
          <Button
            size="small"
            onClick={props.onDelete}
            style={{
              color: "white",
              background: "#FF5A33",
            }}
            variant="contained"
            startIcon={<DeleteForeverIcon />}
          >
            delete
          </Button>
        </AccordionActions>
      )}
    </Accordion>
  );
}
