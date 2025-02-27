import React from "react";
import "./loader.scss";

const Loader: React.FC = () => {
  return (
    <div className="loading-screen">
      <div className="loading-spinner"></div>
      <h2 className="loading-text">Loading...</h2>
    </div>
  );
};

export default Loader;