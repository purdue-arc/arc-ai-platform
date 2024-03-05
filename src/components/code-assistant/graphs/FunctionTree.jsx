import React from "react";

export default function FunctionTree() {
  const graph = {
    nodes: [
      { id: 1, label: "1", title: "node 1 tooltip text" },
      { id: 2, label: "2", title: "node 2 tooltip text" },
      { id: 3, label: "3", title: "node 3 tooltip text" },
      { id: 4, label: "4", title: "node 4 tooltip text" },
      { id: 5, label: "5", title: "node 5 tooltip text" },
      { id: 6, label: "6", title: "node 6 tooltip text" }
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 2, to: 1 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
      { from: 2, to: 6 },
      { from: 6, to: 1 },
      { from: 5, to: 6 }
    ]
  };

  const options = {
    layout: {
      hierarchical: false
    },
    edges: {
      color: "red"
    },
    height: "500px"
  };

  const events = {
    select: function (event) {
      var { nodes, edges } = event;
      console.log(edges);
      console.log(nodes);
    }
  };

  return (
    <Graph
      graph={graph}
      options={options}
      events={events}
    />
  );
}
