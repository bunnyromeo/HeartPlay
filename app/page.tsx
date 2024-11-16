"use client";
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import Image from 'next/image';

const Confetti = dynamic(() => import('react-confetti'), {
  ssr: false
});

const content = {
  question: {
    gif: "/Assets/sneak.gif",
    text: "Do you love me?"
  },
  response: {
    gif: "/Assets/kiss.gif",
    text: "I love you too Baby 🐥"
  }
};

export default function Home() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0
  });
  const [showResponse, setShowResponse] = useState(false);
  const [noPosition, setNoPosition] = useState({ top: "50%", left: "50%" });

  useEffect(() => {
    // Update window size
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentContent = showResponse ? content.response : content.question;

  const handleYesClick = () => {
    setShowResponse(true);
  };

  const handleNoMove = () => {
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
    
    const randomTop = `${Math.random() * 80 + 10}%`;
    const randomLeft = `${Math.random() * 80 + 10}%`;
    setNoPosition({ top: randomTop, left: randomLeft });
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center">
      {showResponse && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={150}
          colors={['#ff0000', '#ff66ff', '#ff69b4', '#ffc0cb']}
          gravity={0.3}
          recycle={false}
        />
      )}
      <div className="text-center p-4 sm:p-8 md:p-12">
        <div className="max-w-md mx-auto flex flex-col items-center">
          <Image
            src={currentContent.gif}
            alt="Cute Question"
            width={300}
            height={300}
            priority
            className="w-[200px] sm:w-[250px] md:w-[300px] h-auto rounded-lg shadow-md"
          />
          <h1 className="text-xl sm:text-2xl md:text-3xl text-pink-500 font-bold mt-4 sm:mt-6">
            {currentContent.text}
          </h1>
          <div className="mt-6 sm:mt-8 relative h-[150px] sm:h-[200px]">
            {!showResponse && (
              <>
                <button
                  onClick={handleYesClick}
                  className="px-6 sm:px-8 py-2 sm:py-3 bg-pink-500 text-white rounded-full 
                           font-semibold shadow-md hover:bg-pink-600 transform hover:scale-105 
                           transition-all duration-200 mr-4 text-sm sm:text-base"
                >
                  Yes
                </button>
                <button
                  onMouseEnter={handleNoMove}
                  onTouchStart={handleNoMove}
                  className="px-6 sm:px-8 py-2 sm:py-3 bg-gray-400 text-white rounded-full 
                           font-semibold shadow-md hover:bg-gray-500 transition-colors 
                           duration-200 text-sm sm:text-base focus:outline-none"
                  style={{
                    position: "absolute",
                    top: noPosition.top,
                    left: noPosition.left,
                    transform: "translate(-50%, -50%)",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  No
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
