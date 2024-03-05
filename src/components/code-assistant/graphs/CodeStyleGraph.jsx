import React, { useRef, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './CodeStyleGraph.css'; // Import the CSS file

Chart.register(...registerables);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Code Style Metrics', // Title for the graph
      font: {
        size: 20, // Adjust the font size as needed
      },
    },
    colors: {
      enabled: true,
    },
    tooltip: {
      callbacks: {
        title: (tooltipItems) => {
          return '';
        },
        label: function (context) {
          let label = context.dataset.label || '';

          if (label) {
            label += 'Participant signup';
          }
          if (context.parsed.y !== null) {
            label += `${context.parsed.y} signups`;
          }
          return label;
        },
        afterLabel: (tooltipItem) => {
          return tooltipItem.label;
        },
        labelColor() {
          return {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            borderWidth: 3,
          };
        },
        labelTextColor: function (context) {
          return '#050305';
        },
        afterLabelTextColor: function (context) {
          return '#495434';
        },
      },
      backgroundColor: '#fff',
      borderColor: '#frfrfr',
      usePointStyle: false,
      showShadow: true,
    },
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false, // Hide the y-axis
    },
  },
  interaction: {
    intersect: false, // Make bars non-reactive
    mode: 'index',
  },
  events: [], // No events required
};

const graphData = [10, 50, 40, 90, 10, 20];

const categories = [
  'Modularity',
  'File Organization',
  'Function Length',
  'Variable Scope',
  'Naming',
  'Styling',
];
const labels = categories;

export const data = {
  labels,
  datasets: [
    {
      label: 'Metrics', // Label for the dataset
      backgroundColor: '#5052ff',
      data: graphData,
      barPercentage: 0.8, // Adjust the width of the bars
      borderRadius: 0, // Remove border radius
      borderSkipped: false,
    },
  ],
};

const CodeStyleGraph = () => {
  const chartRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.5, // Trigger when 50% of the component is visible
      }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current);
      }
    };
  }, [key]);

  useEffect(() => {
    if (isVisible) {
      setKey((prevKey) => prevKey + 1); // Remount the Bar component to reanimate
    }
  }, [isVisible]);

  return (
    <div className="code-style-graph-container" ref={chartRef}>
      <div className={`chart-container ${isVisible ? 'visible' : ''}`} key={key}>
        <Bar data={data} options={options} />
      </div>
      <div className="placeholder"></div>
    </div>
  );
};

export default CodeStyleGraph;
