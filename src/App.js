import React, { useState, useEffect, useCallback } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
} from "react-flow-renderer";

import IvrMenu from "./nodes/IvrMenu";
import Start from "./nodes/Start";
import "./index.css";

const connectionLineStyle = { stroke: "#000000" };
const snapGrid = [1, 1];
const nodeTypes = {
  ivrMenu: IvrMenu,
  start: Start,
};

function App() {
  //call back that gets called from Nodes
  const onChange = (event) => {
    setNodes((nds) =>
      nds.map((node) => {
        switch (node.type) {
          case "ivrMenu":
            return node;
          default:
            return node;
        }
      })
    );
  };

  //nodes state that contains out nodes and their data
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: "1",
      type: "start",
      position: { x: 0, y: 0 },
      draggable: false,
      selectable: false,
    },
    {
      id: "2",
      type: "ivrMenu",
      data: {
        onChange: onChange,
      },
      dragHandle: ".custom-drag-handle",
      position: { x: 300, y: 0 },
    },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    setEdges([]);
  }, []);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            markerEnd: { type: "arrow", color: "#000000" },
          },
          eds
        )
      ),
    []
  );
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        style={{ background: "#FFFFFF" }}
        nodeTypes={nodeTypes}
        connectionLineStyle={connectionLineStyle}
        snapToGrid={true}
        snapGrid={snapGrid}
        defaultZoom={1.5}
        fitView
        attributionPosition="bottom-left"
      >
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default App;
