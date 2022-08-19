import React, { useState, useEffect, useCallback, useRef } from "react";
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
} from "react-flow-renderer";
import { v4 as uuidv4 } from "uuid";

import IvrMenu from "./nodes/IvrMenu";
import Start from "./nodes/Start";
import "./index.css";
import NodesSidebar from "./components/NodesSidebar";
import { CssBaseline } from "@mui/material";
import DeleteConfirmation from "./components/DeleteConfirmation";
import Extension from "./nodes/Extension";
import Condition from "./nodes/Condition";
import Action from "./nodes/Action";

const nodeTypes = {
  ivrMenu: IvrMenu,
  start: Start,
  extension: Extension,
  condition: Condition,
  action: Action,
};

function App() {
  const [deleteTarget, setDeleteTarget] = useState("");
  const [openDeletConfirmation, setOpenDeleteConfirmation] = useState(false);
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: uuidv4(),
      type: "start",
      draggable: false,
      data: { handleId: uuidv4() },
      position: { x: 0, y: 0 },
    },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (type == null) {
        return;
      }
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      switch (type) {
        case "extension":
          setNodes((nds) =>
            nds.concat({
              id: uuidv4(),
              type,
              position,
              data: {
                name: "",
                askDeleteNode: askDeleteNode,
                saveChanges: saveChanges,
              },
              dragHandle: ".custom-drag-handle",
            })
          );
          break;
        case "condition":
          setNodes((nds) =>
            nds.concat({
              id: uuidv4(),
              type,
              position,
              data: {
                name: "",
                askDeleteNode: askDeleteNode,
                saveChanges: saveChanges,
              },
              dragHandle: ".custom-drag-handle",
            })
          );
          break;
        case "action":
          setNodes((nds) =>
            nds.concat({
              id: uuidv4(),
              type,
              position,
              data: {
                name: "",
                askDeleteNode: askDeleteNode,
                saveChanges: saveChanges,
              },
              dragHandle: ".custom-drag-handle",
            })
          );
          break;
        case "ivrMenu":
          setNodes((nds) =>
            nds.concat({
              id: uuidv4(),
              type,
              position,
              data: {
                name: "",
                noOfOutput: 0,
                timeout: 0,
                interDigitTimeout: 0,
                maxFailure: 0,
                digitLength: 0,
                askDeleteNode: askDeleteNode,
                saveChanges: saveChanges,
              },
              dragHandle: ".custom-drag-handle",
            })
          );
          break;
      }
    },
    [reactFlowInstance]
  );

  const onConnect = useCallback((params) => {
    console.log(params);
    setEdges((eds) =>
      addEdge(
        {
          id: uuidv4(),
          ...params,
          type: "smoothstep",
          markerEnd: {
            height: "30px",
            width: "30px",
            type: "arrowclosed",
            color: "black",
          },
        },
        eds
      )
    );
  }, []);

  //Node deletion

  const askDeleteNode = (nodeId) => {
    setDeleteTarget(nodeId);
    setOpenDeleteConfirmation(true);
  };

  const onNodeDelete = (id) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
  };

  const saveChanges = (data) => {
    console.log("saving this : ", data);
  };

  return (
    <div className="dndflow">
      <CssBaseline />
      <DeleteConfirmation
        id={deleteTarget}
        open={openDeletConfirmation}
        yes={() => {
          setOpenDeleteConfirmation(false);
          onNodeDelete(deleteTarget);
          setDeleteTarget("");
        }}
        no={() => {
          setOpenDeleteConfirmation(false);
          setDeleteTarget("");
        }}
      />
      <ReactFlowProvider>
        <div
          className="reactflow-wrapper"
          ref={reactFlowWrapper}
          style={{ height: "99vh", width: "99vw" }}
        >
          <ReactFlow
            nodeTypes={nodeTypes}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            defaultZoom={1}
          >
            <Controls />
          </ReactFlow>
        </div>
        <NodesSidebar />
      </ReactFlowProvider>
    </div>
  );
}

export default App;
