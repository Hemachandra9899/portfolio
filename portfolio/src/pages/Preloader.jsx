import React, { useState, useEffect } from 'react';

const Preloader = () => {
  const textToType = "HELLOO!";
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHand, setShowHand] = useState(false);

  useEffect(() => {
    if (currentIndex < textToType.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + textToType[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 200);
      return () => clearTimeout(timeout);
    } else {
      setShowHand(true);
    }
  }, [currentIndex]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#6cf56c] h-screen w-screen overflow-hidden">
      
      {/* Removed 'mix-blend-screen' from the text to ensure high contrast 
         and prevent blending issues with the hand next to it.
      */}
      <div className="w-full flex justify-end pr-[5vw] md:pr-[10vw] items-center">
        
        <h1 
          className="text-[#ffff4d] text-[100px] md:text-[600px] 2xl:text-[600px] font-black leading-none tracking-tighter uppercase select-none whitespace-nowrap"
          style={{ 
            fontFamily: '"Palette Mosaic", cursive',
            // Simple hard shadow to make it pop
            textShadow: '4px 4px 0px rgba(0,0,0,0.2)' 
          }}
        >
          {displayedText}
        </h1>

        {showHand && (
           <svg 
             viewBox="0 0 24 24" 
             xmlns="http://www.w3.org/2000/svg"
             // Removed 'stroke' here, we will rely on 'fill' inside the path
             className="h-[100px] w-[100px] md:h-[300px] md:w-[300px] 2xl:h-[600px] 2xl:w-[600px] ml-4 md:ml-10 animate-wave cursor-pointer hover:scale-110 transition-transform duration-300"
             style={{ 
               // Ensure the drop shadow matches the text
               filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,0.2))'
             }}
           >
             {/* SOLID FILLED HAND PATH 
                This is a single solid shape, filled with yellow. Much more reliable visibility.
             */}
             <path 
               fill="#ffff4d"
               d="M19,24H5c-1.1,0-2-.9-2-2V10c0-1.1.9-2,2-2h0c1.1,0,2,.9,2,2v9h2v-9c0-1.1.9-2,2-2h0c1.1,0,2,.9,2,2v9h2v-9c0-1.1.9-2,2-2h0c1.1,0,2,.9,2,2v9h2c0-1.1.9-2,2-2V2c0-1.1-1.3-2-2.5-2h-1c-1.1,0-2,.9-2,2v8h-2V5c0-1.1-.9-2-2-2h0c-1.1,0-2,.9-2,2v5H5"
             />
           </svg>
        )}
      </div>
    </div>
  );
};

export default Preloader;