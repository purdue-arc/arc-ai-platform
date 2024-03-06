import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Autocomplete,
  TextField,
  Button,
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { GraphCanvas } from "reagraph";
import "./FunctionTree.css"; // Assuming your styles are defined here

const Theme = {
  canvas: { background: "#f0f4f8" }, // Lighter background for better contrast
  node: {
    fill: "#5599ff", // Brighter fill color for nodes
    activeFill: "#ff5555", // Highlight color for active nodes
    hoverFill: "#ffaa00", // Assuming your library supports hover states
    opacity: 1,
    selectedOpacity: 1,
    inactiveOpacity: 0.5, // Slightly more visible inactive nodes
    label: {
      color: "#333", // Darker label for better readability
      stroke: "#fff",
      activeColor: "#ff5555",
      hoverColor: "#ffaa00", // Assuming your library supports hover states
    },
  },
  lasso: {
    border: "1px solid #0077ff",
    background: "rgba(0, 119, 255, 0.1)",
  },
  ring: {
    fill: "#aaccee",
    activeFill: "#ff5555",
  },
  edge: {
    fill: "#bbb", // Neutral color for edges
    activeFill: "#ff5555", // Highlight color for active or highlighted edges
    hoverFill: "#ffaa00", // Assuming your library supports hover states for edges
    opacity: 0.8,
    selectedOpacity: 1,
    inactiveOpacity: 0.3,
    label: {
      stroke: "#fff",
      color: "#666", // Darker color for edge labels for readability
      activeColor: "#ff5555",
      fontSize: 8, // Slightly larger font for readability
    },
  },
  arrow: {
    fill: "#bbb",
    activeFill: "#ff5555",
    hoverFill: "#ffaa00", // Assuming hover state support
  },
  cluster: {
    stroke: "#aaccee",
    opacity: 1,
    selectedOpacity: 1,
    inactiveOpacity: 0.3,
    label: {
      stroke: "#fff",
      color: "#333",
    },
  },
};
function CanvasLayer({ nodes, edges }) {
  return (
    <GraphCanvas
      theme={Theme}
      sizingType="centrality"
      width="100%" // Update to occupy full width
      height="100%" // Update to occupy full height
      nodes={nodes}
      edges={edges}
      nodeSize={20}
      nodeShape="circle"
      edgeWidth={2}
      edgeArrow={true}
      edgeArrowPosition={"mid"}
      edgeArrowColor="gray"
    />
  );
}
class SeededRNG {
  constructor(seed) {
    this.seed = seed;
  }

  random() {
    const x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
  }
}

const generateNodes = (count, rng) => {
  let nodes = [];
  for (let i = 1; i <= count; i++) {
    nodes.push({
      id: `n-${i}`,
      label: `Node ${i}`,
      color: `hsl(${rng.random() * 360}, 70%, 50%)`, // Generate a color hue for variation
    });
  }
  return nodes;
};

const generateEdges = (nodes, rng) => {
  let edges = new Map(); // Use a Map to avoid duplicate edges

  nodes.forEach((sourceNode, index) => {
    // Guarantee at least one edge per node for graph validity
    const targetIndex = (index + 1) % nodes.length;
    const targetNode = nodes[targetIndex];
    const edgeKey = `${sourceNode.id}->${targetNode.id}`;

    if (!edges.has(edgeKey)) {
      edges.set(edgeKey, {
        id: edgeKey,
        source: sourceNode.id,
        target: targetNode.id,
        label: `Edge ${sourceNode.label}-${targetNode.label}`,
        color: "gray",
      });
    }

    // Add more edges randomly but avoid duplicates
    nodes.forEach((targetNode) => {
      if (sourceNode.id !== targetNode.id && rng.random() > 0.9) {
        const randomEdgeKey = `${sourceNode.id}->${targetNode.id}`;
        if (!edges.has(randomEdgeKey)) {
          edges.set(randomEdgeKey, {
            id: randomEdgeKey,
            source: sourceNode.id,
            target: targetNode.id,
            label: `Edge ${sourceNode.label}-${targetNode.label}`,
            color: "gray",
          });
        }
      }
    });
  });

  // Convert the Map values to an array since the function expects to return an array of edges
  return Array.from(edges.values());
};

