import { Box, Button, Tooltip, Typography } from "@mui/material";
import React, { memo, useEffect, useState } from "react";

import { Handle, useUpdateNodeInternals } from "reactflow";
import GenericAccordion from "../components/GenericAccordion";
import TextField from "../components/TextField";

export default memo(({ id, type, data }) => {
  const [expandedConfig, setExpandedConfig] = useState(false);
  const [name, setName] = useState(data.name);

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
        <Typography
          align="center"
        >
          Action
        </Typography>
      </Box>
      <Box padding={2}>
        <Button
          variant={"contained"}
          style={{ background: "#2ecc71", }}
          size="small"
          onClick={() => {
            data.openConfig(id, type);
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
        <Handle
          id={data.nextExtensionHandleId}
          position="right"
          style={{
            marginTop: "12px"
          }}
        />
      </div>
    </React.Fragment>
  );
});
