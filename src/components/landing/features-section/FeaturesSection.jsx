import React from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp"; // For Predictive Modeling
import BuildCircleIcon from "@mui/icons-material/BuildCircle"; // For Custom AI Solutions
import ShowChartIcon from "@mui/icons-material/ShowChart"; // For Data Visualization
import ChatIcon from "@mui/icons-material/Chat"; // For Interactive AI Assistants
import AnalyticsIcon from "@mui/icons-material/Analytics"; // For Real-Time Analytics
import SecurityIcon from "@mui/icons-material/Security"; // For Enhanced Security
import CloudIcon from "@mui/icons-material/Cloud"; // For Cloud Services
import AutorenewIcon from "@mui/icons-material/Autorenew"; // For Continuous Integration/Continuous Deployment (CI/CD)
import LightbulbIcon from "@mui/icons-material/Lightbulb"; // For Innovative Solutions

import "./FeaturesSection.css";
function FeaturesSection() {
  return (
    <section className="features-section">
      <h2>Boost your research with our AI features</h2>
      <div className="features-grid">
        <FeatureCard
          IconComponent={AnalyticsIcon}
          title="Real-Time Analytics"
          description="Access real-time data analytics to make informed decisions swiftly."
        />
        <FeatureCard
          IconComponent={TrendingUpIcon}
          title="Predictive Modeling"
          description="Leverage advanced AI to predict trends and behaviors accurately."
        />
        <FeatureCard
          IconComponent={BuildCircleIcon}
          title="Custom AI Solutions"
          description="Build bespoke AI solutions tailored to your specific research needs."
        />
        <FeatureCard
          IconComponent={ShowChartIcon}
          title="Data Visualization"
          description="Transform complex data into clear, intuitive visualizations."
        />
        <FeatureCard
          IconComponent={ChatIcon}
          title="Interactive AI Assistants"
          description="Enhance your research process with interactive AI assistants."
        />
        <FeatureCard
          IconComponent={SecurityIcon}
          title="Enhanced Security"
          description="Robust security measures to protect your data and privacy."
        />
        <FeatureCard
          IconComponent={CloudIcon}
          title="Cloud Services"
          description="Easily scale and manage your projects with our comprehensive cloud services."
        />
        <FeatureCard
          IconComponent={AutorenewIcon}
          title="CI/CD Automation"
          description="Streamline your development process with automated workflows for continuous integration and deployment."
        />
        <FeatureCard
          IconComponent={LightbulbIcon}
          title="Innovative Solutions"
          description="Stay ahead with cutting-edge solutions that redefine the boundaries of what's possible."
        />
      </div>
    </section>
  );
}

function FeatureCard({ IconComponent, title, description }) {
  return (
    <div className="feature-card">
      <IconComponent style={{ fontSize: 48, color: "#FFFFFF" }} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default FeaturesSection;
