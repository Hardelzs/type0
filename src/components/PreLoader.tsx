import { useEffect } from "react";
import { preLoaderAnim } from "../animations";
import "./Preloader.css"

const PreLoader = () => {
  useEffect(() => {
    preLoaderAnim(); 
  }, []);

  return (
    <div className="preloader">
      <div className="texts-container">
        <span className="text-red-500">Ready,</span>
        <span>Set,</span>
        <span>Type.</span>
      </div>
    </div>
  );
};

export default PreLoader;