const FunctionTree = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    const seed = 12345; // Fixed seed ensures reproducibility
    const rng = new SeededRNG(seed);
    const nodeCount = 50; // Specify the number of nodes you want
    const generatedNodes = generateNodes(nodeCount, rng);
    const generatedEdges = generateEdges(generatedNodes, rng);
    setNodes(generatedNodes);
    setEdges(generatedEdges);

    // Ensure nodes and edges state are updated before calculating degrees
    setTimeout(() => {
      const nodeDegrees = generatedEdges.reduce((acc, edge) => {
        acc[edge.source] = (acc[edge.source] || 0) + 1;
        acc[edge.target] = (acc[edge.target] || 0) + 1;
        return acc;
      }, {});

      let maxDegreeNode = null;
      let maxDegree = 0;
      generatedNodes.forEach((node) => {
        const degree = nodeDegrees[node.id] || 0;
        if (
          degree > maxDegree ||
          (degree === maxDegree &&
            (maxDegreeNode === null || node.id < maxDegreeNode.id))
        ) {
          maxDegreeNode = node;
          maxDegree = degree;
        }
      });

      if (maxDegreeNode) {
        console.log("Node with the highest degree:", maxDegreeNode);
        filterGraph(maxDegreeNode.label);
      }
    }, 0);
  }, []);
  const [filteredNodes, setFilteredNodes] = useState(nodes);
  const [filteredEdges, setFilteredEdges] = useState(edges);
  const filterGraph = (searchTerm) => {
    console.log(searchTerm);
    // Assuming searchTerm is the label or a part of it, and we're doing a case-insensitive search.
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    // Step 1: Filter nodes based on the search term being in the label.
    const directlyMatchedNodes = nodes.filter((node) =>
      node.label.toLowerCase().includes(lowerCaseSearchTerm),
    );

    // Initialize a Set to keep track of all matching node IDs for uniqueness
    const matchedNodeIds = new Set(directlyMatchedNodes.map((node) => node.id));

    // Step 2: Identify all edges connected to those nodes and add connected nodes to the set.
    const connectedEdges = edges.filter((edge) => {
      if (matchedNodeIds.has(edge.source) || matchedNodeIds.has(edge.target)) {
        matchedNodeIds.add(edge.source);
        matchedNodeIds.add(edge.target);
        return true;
      }
      return false;
    });

    // Step 3: Filter nodes to include all that are either directly matched or connected.
    const newFilteredNodes = nodes.filter((node) =>
      matchedNodeIds.has(node.id),
    );

    // Since connectedEdges already includes edges connected to the matched nodes,
    // we can use it directly as the filtered edges.
    setFilteredNodes(newFilteredNodes);
    setFilteredEdges(connectedEdges);
  };

  const handleSearch = (event, newValue) => {
    const searchTerm = newValue ? newValue.label : "";
    setSearchTerm(searchTerm);
    filterGraph(searchTerm);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        overflow: "hidden",
        width: "100vw",
        background: "#121212",
      }}
    >
      {/* Added a dark background */}
      <AppBar position="static" sx={{ background: "#333" }}>
        {/* Darker AppBar */}
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={() => navigate("/code-assistant")}
            sx={{ marginRight: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "#FFF" }}
          >
            Code Assistant Report
          </Typography>
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          height: "calc(100vh - 64px)",
          padding: "20px",
          display: "flex",
          alignItems: "stretch",
          gap: "20px",
          overflow: "hidden",
        }}
      >
        {/* Search Box Container */}
        <Box
          sx={{
            width: "30vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            paddingRight: "20px", // Add some right padding
          }}
        >
          <Autocomplete
            id="node-search"
            freeSolo
            options={nodes}
            getOptionLabel={(option) => option.label}
            sx={{ width: "100%", background: "#222", borderRadius: 1 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Node"
                variant="filled" // Use the filled variant for a modern look
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
                InputProps={{
                  ...params.InputProps,
                  style: { color: "#fff" },
                }}
                sx={{
                  input: { color: "#fff" }, // Ensures the text color is white
                  "& .MuiFilledInput-underline:before": {
                    borderBottomColor: "rgba(255,255,255,0.7)",
                  }, // Underline color
                  "& .MuiFilledInput-underline:hover:before": {
                    borderBottomColor: "#fff",
                  }, // Hover underline color
                  "& .MuiFilledInput-underline:after": {
                    borderBottomColor: "#1DE9AC",
                  }, // Underline color after focusing
                }}
              />
            )}
            onChange={handleSearch}
          />
        </Box>

        {/* Graph Container */}
        <Box
          sx={{
            height: "auto",
            flexGrow: 1,
            width: "60vw", // Adjusted width considering the gap
            overflow: "hidden",
            backgroundColor: "#fff", // Ensure graph background contrasts with dark mode
            borderRadius: "12px", // Rounded corners for the graph container
            boxShadow: "0 4px 24px rgba(0,0,0,0.25)", // Subtle shadow for depth
          }}
        >
          <div
            className="function-tree-container"
            style={{ height: "100%", width: "100%" }}
          >
            <CanvasLayer nodes={filteredNodes} edges={filteredEdges} />
          </div>
        </Box>
      </Container>
    </Box>
  );
};

export default FunctionTree;
