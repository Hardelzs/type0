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

      <div>
        <div className="loader absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <img src="/images.png" alt="Loading..." className="preloader-image w-[100%]"/>
        </div>
      </div>
    </div>
  );
};

export default PreLoader;
