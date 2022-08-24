import React, { useCallback, useRef, useState } from "react";
import { CssBaseline } from "@mui/material";
import { SmartStepEdge } from "@tisoap/react-flow-smart-edge";
import produce from "immer";
import ReactFlow, {
  addEdge,
  Controls,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "react-flow-renderer";
import { v4 as uuidv4 } from "uuid";
import DeleteConfirmation from "./components/DeleteConfirmation";
import NodesSidebar from "./components/NodesSidebar";
import EdgeWithDeleteButton from "./edges/EdgeWithDeleteButton";
import "./index.css";
import Action from "./nodes/Action";
import Condition from "./nodes/Condition";
import Extension from "./nodes/Extension";
import IvrMenu from "./nodes/IvrMenu";
import Start from "./nodes/Start";
import { conditionLogicTypes } from "./constants";
import ConfigurationDialog from "./components/ConfigurationDialog";

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
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: uuidv4(),
      type: "start",
      draggable: false,
      selectable: false,
      position: { x: 0, y: 0 },
      data: { handleId: uuidv4() },
    },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [deleteTarget, setDeleteTarget] = useState("");
  const [deleteType, setDeleteType] = useState("");
  const [openDeletConfirmation, setOpenDeleteConfirmation] = useState(false);
  //node configuration states
  const [openConfigDialog, setOpenConfigDialog] = useState(false);
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
    [reactFlowInstance]
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

  //Node and Edges Deletion
  const askDeleteNode = (nodeId) => {
    setDeleteType("node");
    setDeleteTarget(nodeId);
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
    setDeleteTarget(edgeId);
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
      <DeleteConfirmation
        id={deleteTarget}
        deleteType={deleteType}
        open={openDeletConfirmation}
        yes={() => {
          switch (deleteType) {
            case "node":
              deleteNode(deleteTarget);
              break;
            case "edge":
              deleteEdge(deleteTarget);
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
