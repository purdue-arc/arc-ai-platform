import React from "react";
import Button from '@mui/material/Button';
import BarChartIcon from '@mui/icons-material/BarChart';
import InsightsIcon from '@mui/icons-material/Insights';
import GroupsIcon from '@mui/icons-material/Groups';

function FeaturesSection() {
  return (
    <section className="features-section">
      <h2>Boost your research with our AI features</h2>
      <div className="features-grid">
      <BarChartIcon/>
        <FeatureCard
          icon="icon-data-analysis.svg"
          title="Advanced Data Analysis"
          description="Gain deeper insights from your data using cutting-edge AI algorithms."/>
        
      <InsightsIcon/>
        <FeatureCard
          icon="icon-automation.svg"
          title="Automated Workflows"
          description="Free up your time for creativity with AI-powered automation."
        />
        <GroupsIcon/>
        <FeatureCard
          icon="icon-collaboration.svg"
          title="Seamless Collaboration"
          description="Share and collaborate on research projects with ease."
        />
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="feature-card">
      {/* <icon /> */}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default FeaturesSection;
