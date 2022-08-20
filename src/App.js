import React, { useCallback, useRef, useState } from "react";
import ReactFlow, {
  addEdge,
  Controls,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "react-flow-renderer";
import { v4 as uuidv4 } from "uuid";

import { CssBaseline } from "@mui/material";
import { SmartStepEdge } from "@tisoap/react-flow-smart-edge";
import DeleteConfirmation from "./components/DeleteConfirmation";
import NodesSidebar from "./components/NodesSidebar";
import EdgeWithDeleteButton from "./edges/EdgeWithDeleteButton";
import "./index.css";
import Action from "./nodes/Action";
import Condition from "./nodes/Condition";
import Extension from "./nodes/Extension";
import IvrMenu from "./nodes/IvrMenu";
import Start from "./nodes/Start";

const nodeTypes = {
  ivrMenu: IvrMenu,
  start: Start,
  extension: Extension,
  condition: Condition,
  action: Action,
};

const edgeTypes = {
  smart: SmartStepEdge,
  edgeWithDeleteButton: EdgeWithDeleteButton,
};

function App() {
  const [deleteTarget, setDeleteTarget] = useState("");
  const [deleteType, setDeleteType] = useState("");
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
              inputHandleId: uuidv4(),
              extensionMatch: uuidv4(),
              nextExtensionHandleId: uuidv4(),
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
              inputHandleId: uuidv4(),
              matchHandleId: uuidv4(),
              noMatchHandleId: uuidv4(),
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
              inputHandleId: uuidv4(),
              outputHandleId: uuidv4(),
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
          ...params,
          id: uuidv4(),
          type: "edgeWithDeleteButton",
          selected: false,
          markerEnd: {
            height: "25px",
            width: "25px",
            type: "arrow",
            color: "black",
            orient: 0,
          },
          data: {
            askDeleteEdge: askDeleteEdge,
          },
        },
        eds
      )
    );
  }, []);

  //Deletion
  const askDeleteNode = (nodeId) => {
    setDeleteType("node");
    setDeleteTarget(nodeId);
    setOpenDeleteConfirmation(true);
  };

  const askDeleteEdge = (edgeId) => {
    setDeleteType("edge");
    setDeleteTarget(edgeId);
    setOpenDeleteConfirmation(true);
  };

  const onNodeDelete = (id) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
  };

  const onEdgeDelete = (id) => {
    setEdges((eds) => eds.filter((edge) => edge.id !== id));
  };

  const saveChanges = (data) => {
    console.log("saving this : ", data);
  };

  return (
    <div className="dndflow">
      <CssBaseline />
      <DeleteConfirmation
        id={deleteTarget}
        deleteType={deleteType}
        open={openDeletConfirmation}
        yes={() => {
          setOpenDeleteConfirmation(false);
          switch (deleteType) {
            case "node":
              onNodeDelete(deleteTarget);
              break;
            case "edge":
              onEdgeDelete(deleteTarget);
          }
        }}
        no={() => {
          setOpenDeleteConfirmation(false);
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
            edgeTypes={edgeTypes}
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
