import React from "react";
import "./index.css";
import PanoLayout from "./components/PanoLayout";
import { Route, Routes } from "react-router";
import GetPanoProperty from "./components/utils/GetPanoProperty";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PanoLayout />} />
      <Route path="/pano/:selectedPanoId" element={<GetPanoProperty />} />
    </Routes>
  );
};

export default App;
