import React, { useCallback, useRef, useState } from "react";
import { CssBaseline, LinearProgress } from "@mui/material";
import produce from "immer";

import ReactFlow, {
  addEdge,
  Controls,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "reactflow";
import 'reactflow/dist/style.css';

import { v4 as uuidv4 } from "uuid";
import DeleteDialog from "./components/dialogs/DeleteDialog";
import NodesSidebar from "./components/NodesSidebar";
import EdgeWithDeleteButton from "./edges/EdgeWithDeleteButton";
import "./index.css";
import Action from "./nodes/Action";
import Condition from "./nodes/Condition";
import Extension from "./nodes/Extension";
import IvrMenu from "./nodes/IvrMenu";
import Start from "./nodes/Start";
import { conditionLogicTypes } from "./constants";
import ConfigurationDialog from "./components/dialogs/ConfigurationDialog";

const nodeTypes = {
  start: Start,
  extension: Extension,
  condition: Condition,
  action: Action,
  ivrMenu: IvrMenu,
};

const edgeTypes = {
  edgeWithDeleteButton: EdgeWithDeleteButton,
};

function App() {

  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  //object holding the nodes in the dialplan flow
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      //first node in any dialplan flow, do not modify this
      id: uuidv4(),
      type: "start",
      draggable: false,
      selectable: false,
      position: { x: 0, y: 0 },
      data: { handleId: uuidv4() },
    },
  ]);

  //object holding the edges connected between the nodes in the dialplan flow
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  //object holds the ID of a edge/node when a delete button is pressed
  const [deleteTargetId, setDeleteTargetId] = useState("");
  //object holds the type of item to delete, is  it node or edge
  const [deleteType, setDeleteType] = useState("");
  //object to control the deletion dialog opened state
  const [openDeletConfirmation, setOpenDeleteConfirmation] = useState(false);

  //object to control the configuration dialog opened state
  const [openConfigDialog, setOpenConfigDialog] = useState(false);
  //object holds the node id where configuration button was pressed
  const [configNodeId, setConfigNodeId] = useState("");

  const [configNodeType, setConfigNodeType] = useState("");
  const [configNodeData, setConfigNodeData] = useState({});

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (type == null) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      let node = {
        id: uuidv4(),
        type,
        position,
        dragHandle: ".custom-drag-handle",
        selectable: true,
        data: {
          name: "",
          inputHandleId: uuidv4(),
          openConfig: openConfig,
          askDeleteNode: askDeleteNode,
        },
      };

      switch (type) {
        case "extension":
          node = {
            ...node,
            data: {
              ...node.data,
              extensionContentHandleId: uuidv4(),
              nextExtensionHandleId: uuidv4(),
            },
          };
          setNodes((nds) => nds.concat(node));
          break;

        case "condition":
          node = {
            ...node,
            data: {
              ...node.data,
              conditions: [{}],
              logic: 1,
              matchHandleId: uuidv4(),
              noMatchHandleId: uuidv4(),
            },
          };
          setNodes((nds) => nds.concat(node));
          break;

        case "action":
          node = {
            ...node,
            data: {
              ...node.data,
              outputHandleId: uuidv4(),
            },
          };
          setNodes((nds) => nds.concat(node));
          break;

        case "ivrMenu":
          node = {
            ...node,
            data: {
              ...node.data,
              noOfOutput: 0,
              timeout: 0,
              interDigitTimeout: 0,
              maxFailure: 0,
              digitLength: 0,
            },
          };
          setNodes((nds) => nds.concat(node));
          break;
        default:
          break;
      }
    },
    [reactFlowInstance, setNodes]
  );

  // trigger on nodes connection
  const onConnect = useCallback((params) => {
    setEdges((eds) =>
      addEdge(
        {
          ...params,
          id: uuidv4(),
          type: "edgeWithDeleteButton",
          selected: false,
          markerEnd: {
            height: "20px",
            width: "20px",
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
  }, [setEdges]);

  //Node and Edges Deletion
  const askDeleteNode = (nodeId) => {
    setDeleteType("node");
    setDeleteTargetId(nodeId);
    setOpenDeleteConfirmation(true);
  };

  const deleteNode = (id) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    //delete related edges to avoid zombie edges
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== id && edge.target !== id)
    );
  };

  const askDeleteEdge = (edgeId) => {
    setDeleteType("edge");
    setDeleteTargetId(edgeId);
    setOpenDeleteConfirmation(true);
  };

  const deleteEdge = (id) => {
    setEdges((eds) => eds.filter((edge) => edge.id !== id));
  };

  //configuration
  function openConfig(id, type) {
    setConfigNodeId(id);
    setConfigNodeType(type);
    const indexOfNode = reactFlowInstance
      .getNodes()
      .findIndex((item, index) => item.id === id);
    setConfigNodeData(reactFlowInstance.getNodes()[indexOfNode].data);
    setOpenConfigDialog(true);
  }

  const saveExtensionNodeChanges = (data) => {
    setNodes(
      produce(reactFlowInstance.getNodes(), (draft) => {
        const indexOfNode = draft.findIndex(
          (item, index) => item.id === configNodeId
        );
        if (data.name != null) draft[indexOfNode].data.name = data.name;
      })
    );
    setOpenConfigDialog(false);
  };

  const saveConditionNodeChanges = (data) => {
    setNodes(
      produce(reactFlowInstance.getNodes(), (draft) => {
        const indexOfNode = draft.findIndex(
          (item, index) => item.id === configNodeId
        );
        draft[indexOfNode].data.name = data.name;
        draft[indexOfNode].data.logic = data.logic;
      })
    );
  };

  const saveActionNodeChanges = (data) => {
    setNodes(
      produce(reactFlowInstance.getNodes(), (draft) => {
        const indexOfNode = draft.findIndex(
          (item, index) => item.id === configNodeId
        );
        draft[indexOfNode].data.name = data.name;
      })
    );
  };

  return (
    <div className="dndflow">
      <CssBaseline />
      <DeleteDialog
        id={deleteTargetId}
        deleteType={deleteType}
        open={openDeletConfirmation}
        yes={() => {
          switch (deleteType) {
            case "node":
              deleteNode(deleteTargetId);
              break;
            case "edge":
              deleteEdge(deleteTargetId);
              break;
            default:
              break;
          }
          setOpenDeleteConfirmation(false);
          if (openConfigDialog) setOpenConfigDialog(false);
        }}
        no={() => {
          setOpenDeleteConfirmation(false);
        }}
      />
      <ConfigurationDialog
        open={openConfigDialog}
        close={() => {
          setOpenConfigDialog(false);
        }}
        type={configNodeType}
        nodeId={configNodeId}
        nodeData={configNodeData}
        askDeleteNode={askDeleteNode}
        saveExtensionNodeChanges={saveExtensionNodeChanges}
        saveConditionNodeChanges={saveConditionNodeChanges}
        saveActionNodeChanges={saveActionNodeChanges}
      />

      <ReactFlowProvider>
        <div
          className="reactflow-wrapper"
          ref={reactFlowWrapper}
          style={{ height: "99vh", width: "99vw" }}
        >
          <LinearProgress />
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
        <NodesSidebar
          export={() => {
            console.log("nodes : ", nodes);
            console.log("edges : ", edges);
          }}
        />
      </ReactFlowProvider>

    </div>
  );
}

export default App;
