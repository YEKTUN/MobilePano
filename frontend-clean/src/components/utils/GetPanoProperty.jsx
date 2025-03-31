import React, { useEffect } from 'react'

import { useLocation } from 'react-router';

const GetPanoProperty = () => {
  const location = useLocation();
  const currentPano = location.state?.currentPano; 
  const downloadJSON = (data, filename = "data.json") => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const handleDownload = () => {
    downloadJSON(currentPano, "panoData.json");
  };

  console.log(currentPano);
  

  return (
    <div>

    <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
    {JSON.stringify(currentPano, null, 2)}
  </pre>
    <button className='absolute top-4 right-5 bg-amber-200 rounded-full p-4 cursor-pointer hover:bg-amber-400 active:bg-amber-600 transition-all duration-300 ease-in-out' onClick={handleDownload}>Download JSON</button>
    </div>
  )
}

export default GetPanoProperty